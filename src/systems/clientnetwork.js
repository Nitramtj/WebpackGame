import Connection from '../connection';
import Entity from '../entity';

var world = Entity.getDefaultWorld();

Connection.registerReceiveCallback('entitySync', function(client, serializedObjects) {
	world.clear();
	
	serializedObjects.forEach(function(serializedEntity) {
		Entity.deserialize(serializedEntity);
	});
});