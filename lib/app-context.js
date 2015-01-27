// middleware to populare the request context with
// all the info we need.

var userStore = require('../stores/userStore.js');

module.exports = function (req, res, next) {
	req.ctx = {
		stores: {
			userStore:userStore
		},
		signedIn: req.user ? true : false
	};

	if(req.user) {
		req.ctx.user = req.user;
	}

	next();
}