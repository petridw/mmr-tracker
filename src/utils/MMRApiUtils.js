var MMRServerActionCreaters = require('../actions/MMRServerActionCreaters');
var HttpRequest = require('./HttpRequest');

module.exports = {
  getAllAccounts: function() {
    
    var requestOptions = {
      method: 'GET',
      url: '/api/accounts'
    };
    
    HttpRequest(requestOptions, function(err, data) {
      if (err) console.error('Error retrieving accounts.', err);
      else MMRServerActionCreaters.receiveAllAccounts(data);
    });
  },
  
  createMatch: function(match) {
    
    var requestOptions = {
      method: 'POST',
      url: '/api/match',
      data: match
    };
    
    HttpRequest(requestOptions, function(err, data) {
      if (err) console.error('Error creating match.', err);
      else MMRServerActionCreaters.receiveCreatedMatch(match);
    });
  }
};
