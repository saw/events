var Datastore = require('nedb');
var Q = require('q');
var db = null;

function init() {
	var p = Q.defer();
	if(db) {
		console.warn('db already init, skipping');
		process.nextTick(function() {
			p.resolve();
		});
	} else {
		db = new Datastore({filename: '/tmp/eventStore'});
		db.loadDatabase(function(err) {
			if(err) {
				p.reject(new Error(err));
			} else {
				db.findOne({_id:'fop'}, function(err, count) {
					console.log('count', count);
				})
				p.resolve();
			}
		});
	}


	return p.promise;
}

function insert(doc) {
	var p = Q.defer();
	db.insert(doc, function(err, newDoc) {
		p.resolve(newDoc);
	})
	return p.promise;
}

function get(id) {
	var p = Q.defer();
	console.log('finding', id);
	db.findOne({_id:id}, function(err, doc) {
		console.log('done', arguments);
		if(err) {
			console.log('oh shit', err);
			p.reject(new Error(err));
		} else {
			console.log('findy', doc);
			p.resolve(doc);
		}
	});
	return p.promise;
}

// wrap up that promise, send it along
function queryCb(p) {

	return function(err, doc) {
		if(err) {
			p.reject(new Error(err));
		} else {
			if(doc) {
				p.resolve(doc);
			} else {
				p.resolve();
			}
		}
	}
}


function find(query, limit) {
	var p = Q.defer();
	if(limit) {
		db.find(query).limit(limit).exec(queryCb(p));
	} else {
		db.find(query, queryCb(p));
	}
	

	return p.promise;
}

module.exports = {
	init: init,
	insert: insert,
	get: get,
	find: find
};