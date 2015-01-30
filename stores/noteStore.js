var api = require('../api/api.js');
var StoreFactory = require('./StoreFactory.js');
var Q = require('q');

var NoteStore = {

	getNoteById: function(id) {
		return api.callMethod('note', 'get', {id:id});
	},
	getNotesForUser: function(ownerId) {
		var p = Q.defer();
		var self = this;
		if(!self._data.notes) {
			api.callMethod('note', 'get', {owner:ownerId})
			.then(function(resp) {
				self._data.notes = resp;
				p.resolve(resp);
				self.emit('change');
			});
		} else {
			setTimeout(function() {
				p.resolve(self._data.notes);
				self.emit('change');
			}, 0);
		}

		return p.promise;


	},

	refresh: function(ownerId) {
		console.log('refreshing');
		delete this._data.notes;
		this.getNotesForUser(ownerId);
	},
	//synchronous
	getCachedNotesForUser: function(ownerId) {
		return this._data.notes;
	},

	addNote: function(noteConfig) {
		return this._dispatcher.dispatch({
			eventName: 'new-note',
			newNote: noteConfig
		});
	},

	_createNote: function(noteConfig) {

		var p = api.callMethod('note', 'post', noteConfig);
		noteConfig.pending = true;
		this._data.notes.push(noteConfig);
		this.emit('change');
		return p;
	}
};

module.exports = function(initData, appContext) {

	var dispatcher = appContext.dispatcher, userId;
	if(appContext.user) {
		userId = appContext.user._id;
	}
	var store = StoreFactory(NoteStore, dispatcher, initData);

	dispatcher.register(function(payload) {
		switch(payload.eventName) {
			case 'new-note':
				payload.newNote.owner = userId;

				store._createNote(payload.newNote).then(function() {
					store.emit('change');
					store.refresh(userId);
				});

				break;
		}
	});

	return store;


}