import Connection from '../connection';

var hostClient = Connection.createPseudoClient();

export default {
	isHost(client) {
		return hostClient === client;
	}
}