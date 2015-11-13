var begin = Date.now();
var callbacks = [];

window.setInterval(function() {
	var now = Date.now();
	callbacks.forEach(function(callback) {
		callback(now - begin);
	});
}, 30);

export function registerCallback(callback) {
	callbacks.push(callback);
};