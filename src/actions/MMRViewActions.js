var MMRAppDispatcher = require('../dispatcher/MMRAppDispatcher');

var AccountConstants = require('../constants/AccountConstants');
var MatchConstants = require('../constants/MatchConstants');

var AccountActionTypes = AccountConstants.ActionTypes;
var MatchActionTypes = MatchConstants.ActionTypes;

module.exports = {
  
  showHoveredMatchList: function(matchList) {
    MMRAppDispatcher.handleViewAction({
      type: MatchActionTypes.SHOW_HOVERED_MATCH_LIST,
      matchList: matchList
    });
  },
  
  hideHoveredMatchList: function() {
    MMRAppDispatcher.handleViewAction({
      type: MatchActionTypes.HIDE_HOVERED_MATCH_LIST
    });
  }
  
};
