var React = require('react');
var _ = require('lodash');

var templates = {};
var templateConf = {
	index: '../views/index.jsx'
}
var body = document.getElementById('content');



//ls
var routes = [];

function addRoute(route, callback) {

	var obj = {};
	obj.route = route;
	obj.callback = callback;
	routes.push(obj);
}

function Res() {

}

Res.prototype.end = function(str) {
	console.log('end', str);
}

Res.prototype.render = function(path, data) {
	React.renderComponent(React.createElement(templates[path], data), body); 
}

function Router(app) {

	_.forIn(templateConf, function(value, key) {
		templates[key] = require(value)(app);
	});


	return {

		get: addRoute,

		route: function(url) {
			var goodRoute = false;
			routes.forEach(function(route) {
				if(url === route.route) {
					goodRoute = true;
					route.callback({
						url : url,
						ctx: window.props.ctx,
					}, new Res(), function() {});
				}
			});

			return goodRoute;

		}

	};

};

module.exports = {
	Router:Router
};