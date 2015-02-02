module.exports = function(router) {

	router.get('/', function (req, res) {

		res.render('index',{ctx:req.ctx}, function(err, html) {
			res.write(html);
			res.end();
		});
	});

	router.get('/about', function (req, res) {
		res.render('about', {ctx:req.ctx}m function(err, html) {
			res.write(html);
			res.end();
		});
	});

	router.get('/mynotes', function (req, res) {
		if(!req.user) {
			res.end('fail');
			return;
		}
		req.ctx.stores.noteStore.getNotesForUser(req.user._id).then(function() {

			res.render('mynotes', {ctx:req.ctx}, function(err, html) {
				res.write(html);
				res.end();
			});
		});
	});
}