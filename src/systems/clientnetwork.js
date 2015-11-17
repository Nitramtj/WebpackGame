import Connection from '../connection';
import Entity from '../entity';

var world = Entity.getDefaultWorld();

Connection.onMessage('entitySync', function(serverClient, serializedObjects) {
	world.clear();
	
	serializedObjects.forEach(function(serializedEntity) {
		Entity.deserialize(serializedEntity);
	});
});