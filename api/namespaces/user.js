var Q = require('q');

module.exports = {
	post: function(params) {
		var p = Q.defer();
		process.nextTick(function(){
			p.resolve({foo:'bar'});
		});
		return p.promise;
	}
}