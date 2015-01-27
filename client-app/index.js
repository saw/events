var app = {};
var router = require('../lib/router').Router(app);
var routes = require('../routes/index.js')(router);

console.log('window ctx', window.ctx);

content.addEventListener('click', function(e) {
	if(e.target.tagName === 'A' && e.target.href) {

		if(router.route(e.target.pathname)) {
			e.preventDefault();
			window.history.pushState({},null, e.target.pathname);
		}

	}
	//
});

window.addEventListener('popstate', function(e) {
	router.route(window.location.pathname);
});

