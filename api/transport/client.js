var request = require('superagent');
var path = require('path');
var Q = require('q');
var host = 'http://localhost:3000/api/';
module.exports = {
	callMethod: function(namespace, method, params) {
		console.log('calling', arguments);
		var p = Q.defer();
		var method = method.toLowerCase();
		var url = host + namespace;

		if(params && params.id) {
			url += '/' + id;
		}

		var r = request[method](host + namespace);

		if(method === 'post' || method === 'put') {
			delete params.id;
			r = r.send(params);
		}

		r.end(function(res) {
			p.resolve(res.body);
		});
		return p.promise;
	}
}