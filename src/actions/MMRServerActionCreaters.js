var MMRAppDispatcher = require('../dispatcher/MMRAppDispatcher');
var AccountConstants = require('../constants/AccountConstants');
var MatchConstants = require('../constants/MatchConstants');

var AccountActionTypes = AccountConstants.ActionTypes;
var MatchActionTypes = MatchConstants.ActionTypes;

module.exports = {
  
  receiveAllAccounts: function(rawAccounts) {
    MMRAppDispatcher.dispatch({
      type: AccountActionTypes.RECEIVE_RAW_ACCOUNTS,
      rawAccounts: rawAccounts
    });
  },
  
  receiveAccount: function(rawAccount) {
    MMRAppDispatcher.dispatch({
      type: AccountActionTypes.RECEIVE_RAW_ACCOUNT,
      rawAccount: rawAccount
    });
  },
  
  receiveCreatedMatch: function(rawMatch) {
    MMRAppDispatcher.dispatch({
      type: MatchActionTypes.RECEIVE_RAW_CREATED_MATCH,
      rawMatch: rawMatch
    });
  },
  
  receiveMatch: function(rawMatch) {
    MMRAppDispatcher.dispatch({
      type: MatchActionTypes.RECEIVE_RAW_MATCH,
      rawMatch: rawMatch
    });
  }
};
