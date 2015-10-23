var Boom = require('boom');
var db = require('../../../../models');
var _ = require('lodash');
var http_request = require('request');
var config = require('config');

var steam_key = config.get('steam').api_key;

var Account = db.account;
var Match = db.match;

var matchesController = {
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
  
  create: function(server, request, reply) {
    var match = request.payload;
        
    match.win = match.mmrChange >= 0;
        
    if (!match.startTime || !match.hero) {
      
      server.methods.getMatchDetails(match.matchID, function (err, result) {
        if (err) throw new Error(err);
        
        match.hero = getHero(result.players, match.accountID);
        match.startTime = parseInt(result.start_time) * 1000;
        
        console.log(`creating match ${match}`);
        
        return createMatch(match, reply);
      });
      
    } else {
      return createMatch(match, reply);  
    }
    
  },
  
  update: function(request, reply) {
    var match = request.payload;
    
    console.log('Updating match ' + match);
    
    Match.findOne({
      where: {
        matchID: match.matchID
      }
    }).then(function(result) {
      if (!result) return reply(Boom.notFound('Record was not found. Please create before updating.'));
      
      _.extend(result, match);
      result.save().then(function(result) {
        console.log('Updated match, ', result.matchID);
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
  
  findOne(match.matchID, function(err, result) {
    if (err) throw new Error(err);
    
    console.log(result);
    // If matchID already exists, return false for now
    if (result) return reply(false);
    console.log(match);
    
    Match.create(match).then(function(result) {
      console.log(`Created new match ${match.matchID}`);
      return reply(true);
    }, function(err) {
      return reply(Boom.wrap(err, 422));
    });
  });
}

function findOne(matchID, next) {
  Match.findOne({
    where: {
      matchID: matchID
    }
  }).then(function(found_match) {
    return next(null, found_match);
  }, function(err) {
    return next(err);
  });
}

module.exports = matchesController;
