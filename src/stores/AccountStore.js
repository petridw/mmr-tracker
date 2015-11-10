var Immutable = require('immutable');

var MMRAppDispatcher = require('../dispatcher/MMRAppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AccountActionTypes = require('../constants/AccountConstants').ActionTypes;
var MMRApiUtils = require('../utils/MMRApiUtils');
var AccountParser = require('../utils/AccountParser');

var assign = require('lodash/object/assign');

var CHANGE_EVENT = 'change';

// var accounts = [];
// 
// var parsedAccountObject = {
//   parsedAccounts: [],
//   labels: [],
//   series: [],
//   minY: 0,
//   maxY: 0
// };



// ********
// Define Immutable Objects
// 
// Since these are immutable the React components should be able to easily tell
// whether or not they need to rerender / change state.
// ********

var Account = Immutable.Record({
  Matches: Immutable.List(),
  accountID: undefined,
  createdAt: new Date(),
  currentMMR: undefined,
  lastPlayed: new Date(),
  startingMMR: undefined,
  steamID: undefined,
  updatedAt: new Date(),
  username: undefined
});

var Match = Immutable.Record({
  accountID: undefined,
  createdAt: new Date(),
  hero: undefined,
  id: undefined,
  matchID: undefined,
  mmrChange: undefined,
  startTime: new Date(),
  updatedAt: new Date(),
  win: undefined
});

var ParsedMatchDay = Immutable.Record({
  endingMMR: undefined,
  matches: Immutable.List(),
  netChange: undefined,
  time: new Date()
});

var Series = Immutable.Record({
  className: undefined,
  data: Immutable.List(),
  key: undefined,
  name: undefined,
});

var ParsedAccountObject = Immutable.Record({
  parsedAccounts: Immutable.List(),
  labels: Immutable.List(),
  series: Immutable.List(),
  minY: 0,
  maxY: 0
});


var accounts = new Immutable.List();
var parsedAccountObject = new ParsedAccountObject();

function createParsedAccounts(rawAccounts) {

  // Unit should be in a store? OPTIONS store?
  var parsedAccounts = AccountParser(rawAccounts, { unit: 'day' });
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
    
    return new Series({
      name: account.username,
      data: new Immutable.List(data),
      className: 'ct-series-' + (index + 1),
      key: account.accountID
    });
  });
  
  if (parsedAccounts.length) {
    labels = new Immutable.List(parsedAccounts[0].map(function(time_unit){
      return time_unit.time;
    }));  
  } else {
    labels = new Immutable.List();
  }
  
  parsedAccounts = new Immutable.List(parsedAccounts.map(function(account) {
    return new ParsedMatchDay(account);
  }));
  
  parsedAccountObject = new ParsedAccountObject({
    parsedAccounts: parsedAccounts,
    labels: labels,
    series: series,
    minY: chartMinY,
    maxY: chartMaxY
  });
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
  var immutableAccounts;
  
  switch(payload.action.type) {
    case AccountActionTypes.RECEIVE_RAW_ACCOUNTS:
    
      // accounts = payload.action.rawAccounts;
      accounts = accounts.clear();
      payload.action.rawAccounts.forEach(function(account, index) {
        accounts = accounts.push(new Account(account));
      });
      
      createParsedAccounts(payload.action.rawAccounts);
      
      
      AccountStore.emitChange();
      break;
  }
});

AccountStore.initialize();

module.exports = AccountStore;
