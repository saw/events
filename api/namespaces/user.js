var Q = require('q');

function makePromise() {
	return Q.defer();
}

module.exports = {
	post: function(params) {
		var p = makePromise();
		process.nextTick(function(){
			p.resolve({foo:'bar'});
		});
		return p.promise;
	},

	get: function(params) {
		var p = makePromise();
		
	}
}