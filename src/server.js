import './common';
import Connection from './connection';
import * as Player from 'types/player';
import 'systems/servernetwork'

Connection.server(); // todo: lazy initialize?

if (module.hot) {
	console.log('it might be hot in here');
}

Connection.on('connect', function(client) {
	client.player = Player.create({
		owner: {
			owner: client
		}
	});
});

window.host = Connection.createHostClient();