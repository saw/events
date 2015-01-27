var Q = require('q');
var storage = require('../storage.js');
var _ = require('lodash');

function makePromise() {
	return Q.defer();
}

module.exports = {
	post: function(params) {
		var doc = params;
		doc.collection = 'users';
		return storage.insert(doc);
	},

	get: function(params) {
		if(params && params.id) {
			return storage.get(params.id);
		} else {
			return storage.find({collection:'users'});
		}
	}
}