import Entity from '../entity';
import Position from 'components/position';
import Square from 'components/square';

var world = Entity.getDefaultWorld();

var canvas = document.createElement('canvas');
var context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.id = 'mainCanvas';

window.addEventListener('resize', function(event) {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	console.log('ressizeee');
});

var renderProcess = function() {
	var entities = world.getEntityList([Position, Square]);
	
	context.clearRect(0, 0, canvas.width, canvas.height);
	
	entities.forEach(function(entity) {
		var pos = entity.getComponent(Position);
		var sq = entity.getComponent(Square);
		context.fillStyle = sq.color;
		context.fillRect(pos.x + 100, pos.y + 100, sq.width * 100, sq.height * 100);
	});
	//render objects around 0, 0
	
	window.requestAnimationFrame(renderProcess);
};

window.requestAnimationFrame(renderProcess);

document.body.appendChild(canvas);