var api = require('../api/api.js');

var UserStore = {

	getUserById: function(id) {
		return api.callMethod('user', 'get', {id:id});
	}
};

module.exports = UserStore;