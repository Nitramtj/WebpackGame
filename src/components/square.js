export default class {
	constructor(options) {
		options = options || {};
		this.width = options.width || 1;
		this.height = options.height || 1;
		this.color = options.color || 'rgba(200, 0, 0, 0.7)';
	}
	
	static getName() {
		return 'square';
	}
}
