import Peer from 'peerjs';
import {registerCallback} from 'systems/loop';
import Events from 'events';
//ygsnnfll7ovibe29

var peer = null;
var receiveCallbacks = {};
var clientCallbacks = {};
var peerEvents = ['data', 'open', 'close', 'error'];
var clientUid;
var hostClient = null;

class PseudoConnection extends Events.EventEmitter {
	constructor() {
		super();
	}
	
	send(messageType, payload) {
		this.emit('data', {
			messageType: messageType,
			payload: payload
		});
	} 
};

class Client {
	constructor(connection) {
		if (connection !== null) {
			this.connection = connection;
			this.pseudoConnection = false;
		} else {
			this.connection = new PseudoConnection();
			this.pseudoConnection = true;
		}
		this.callbacks = {};
		this.trackedEntities = new WeakMap();
	}
	
	sendMessage(messageType, payload) {
		this.connection.send({
			messageType: messageType,
			payload: payload
		});
	}
	
	on(event, callback) {
		if (peerEvents.indexOf(event) > -1) {
			this.connection.on(event, (arg) => {
				callback(this, arg);
			});
		} else {
			if (!this.callbacks[event]) {
				this.callbacks
			}
		}
	}
	
	emit(event, args) {
		if (this.callbacks[event]) {
			this.callbacks[event].forEach((callback) => {
				callback(this, args);
			});
		}
	}
	
	isPseudoClient() {
		return this.pseudoConnection;
	}
	
	needsUpdateOn(entity) {
		if (!this.trackedEntities.has(entity)) {
			this.trackedEntities.set(entity, -1);
		}
		
		return this.trackedEntities.get(entity) < entity.dirtyCount;
	}
	
	setEntityUpToDate(entity) {
		this.trackedEntities.set(entity, entity.dirtyCount);
	}
}

export default {
	side: null,
	clients: [],
	server: function() {
		this.side = 'server';
		peer = new Peer('server', {key: 'ygsnnfll7ovibe29'});
		peer.on('open', function(id) {
			console.log('server id ' + id);
		});
		peer.on('connection', (conn) => {
			this.onConnect(conn);
		});
	},
	client: function() {
		peer = new Peer({key: 'ygsnnfll7ovibe29'});
		peer.on('open', function(id) {
			console.log('client id ' + id);
		});
		var connection = peer.connect('server', {reliable:true});
		
		connection.on('open', () => {
			this.onConnect(connection);
		});
	},
	createPseudoClient: function() {
		var client = new Client(null);
		this.clients.push(client);
		
		this.emit('connect', client);
		
		return client;
	},
	createHostClient: function() {
		var client = new Client(null);
		hostClient = client;
		this.clients.push(client);
		
		this.emit('connect', client);
		
		return client;
	},
	isHostClient: function(client) {
		return client !== null && client === hostClient;
	},
	
	//private
	onConnect: function(conn) {
		var client = new Client(conn);
		this.clients.push(client);
		
		//bind to this client's events
		peerEvents.forEach(function(event) {
			client.on(event, function(client, arg) {
				if (clientCallbacks[event]) {
					clientCallbacks[event].forEach(function(callback) {
						callback(client, arg);
					});
				}
			});
		});
		
		//bind message handlers
		client.on('data', function(client, data) {
			if (receiveCallbacks[data.messageType]) {
				receiveCallbacks[data.messageType].forEach(function(callback) {
					callback(client, data.payload);
				});
			}
		});
		
		//initiate connection event
		this.emit('connect', client);
		
		return client;
	},
	on: function(event, callback) {
		if (!clientCallbacks[event]) {
			clientCallbacks[event] = [];
		}
		
		clientCallbacks[event].push(callback);
	},
	
	//only for client open right now
	emit(event, client, args) {
		if (clientCallbacks[event]) {
			clientCallbacks[event].forEach((callback) => {
				callback(client, args);
			});
		}
	},
	
	send: function(messageType, payload) {
		this.clients.forEach(function(client) {
			client.sendMessage({
				messageType: messageType,
				payload: payload
			});
		});
	},
	onMessage: function(messageType, callback) {
		if (!receiveCallbacks[messageType]) {
			receiveCallbacks[messageType] = [];
		}
		
		receiveCallbacks[messageType].push(callback);
	}
};

if (module.hot) {
	console.log('it might be hot in here');
}