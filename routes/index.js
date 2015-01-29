module.exports = function(router) {

	router.get('/', function (req, res) {
		console.log('this far');
	  	res.render('index', {ctx:req.ctx});
	});

	router.get('/about', function (req, res) {
		console.log('about');
		res.render('about', {ctx:req.ctx});
	})
}