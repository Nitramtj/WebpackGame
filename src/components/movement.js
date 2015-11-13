import Position from 'components/position';
import {registerCallback} from 'systems/loop';

var up = false,
	down = false,
	left = false,
	right = false;

var components = [];
window.addEventListener('keydown', function(e) {
	if (e.keyCode === 38) {
		up = true;
	} else if (e.keyCode === 40) {
		down = true;
	} else if (e.keyCode === 37) {
		left = true;
	} else if (e.keyCode === 39) {
		right = true;
	}
});
window.addEventListener('keyup', function(e) {
	if (e.keyCode === 38) {
		up = false;
	} else if (e.keyCode === 40) {
		down = false;
	} else if (e.keyCode === 37) {
		left = false;
	} else if (e.keyCode === 39) {
		right = false;
	}
});

registerCallback(function() {
	components.forEach(function(c) {
		var entity = c.entity;
		var pos = entity.getComponent(Position);
		
		if (up) {
			pos.y -= c.speed;
		}
		if (down) {
			pos.y += c.speed;
		}
		if (left) {
			pos.x -= c.speed;
		}
		if (right) {
			pos.x += c.speed;
		}
	});
});

export default class {
	constructor(options) {
		options = options || {};
		this.speed = 5;
		components.push(this);
	}
	
	static getName() {
		return 'movement';
	}
}
