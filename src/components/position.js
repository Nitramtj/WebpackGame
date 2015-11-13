export default class {
	constructor(options) {
		options = options || {};
		this.x = options.x || 0;
		this.y = options.y || 0;
	}
	
	static getName() {
		return 'position';
	}
}
