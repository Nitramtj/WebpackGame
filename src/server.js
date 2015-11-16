import './common';
import Connection from './connection';
import * as Player from 'types/player';
import 'systems/servernetwork'

Connection.server(); // todo: lazy initialize?
window.player = Player.create();

if (module.hot) {
	console.log('it might be hot in here');
}