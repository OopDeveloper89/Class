/*!
 * Class v1.0
 *
 * Copyright 2014
 * Released under the MIT license
 * 
 * Date: 30.03.2014
 * Author: OopDeveloper89
 */
var Class = {

	/**
	 * Namespace. 
	 *  
	 * @type {Object} 
	 */
	classes : {},
    
    /**
     * Defines a class.
     * 
     * @author oopdeveloper89
     * @param className
     * @param classProperties
     */
    define : function(className, classProperties) {
    	classProperties = classProperties || {};
    	
    	if (this.classes[className] != undefined) {
        	throw Error('Cannot redefine defined class: ' + className);
        }

        var classSkeleton = function() {};
        
        // If key "extend" given we do inheritance...
        if (classProperties.extend !== undefined) {
        	var superClassName = classProperties.extend;
        	if (this.classes[superClassName] === undefined) {
        		throw Error('Super class not defined: ' + superClassName);
        	}
        	
        	classSkeleton.prototype = new this.classes[superClassName];
        }

        var classPropertyName = null;
        for (classPropertyName in classProperties) {
			this.addPropertyValue(
				classSkeleton, 
				classPropertyName, 
				classProperties[classPropertyName]);        	
        }     
        
        this.classes[className] = classSkeleton;
    },
    
    /**
     * Creates a defined class.
     * 
 	 * @param Object className
 	 * @return Object
     */
    create : function(className) {
        if (this.classes[className] === undefined) {
            throw Error('Cannot create non-defined class: ' + className);
        }
        
        var cls = new this.classes[className];
        // If a constructor method given we call it...
        if (cls.init !== undefined) {
        	// Lets see if we have arguments for the constructor..
        	if (arguments.length > 1) {
        		var args = [];
        		// We loop through arguments because it is not an array...
        		for (var i = 1; i < arguments.length; i++) {
        			args.push(arguments[i]);
        		}
        		cls.init.apply(cls, args);	
        	}
        	else {
        		cls.init();	        		
        	}
        }

        return cls;
    },
    
    /**
     * Sets the class property. 
     * 
 	 * @param {Object} classSkeleton
 	 * @param {String} propertyName
 	 * @param {Object} propertyValue
     */    
    addPropertyValue : function(classSkeleton, propertyName, propertyValue) {
   		if (typeof propertyValue === 'object' && propertyValue !== null) {
   			if (propertyValue.type === 'static') {
				classSkeleton[propertyName] = propertyValue.value;   				
   			}
    	}
    	else {
			classSkeleton.prototype[propertyName] = propertyValue;    		
    	}
    }
    
};