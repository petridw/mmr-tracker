var Dispatcher = require('flux').Dispatcher;

var assign = require('lodash/object/assign');

var MMRAppDispatcher = assign(new Dispatcher(), {
    handleServerAction: function (action) {
        this.dispatch({
            source: 'server',
            action: action
        });
    },
    handleViewAction: function (action) {
        this.dispatch({
            source: 'view',
            action: action
        });
    }
});

module.exports = MMRAppDispatcher;
