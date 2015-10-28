var MMRServerActions = require('../actions/MMRServerActions');
var HttpRequest = require('./HttpRequest');

module.exports = {
  getAllAccounts: function() {
        
    var requestOptions = {
      method: 'GET',
      url: '/api/accounts'
    };
    
    HttpRequest(requestOptions, function(err, data) {
      if (err)
        console.error('Error retrieving accounts.', err);
      else
        MMRServerActions.receiveAllAccounts(data);
    });
  },
  
  createMatch: function(match) {
        
    var requestOptions = {
      method: 'POST',
      url: '/api/match',
      data: match
    };
    
    HttpRequest(requestOptions, function(err, data) {
      if (err)
        console.error('Error creating match.', err);
      else
        MMRServerActions.receiveCreatedMatch(match);
    });
  }
};
