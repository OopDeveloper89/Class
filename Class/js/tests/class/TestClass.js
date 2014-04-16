test('Create class...', function() {
    Class.define('A', {
        id : 5,
        name : 'MyTestClassName',
        coolClass : true,
        init : function() {}
     });
    
    var myTestClass = Class.create('A');
    ok(myTestClass.id, 5);
    ok(myTestClass.name, 'MyTestClassName');
    ok(myTestClass.coolClass, true);
});

test('Call constructor...', function() {
    Class.define('Car', {
        ps : 500,
        init : function() {
        	this.ps = 200;
        }
     });
	
	var car = Class.create('Car');
	
    ok(car.ps, 200);
});

test('Extend a class...', function() {
    Class.define('SuperClass', {
        id : 5,
        name : 'SuperClassName',
     });
    
    Class.define('SubClass', {
    	extend : 'SuperClass',
    	id : 7
    });
    
    var cls = Class.create('SubClass');
    ok(cls.id, 7);
    ok(cls.name, 'SuperClassName');
});

test('Define already defined class...', function() {
    throws(
    		function() {
    			Class.define('SubClass');    			
    		}
    );
});

test('Create not defined class...', function() {
    throws(
    		function() {
    			Class.create('NotDefinedClass');    			
    		}
    );
});

test('Extend from not defined class...', function() {
	throws(
    		function() {
    			Class.define('B', { extend : 'C' });    			
    		}
    );
});

test('Call constructor with params...', function() {
	Class.define('Pizza', {
		cheese : null,	
		olives : null,
		
		init : function(cheese, olives) {
			this.cheese = cheese;
			this.olives = olives;
		}
	});
	
	var pizza = Class.create('Pizza', 'Cheese', 'Olives');
	
	ok(pizza.cheese, 'Cheese');
	ok(pizza.olives, 'Olives');
});

test('Define static attribute and method...', function() {
	Class.define('Example', {
		staticProperty : { 
			type : 'static',
			value : 'test'
		},
		staticMethod : { 
			type : 'static',
			value : function() {
				return 'bla';	
			}
		}
	});
	
	ok(Class.classes.Example.staticProperty, 'test');
	ok(Class.classes.Example.staticMethod(), 'bla');
});