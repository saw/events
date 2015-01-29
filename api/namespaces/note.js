var Q = require('q');
var storage = require('../storage.js');
var _ = require('lodash');

function makePromise() {
	return Q.defer();
}

module.exports = {
	post: function(params, req) {
		console.log('sht', params);
		var doc = params;
		doc.collection = 'notes';
		return storage.insert(doc);
	},

	get: function(params, req) {
		console.log(req.user);
		if(params && params.id) {
			return storage.get(params.id);
		} else if (params && params.owner) {
			return storage.find({owner:params.owner});
		} else {
			return storage.find({collection:'notes'});
		}
	}
}