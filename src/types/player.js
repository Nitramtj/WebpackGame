import Entity from 'entity';
import Position from 'components/position';
import Square from 'components/square';
import Movement from 'components/movement';

export function create(options) {
	let entity = new Entity({
		components: [
			new Position(options),
			new Square(options),
			new Movement(options)
		]
	});
	
	return entity;
};