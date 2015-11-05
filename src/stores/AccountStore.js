// The store registers for events it wants to watch
// When an event comes in that the store cares about, it modifies its state
// accordingly

var MMRAppDispatcher = require('../dispatcher/MMRAppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AccountActionTypes = require('../constants/AccountConstants').ActionTypes;
var MMRApiUtils = require('../utils/MMRApiUtils');
var AccountParser = require('../utils/AccountParser');

var assign = require('lodash/object/assign');

var CHANGE_EVENT = 'change';

var accounts = [];
var parsedAccountObject = {
  parsedAccounts: [],
  labels: [],
  series: [],
  minY: 0,
  maxY: 0
};

function parseAccounts(accounts) {

  // Unit should be in a store? OPTIONS store?
  var parsedAccounts = AccountParser(accounts, { unit: 'day' });
  var labels;
  var series;
  
  var chartMinY = 0;
  var chartMaxY = 0;
  
  series = parsedAccounts.map(function(account, index) {
    var data = account.map(function(time_unit){
      return time_unit.netChange;
    });
    
    chartMinY = account.min < chartMinY ? account.min : chartMinY;
    chartMaxY = account.max > chartMaxY ? account.max : chartMaxY;
    
    return {
      name: account.username,
      data: data,
      className: 'ct-series-' + (index + 1),
      key: account.accountID
    };
  });
  
  if (parsedAccounts.length) {
    labels = parsedAccounts[0].map(function(time_unit){
      return time_unit.time;
    });  
  } else {
    labels = [];
  }
  
  
  return {
    parsedAccounts: parsedAccounts,
    labels: labels,
    series: series,
    minY: chartMinY,
    maxY: chartMaxY
  };
}

var AccountStore = assign({}, EventEmitter.prototype, {
  
  initialize: function() {
    MMRApiUtils.getAllAccounts();
  },

  getAll: function() {
    return accounts;
  },
  
  getParsedAccounts: function() {
    return parsedAccountObject;
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
      parsedAccountObject = parseAccounts(accounts);
      AccountStore.emitChange();
      break;
  }
});

AccountStore.initialize();

module.exports = AccountStore;
