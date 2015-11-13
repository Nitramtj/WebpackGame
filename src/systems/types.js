import Player from 'types/player';

var types = {};

//todo: Automate this process into build script
types[Player.getName()] = Player;

export function getTypeByName(name) {
	return types[name];
};