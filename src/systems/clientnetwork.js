import Connection from '../connection';
import Entity from '../entity';

var world = Entity.getDefaultWorld();

Connection.onMessage('entitySync', function(serverClient, serializedObjects) {
	serializedObjects.forEach(function(serializedEntity) {
		if (Entity.getEntityById(serializedEntity.networkId)) {
			Entity.update(serializedEntity);
		} else {
			Entity.deserialize(serializedEntity);
		}
	});
});