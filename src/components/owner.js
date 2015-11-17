import Connection from '../connection';

//On the server, this component contains the owning client
//On the client, this component contains a boolean if the client owns this one

export default class {
	constructor(options) {
		options = options || {};
		
		this.owner = options.owner || null;
		this.isOwner = options.isOwner || Connection.isHostClient(this.owner);
	}
	
	static getName() {
		return 'owner';
	}
	
	iAmOwner() {
		return this.isOwner;
	}
	
	serialize(context) {
		return {
			isOwner: this.owner !== null && context.client === this.owner
		};
	}
}
