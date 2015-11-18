import World from './world';
import {getComponentByName} from 'systems/components';
import {getTypeByName} from 'systems/types';

var defaultWorld = new World();
var uid = 0;
var entities = {};

export default class {
	constructor(options) {
		options = options || {};
		this.world = options.world || defaultWorld;
		this.components = options.components || [];
		this.typeGroup = options.typeGroup;
		this.dirtyCount = 0;
		if (!options.networkId) {
			this.networkId = uid++;
		} else {
			this.networkId = options.networkId;
		}
		
		entities[this.networkId] = this;
		
		this.components.forEach((c) => {
			c.entity = this;
			this[c.constructor.getName()] = c; //for convenient access during runtime
		});
		
		this.world.register(this);
	}
	
	static getEntityById(networkId) {
		return entities[networkId];
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
	
	dirty() {
		this.dirtyCount++;
	}
	
	static serialize(entity, context) {
		var obj = {
			components: {},
			typeGroup: entity.getType(),
			networkId: entity.networkId
		};
		
		entity.components.forEach(function(c) {
			var cName = c.constructor.getName();
			
			if (!c.serialize) {
				obj.components[cName] = Object.assign({}, c);
			} else {
				obj.components[cName] = c.serialize(context);
			}
			obj.components[cName].entity = '';
		});
		
		return obj; //JSON.stringify(obj);
	}
	
	static deserialize(json) {
		var obj = json; //JSON.parse(json);
		
		var typeGroup = getTypeByName(obj.typeGroup);
		var newEntity = typeGroup.create(obj.components);
		
		return newEntity;
	}
	
	static update(obj) {
		var entity = entities[obj.networkId];
		
		for (var componentName in obj.components) {
			if (obj.components.hasOwnProperty(componentName)) {
				var cOptions = obj.components[componentName];
				cOptions.entity = entity;
				var c = entity[componentName];
				
				if (!c.deserialize) {
					Object.assign(c, cOptions);
				} else {
					c.deserialize(cOptions);
				}
			}
		}
	}
};