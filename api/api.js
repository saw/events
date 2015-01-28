var path = require('path');
var transport = require('./transport/server.js');

//req only passed on server
function callMethod (namespace, method, params, req) {
	return transport.callMethod(namespace, method, params, req);
}

module.exports = {
	callMethod: callMethod
}