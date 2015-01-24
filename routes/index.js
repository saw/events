module.exports = function(router) {

	router.get('/', function (req, res) {
		// res.end('o');
	  	res.render('index', {name: 'bob', url: req.url, ctx:req.ctx});
	});
}