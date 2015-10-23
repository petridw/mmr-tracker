var Joi = require('joi');
var config = require('config');
var http_request = require('request');

var steam_key = config.get('steam').api_key;

exports.register = function(server, options, next) {

  server.method('getMatchDetails', function getMatchDetails(matchID, next) {
    
    var url = 'https://api.steampowered.com/IDOTA2Match_570/GetMatchDetails/V001/?match_id=' +
              matchID + '&key=' + steam_key;

    http_request.get(url, function(err, response, body) {
      var result;
      if (err) return next(err);
      
      try {
        result = JSON.parse(body).result;
      } catch (error) {
        return next(error);
      }
      
      return next(null, result);
    });
    
  });
    
  server.method('getMatchHistory', function getMatchHistory(accountID, next) {
    
    var url = `https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/v1?key=${steam_key}&account_id=${accountID}`;
    
    http_request.get(url, function(err, response, body) {
      var result;
      if (err) return next(err);
      
      try {
        result = JSON.parse(body).result.matches;
      } catch (error) {
        return next(result);
      }
      
      return next(null, result);
    });
    
  });
  
  next();
};

exports.register.attributes = {
    name: 'steam'
};
