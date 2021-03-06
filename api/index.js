var express = require('express');
var router = express.Router();
var _ = require('lodash');
var api = require('./api');
var storage = require('./storage.js');
storage.init().then(function() {
	console.log('Storage engine ready');
});

router.get('/', function (req, res, next) {
	res.status(403);
	res.end('API method missing');
});

router.all('/:namespace/:id?', function (req, res, next) {

	var method = req.method;

	var paramData = {};

	if(req.params.id) {
		paramData.id = req.params.id;
	}

	paramData = _.merge(paramData, req.body);
	paramData = _.merge(paramData, req.query);

	api.callMethod(req.params.namespace, method, paramData, req).then(function(resp, err) {
		if(err) {
			res.status(500);
			res.json(err);
		} else {
			res.json(resp);
		}
	});

});


module.exports = router;