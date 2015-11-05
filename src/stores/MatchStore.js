// The store registers for events it wants to watch
// When an event comes in that the store cares about, it modifies its state
// accordingly

var MMRAppDispatcher = require('../dispatcher/MMRAppDispatcher');
var EventEmitter = require('events').EventEmitter;
var MatchActionTypes = require('../constants/MatchConstants').ActionTypes;
var MMRApiUtils = require('../utils/MMRApiUtils');

var assign = require('lodash/object/assign');

var CHANGE_EVENT = 'change';

var hoveredMatchList = {};

var MatchStore = assign({}, EventEmitter.prototype, {
  
  initialize: function() {
  },
  
  getHoveredMatchList: function() {
    return hoveredMatchList;
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
MatchStore.dispatchToken = MMRAppDispatcher.register(function(payload) {
  switch(payload.action.type) {
    case MatchActionTypes.SHOW_HOVERED_MATCH_LIST:
      hoveredMatchList = payload.action.matchList;
      MatchStore.emitChange();
      break;
    case MatchActionTypes.HIDE_HOVERED_MATCH_LIST:
      hoveredMatchList = {};
      MatchStore.emitChange();
      break;
  }
});

MatchStore.initialize();

module.exports = MatchStore;
