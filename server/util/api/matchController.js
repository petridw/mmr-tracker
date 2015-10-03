var Boom = require('boom');
var db = require('../../../models');
var _ = require('lodash');

var Account = db.account;

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
    var matchID = '_' + encodeURIComponent(request.params.match);
    
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
    
    Match.findOrCreate({
      where: {
        matchID: match.matchID
      },
      defaults: match
    }).then(function(result, created) {
      reply(result);
    }, function(err) {
      reply(Boom.wrap(err, 422));
    });
    
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

module.exports = matchController;
