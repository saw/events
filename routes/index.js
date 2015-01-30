module.exports = function(router) {

	router.get('/', function (req, res) {
		console.log('this far');
	  	res.render('index', {ctx:req.ctx});
	});

	router.get('/about', function (req, res) {
		console.log('about');
		res.render('about', {ctx:req.ctx});
	});

	router.get('/mynotes', function (req, res) {
		if(!req.user) {
			res.end('fail');
			return;
		}
		console.log('note store', req.ctx.stores.noteStore);
		console.log(req.user);
		req.ctx.stores.noteStore.getNotesForUser(req.user._id).then(function() {
			console.log("then 19");
			res.render('mynotes', {ctx:req.ctx});
		});
	});
}