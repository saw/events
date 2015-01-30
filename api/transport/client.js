var request = require('superagent');
var path = require('path');
var Q = require('q');
var qs = require('querystring');
var host = 'http://localhost:3000/api/';
module.exports = {
	callMethod: function(namespace, method, params) {
		console.log('calling', arguments);
		var p = Q.defer();
		var method = method.toLowerCase();
		var url = host + namespace;
		var r;
		if(params && params.id) {
			url += '/' + id;
		}

		if(method === 'get') {
			r = request[method](url + '?' + qs.stringify(params), function(res) {
				p.resolve(res.body);
			});
		} else {
			r = request[method](url);
			delete params.id;
			r = r.send(params);
			r.end(function(res) {
				p.resolve(res.body);
			});
		}
		return p.promise;
	}
}