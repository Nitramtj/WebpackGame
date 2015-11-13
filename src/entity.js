import World from './world';

var defaultWorld = new World();

export default class {
	constructor(options) {
		options = options || {};
		this.world = options.world || defaultWorld;
		this.components = options.components || [];
		
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
	
	onRegister() {
		this.components.forEach((c) => {
			if (c.onRegister) {
				c.onRegister();
			}
		});
	}
};