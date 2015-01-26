var path = require('path');
var transport = require('./transport/server.js');


function callMethod (namespace, method, params) {
	return transport.callMethod(namespace, method, params);
}

module.exports = {
	callMethod: callMethod
}