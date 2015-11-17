import Entity from 'entity';
import Position from 'components/position';
import Square from 'components/square';
import Movement from 'components/movement';
import Owner from 'components/owner';

export default {
	create: function(options) {
		let entity = new Entity({
			components: [
				new Position(options),
				new Square(options),
				new Movement(options),
				new Owner(options)
			],
			typeGroup: this.getName()
		});
		
		return entity;
	},
	getName: function() {
		return 'player';
	}
};
