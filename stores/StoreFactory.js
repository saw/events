var _ = require('lodash');
var microevent = require('microevent');
var events = require('events');

var StoreFactory = function(config, dispatcher, initData) {
		var d = _.cloneDeep(initData);
		var iface = {
			_data: d || {},

			_dispatcher: dispatcher,

			toJSON:function() {
				return JSON.stringify(this._data);
			},
			hydrate: function(data) {
				this._data = data;
			},
		};

		_.mixin(iface, config);
		_.mixin(iface, new events.EventEmitter);

		iface.prototype = function(){};

		return iface;
};

module.exports = StoreFactory;