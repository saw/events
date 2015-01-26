module.exports = function(router) {

	router.get('/', function (req, res) {
		// res.end('o');
	  	res.render('index', {name: 'bob', req: req.url, magic: req.magic, ctx:req.ctx});
	});
}