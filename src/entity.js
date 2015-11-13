import World from './world';
import * as Components from 'systems/components';
import * as Types from 'systems/types';

var defaultWorld = new World();

export default class {
	constructor(options) {
		options = options || {};
		this.world = options.world || defaultWorld;
		this.components = options.components || [];
		this.typeGroup = options.typeGroup;
		
		this.components.forEach((c) => {
			c.entity = this;
			this[c.constructor.getName()] = c; //for convenient access during runtime
		});
		
		this.world.register(this);
	}
	
	static getDefaultWorld() {
		return defaultWorld;
	}
	
	hasComponents(components) {
		var hasComponents = true;
		
		components.forEach((component) => {
			if (!this.hasComponent(component)) {
				hasComponents = false;
			}
		});
		
		return hasComponents;
	}
	
	hasComponent(component) {
		var hasComponent = false;
		this.components.forEach((c) => {
			if (c instanceof component) {
				hasComponent =  true;
			}
		});
		
		return hasComponent;
	}
	
	getComponent(component) {
		var instance = null;
		this.components.forEach((c) => {
			if (c instanceof component) {
				instance = c;
			}
		});
		
		return instance;
	}
	
	getType() {
		return this.typeGroup;
	}
	
	onRegister() {
		this.components.forEach((c) => {
			if (c.onRegister) {
				c.onRegister();
			}
		});
	}
	
	static serialize(entity) {
		var obj = {
			// components: {},
			typeGroup: entity.getType(),
			options: {}
		};
		
		/*entity.components.forEach(function(c) {
			if (c.serialize) {
				obj.components[c.constructor.getName()] = c.serialize();
			} else {
				obj.components[c.constructor.getName()] = Object.assign({}, c);
			}
		});*/
		entity.components.forEach(function(c) {
			Object.assign(obj.options, c);
		});
		
		obj.options.entity = '';
		
		return JSON.stringify(obj);
	}
	
	static deserialize(json) {
		var obj = JSON.parse(json);
		
		var typeGroup = Types.getTypeByName(obj.typeGroup);
		
		return typeGroup.create(obj.options);
	}
};