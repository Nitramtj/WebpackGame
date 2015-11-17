import Connection from '../connection';
import * as GameLoop from 'systems/loop';
import Entity from '../entity';

var world = Entity.getDefaultWorld();

GameLoop.registerCallback(function() {
	var serializedEntities = [];
	Connection.clients.forEach(function(client) {
		if (!client.isPseudoClient()) {
			world.entities.forEach(function(entity) {
				var context = {
					client: client
				};
				serializedEntities.push(Entity.serialize(entity, context));
			});
			
			client.send('entitySync', serializedEntities);
		}
	});
});