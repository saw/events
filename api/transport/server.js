var path = require('path');

module.exports = {
	callMethod: function(namespace, method, params) {
		var method = method.toLowerCase();
		var ns = require(path.join(__dirname, '../namespaces/', namespace));
		return ns[method](params);
	}
}