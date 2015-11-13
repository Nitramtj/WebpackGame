var componentMap = {};
var uidCount = 0;
var getUid = function() {
	return uidCount++;
};

export default class {
	constructor() {
		this.uid = getUid;
	}
	
	static getComponent(uid) {
		
	}
}