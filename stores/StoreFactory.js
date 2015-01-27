var _ = require('lodash');

var StoreFactory = function(config, initData) {
		var d = _.cloneDeep(initData);
		var iface = {
			_data: d || {},

			toJSON:function() {
				return JSON.stringify(this._data);
			},
			hydrate: function(data) {
				this._data = data;
			},
		};

		_.mixin(iface, config);

		return iface;
};

module.exports = StoreFactory;