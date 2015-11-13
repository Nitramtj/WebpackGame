import Position from 'components/position';
import Movement from 'components/movement';
import Square from 'components/movement';

var components = {};

//todo: Automate this process into build script
components[Position.getName()] = Position;
components[Movement.getName()] = Movement;
components[Square.getName()] = Square;

export function getComponentByName(name) {
	return components[name];
};