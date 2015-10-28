// The store registers for events it wants to watch
// When an event comes in that the store cares about, it modifies its state
// accordingly

var MMRAppDispatcher = require('../dispatcher/MMRAppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AccountActionTypes = require('../constants/AccountConstants').ActionTypes;
var MMRApiUtils = require('../utils/MMRApiUtils');

var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var accounts = [];

var AccountStore = assign({}, EventEmitter.prototype, {
  
  initialize: function() {
    MMRApiUtils.getAllAccounts();
  },

  getAll: function() {
    console.log('getting accounts from store, ', accounts);
    return accounts;
  },
  
  getAccount: function(index) {
    return accounts[index];
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AccountStore.dispatchToken = MMRAppDispatcher.register(function(payload) {
  switch(payload.action.type) {
    case AccountActionTypes.RECEIVE_RAW_ACCOUNTS:
      accounts = payload.action.rawAccounts;
      AccountStore.emitChange();
      break;
  }
});

AccountStore.initialize();

module.exports = AccountStore;
