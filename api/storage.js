var Datastore = require('nedb');
var Q = require('q');
var db;

function init() {
	var p = Q.defer();
	if(db) {
		console.warn('db already init, skipping');
		process.nextTick(function() {
			p.resolve();
		});
	}
	db = new Datastore({filename: '/tmp/eventStore'});
	db.loadDatabase(function(err) {
		if(err) {
			p.reject(new Error(err));
		} else {
			p.resolve();
		}
	});

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
	db.find({_id:id}, function(err, doc) {
		if(err) {
			p.reject(new Error(err));
		} else {
			p.resolve(doc);
		}
	});
	return p.promise;
}

function find(query) {
	var p = Q.defer();
	db.find(query, function(err, doc) {
		if(err) {
			p.reject(new Error(err));
		} else {
			p.resolve(doc);
		}
	});
	return p.promise;
}

module.exports = {
	init: init,
	insert: insert,
	get: get,
	find: find
};