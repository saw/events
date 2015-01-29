var api = require('../api/api.js');
var StoreFactory = require('./StoreFactory.js');
var q = require('q');
var dispatcher;

var UserStore = {

	getUserById: function(id) {
		return api.callMethod('user', 'get', {id:id});
	},
	getAllUsers: function() {
		return api.callMethod('user', 'get');
	}
};

module.exports = function(initData, app) {
	dispatcher = app.dispatcher;
	return StoreFactory(UserStore, dispatcher, initData);
}