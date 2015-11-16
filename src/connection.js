import Peer from 'peerjs';
import {registerCallback} from 'systems/loop';
import EventEmitter from 'events';
//ygsnnfll7ovibe29

var peer = null;
var receiveCallbacks = {};
var clientCallbacks = {};
var peerEvents = ['data', 'open', 'close', 'error'];

class Client {
	constructor(connection) {
		this.connection = connection;
		this.callbacks = {};
	}
	
	send(messageType, payload) {
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
}

export default {
	side: null,
	clients: [],
	server: function() {
		this.side = 'server';
		peer = new Peer('server', {key: 'ygsnnfll7ovibe29'});
		peer.on('open', function(id) {
			console.log('client id ' + id);
		});
		peer.on('connection', (conn) => {
			this.onConnect(conn);
		});
		
		registerCallback((tick) => {
			if (tick % 100 === 0) {
				this.client.forEach((client) => {
					client.send('tick');
				});
			}
		});
		
	},
	client: function() {
		peer = new Peer({key: 'ygsnnfll7ovibe29'});
		peer.on('open', function(id) {
			console.log('server id ' + id);
		});
		var connection = peer.connect('server', {reliable:true});
		
		connection.on('open', () => {
			this.onConnect(connection);
		});
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
		this.emit(client, 'connection');
		
		return client;
	},
	on: function(event, callback) {
		if (!clientCallbacks[event]) {
			clientCallbacks[event] = [];
		}
		
		clientCallbacks[event].push(callback);
	},
	
	//only for client open right now
	emit(client, event, args) {
		if (clientCallbacks[event]) {
			clientCallbacks[event].forEach((callback) => {
				callback(client, args);
			});
		}
	},
	
	send: function(messageType, payload) {
		this.clients.forEach(function(client) {
			client.send({
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