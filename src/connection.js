import Peer from 'peerjs';
import {registerCallback} from 'systems/loop';
//ygsnnfll7ovibe29

var peer = null;

export default {
	side: null,
	connections: [],
	server: function() {
		this.side = 'server';
		peer = new Peer('server', {key: 'ygsnnfll7ovibe29'});
		peer.on('open', function(id) {
			console.log('client id ' + id);
		});
		peer.on('connection', (conn) => {
			this.connections.push(conn);
		});
		registerCallback(() => {
			this.connections.forEach((client) => {
				client.send('tick');
			});
		});
		
	},
	client: function() {
		peer = new Peer({key: 'ygsnnfll7ovibe29'});
		peer.on('open', function(id) {
			console.log('server id ' + id);
		});
		var connection = peer.connect('server', {reliable:true});
		
		connection.on('open', () => {
			connection.on('data', function(data) {
				console.log(data);
			});
		});
	}
};

if (module.hot) {
	console.log('it might be hot in here');
}