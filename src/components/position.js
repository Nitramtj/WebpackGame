import {registerCallback} from 'systems/loop';

export default class {
	constructor(options) {
		options = options || {};
		this.x = options.x || 0;
		this.y = options.y || 0;
		this.lastX = this.x;
		this.lastY = this.y;
	}
	
	static getName() {
		return 'position';
	}
}
