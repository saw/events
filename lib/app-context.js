// middleware to populare the request context with
// all the info we need.
var Dispatcher = require('flux').Dispatcher;
var userStore = require('../stores/userStore.js');
var noteStore = require('../stores/noteStore.js');
var stores = false;
var dispatcher;

// on the browser we want stores to persist, on
// the server each request should get a clean store
function getStores(appContext) {
	if(process.browser) { //browserify does this for us
		if(stores) {
			return stores;
		} else {
			stores = {
				userStore: userStore(null, appContext),
				noteStore: noteStore(null, appContext)
			};

			return stores;
		}
	} else {
		return {
			userStore: userStore(null, appContext),
			noteStore: noteStore(null, appContext)
		}
	}
};

// on server dispatcher must be scoped to the request,
// on browser it should be singleton
function getDispatcher() {
	if(process.browser) {
		if(!dispatcher) {
			dispatcher = new Dispatcher();
		}
		return dispatcher;
	} else {
		return new Dispatcher();
	}
}

module.exports = function(app) {
	return function (req, res, next) {
		var appContext = {
			signedIn: req.user ? true : false,
			user: req.user
		};
		appContext.dispatcher = getDispatcher();
		appContext.stores = getStores(appContext);
		req.ctx = appContext;
		next();
	};
}