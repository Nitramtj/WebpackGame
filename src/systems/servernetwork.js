import Connection from '../connection';
import * as GameLoop from 'systems/loop';
import Entity from '../entity';

var world = Entity.getDefaultWorld();

GameLoop.registerCallback(function() {
	var serializedEntities = [];
	world.entities.forEach(function(entity) {
		serializedEntities.push(Entity.serialize(entity));
	});
	
	Connection.send('entitySync', serializedEntities);
});

Connection.registerReceiveCallback(function(client, payload) {
	
});