var React = require('react');
var fs = require('fs');
require('node-jsx').install();

var wrapper = fs.readFileSync(__dirname + '/../views/layout.html', 'utf-8');
var arr = wrapper.split('{{content}}');
var start = arr[0];
var end = arr[1];


module.exports = function(app) {

	return function(filePath, options, callback) {

		var template = require(filePath)(app);
		var rendered = React.renderToString(React.createElement(template, options));
		var out = start;

		out += rendered;
		out += '<script>var props = ' + JSON.stringify(options) + '</script>';
		out += end;
		callback(null, out);
	};
}