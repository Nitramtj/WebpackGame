import Connection from '../connection';
import * as GameLoop from 'systems/loop';
import Entity from '../entity';

var world = Entity.getDefaultWorld();

GameLoop.registerCallback(function() {
	Connection.clients.forEach(function(client) {
		if (!client.isPseudoClient()) {
			var serializedEntities = [];
			world.entities.forEach(function(entity) {
				if (client.needsUpdateOn(entity)) {
					var context = {
						client: client
					};
					serializedEntities.push(Entity.serialize(entity, context));
					client.setEntityUpToDate(entity); //dangerous to do this before sent/acked
				}
			});
			if (serializedEntities.length > 0) {
				client.sendMessage('entitySync', serializedEntities);
			}
		}
	});
});