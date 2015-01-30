var Q = require('q');
var storage = require('../storage.js');
var _ = require('lodash');

function makePromise() {
	return Q.defer();
}

module.exports = {
	post: function(params, req) {
		var doc = params;
		if(!req.user || doc.owner !== req.user._id) {
			var p = makePromise();
			process.nextTick(function() {
				p.reject();
			});
			return p;
		}
		doc.collection = 'notes';
		doc.dateCreate = Date.now();
		return storage.insert(doc);
	},

	get: function(params, req) {

		if(params && params.id) {
			return storage.get(params.id);
		} else if (params && params.owner) {
			var p = makePromise();

			storage.find({owner:params.owner})
				.then(function(resp) {
					if(resp) {
						resp.sort(function(a,b){
						  if (a.dateCreate < b.dateCreate) {
						    return -1;
						  }
						  if (a.dateCreate > b.dateCreate) {
						    return 1;
						  }
						  // a must be equal to b
						  return 0;
						});
						p.resolve(resp);
					}
				});
			return p.promise;
		}
	}
}