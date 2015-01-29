var api = require('../api/api.js');
var StoreFactory = require('./StoreFactory.js');

var q = require('q');

var NoteStore = {

	getNoteById: function(id) {
		return api.callMethod('note', 'get', {id:id});
	},
	getNotesForUser: function(ownerId) {
		return api.callMethod('user', 'get', {ownerId:ownerId});
	},
	addNote: function(noteConfig) {
		return this._dispatcher.dispatch({
			eventName: 'new-note',
			newNote: noteConfig
		});
	},

	_createNote: function(noteConfig) {
		return api.callMethod('note', 'post', noteConfig);
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
					store.trigger('change');
				});

				break;
		}
	});

	return store;


}