module.exports = function(router) {

	router.get('/', function (req, res) {
	  	res.render('index', {ctx:req.ctx});
	});

	router.get('/about', function (req, res) {
		res.render('about', {ctx:req.ctx});
	})
}