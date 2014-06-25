test('Create class...', function() {
    ClassJS.define('A', {
        id : 5,
        name : 'MyTestClassName',
        coolClass : true,
        init : function() {}
     });
    
    var myTestClass = ClassJS.create('A');
    ok(myTestClass.id, 5);
    ok(myTestClass.name, 'MyTestClassName');
    ok(myTestClass.coolClass, true);
});

test('Call constructor...', function() {
	ClassJS.define('Car', {
        ps : 500,
        init : function() {
        	this.ps = 200;
        }
     });
	
	var car = ClassJS.create('Car');
	
    ok(car.ps, 200);
});

test('Extend a class...', function() {
	ClassJS.define('SuperClass', {
        id : 5,
        name : 'SuperClassName',
     });
    
	ClassJS.define('SubClass', {
    	extend : 'SuperClass',
    	id : 7
    });
    
    var cls = ClassJS.create('SubClass');
    ok(cls.id, 7);
    ok(cls.name, 'SuperClassName');
});

test('Define already defined class...', function() {
    throws(
    		function() {
    			ClassJS.define('SubClass');    			
    		}
    );
});

test('Create not defined class...', function() {
    throws(
    		function() {
    			ClassJS.create('NotDefinedClass');    			
    		}
    );
});

test('Extend from not defined class...', function() {
	throws(
    		function() {
    			ClassJS.define('B', { extend : 'C' });    			
    		}
    );
});

test('Call constructor with params...', function() {
	ClassJS.define('Pizza', {
		cheese : null,	
		olives : null,
		
		init : function(cheese, olives) {
			this.cheese = cheese;
			this.olives = olives;
		}
	});
	
	var pizza = ClassJS.create('Pizza', 'Cheese', 'Olives');
	
	ok(pizza.cheese, 'Cheese');
	ok(pizza.olives, 'Olives');
});

test('Define static attribute and method...', function() {
	ClassJS.define('Example', {
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
	
	ok(Example.staticProperty, 'test');
	ok(Example.staticMethod(), 'bla');
});