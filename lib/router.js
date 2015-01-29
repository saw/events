var React = require('react');
var _ = require('lodash');
var app;
var AppContext = require('../lib/app-context.js');
var appContext;
var templates = {
	index: require('../views/index.jsx'),
	about: require('../views/about.jsx')
};
var templateConf = {
	index: '../views/index.jsx'
}
var body = document.getElementById('content');



//ls
var routes = [];

function addRoute(route, callback) {

	var obj = {};
	obj.route = route;

	//add the app context middleware
	obj.callback = function(req, res, next) {
		console.log('calling');
		req.user = window.ctx.user;
		req.signedIn = window.ctx.signedIn;
		var n = function() {
			console.log('next');
			return callback(req, res, next);
		};
		appContext(req, res, n);
	}

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

function Router(theApp) {

	app = theApp;
	appContext = AppContext(app);

	return {

		get: addRoute,

		route: function(url) {
			var goodRoute = false;
			routes.forEach(function(route) {
				if(url === route.route) {
					goodRoute = true;
					route.callback({
						url : url
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