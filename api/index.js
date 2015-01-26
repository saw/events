var express = require('express');
var router = express.Router();
var _ = require('lodash');
var api = require('./api');

router.get('/', function (req, res, next) {
	res.status(403);
	res.end('API method missing');
});

router.all('/:')

router.all('/:namespace/:id?', function (req, res, next) {

	var method = req.method;

	var paramData = {};

	if(req.params.id) {
		paramData.id = req.params.id;
	}

	if(req.body) {
		paramData = _.merge(paramData, req.body);
	}

	api.callMethod(req.params.namespace, method, paramData).then(function(resp, err) {
		if(err) {
			res.status(500);
			res.json(err);
		} else {
			res.json(resp);
		}
	});
	// console.log(req.body);
	// res.end('d');
});


module.exports = router;