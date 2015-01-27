module.exports = function(router) {

	router.get('/', function (req, res) {
	  	res.render('index', {name: 'bob', req: req.url, ctx:req.ctx});
	});
}