module.exports = function(router) {

	router.get('/', function (req, res) {
		res.render('index',{ctx:req.ctx}, function(err, html) {
			// console.log('here', html);
			setTimeout(function() {
				res.write(html);
				res.end();
			},1000);

		});
	  	// res.render('index', {ctx:req.ctx});
	});

	router.get('/about', function (req, res) {
		res.render('about', {ctx:req.ctx});
	})
}