var MMRAppDispatcher = require('../dispatcher/MMRAppDispatcher');
var AccountConstants = require('../constants/AccountConstants');
var MatchConstants = require('../constants/MatchConstants');

var AccountActionTypes = AccountConstants.ActionTypes;
var MatchActionTypes = MatchConstants.ActionTypes;

module.exports = {
  
  receiveAllAccounts: function(rawAccounts) {
    // MMRAppDispatcher.dispatch({
    //   type: AccountActionTypes.RECEIVE_RAW_ACCOUNTS,
    //   rawAccounts: rawAccounts
    // });
    MMRAppDispatcher.handleServerAction({
      type: AccountActionTypes.RECEIVE_RAW_ACCOUNTS,
      rawAccounts: rawAccounts
    });
  },
  
  receiveCreatedMatch: function(rawMatch) {
    MMRAppDispatcher.dispatch({
      type: MatchActionTypes.RECEIVE_RAW_CREATED_MATCH,
      rawMatch: rawMatch
    });
  }
};
