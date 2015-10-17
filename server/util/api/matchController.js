var Boom = require('boom');
var db = require('../../../models');
var _ = require('lodash');
var http_request = require('request');
var config = require('config');

var steam_key = config.get('steam').api_key;

var Account = db.account;
var Match = db.match;

var matchController = {
  getAll: function(req, reply) {
    Match.findAll().then(function(matches) {
      reply(matches);  
    },
    function(err) {
      reply(Boom.wrap(err, 422));
    });
  },
  
  get: function(request, reply) {
    var matchID = encodeURIComponent(request.params.match);
    
    Match.findOne({
      where: {
        matchID: matchID
      }
    }).then(function(match) {
      reply(match);
    }, function(err) {
      reply(Boom.wrap(err, 422));
    });
  },
  
  create: function(request, reply) {
    var match = request.payload;
        
    match.win = match.mmrChange >= 0;
    
    var url = 'https://api.steampowered.com/IDOTA2Match_570/GetMatchDetails/V001/?match_id=' + match.matchID + '&key=' + steam_key;
    
    if (!match.startTime || !match.hero) {
      
      http_request.get(url, function (err, res, body) {
        var result = JSON.parse(body).result;
        
        match.hero = getHero(result.players, match.accountID);
        match.startTime = parseInt(result.start_time) * 1000;
        
        createMatch(match, reply);
      });
      
    } else {
      createMatch(match, reply);
    }
    
  },
  
  update: function(request, reply) {
    var match = request.payload;
    
    Match.findOne({
      where: {
        matchID: match.matchID
      }
    }).then(function(result) {
      if (!result) return reply(Boom.notFound('Record was not found. Please create before updating.'));
      
      _.extend(result, match);
      result.save().then(function(result) {
        console.log('Updated match', result);
        reply(result);
      }, function(err) {
        reply(Boom.wrap(err, 422));
      });
    }, function(err) {
      reply(Boom.wrap(err, 422));
    });
  },
  
  upsert: function(request, reply) {
    var match = request.payload;
    
    Match.upsert(match).then(function(created) {
      reply(created);
    }, function(err) {
      reply(Boom.wrap(err, 422));
    });
  },
  
  delete: function(request, reply) {
    reply(Boom.methodNotAllowed('That method is not allowed. Get that shit outta here.'));
  }
};

function getHero(array, accountID) {
  for (var i = 0; i < array.length; i ++) {
    console.log(accountID + ' === ' + array[i].account_id);
    if ('_' + array[i].account_id === accountID) {
      return array[i].hero_id;
    }
  }
  return -1;
}

function createMatch(match, reply) {
  Match.create(match).then(function(result) {
    console.log('created match', result);
    reply(true);
  }, function(err) {
    reply(Boom.wrap(err, 422));
  });  
}

module.exports = matchController;
