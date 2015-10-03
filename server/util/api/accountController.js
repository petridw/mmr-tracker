var Boom = require('boom');
var db = require('../../../models');
var _ = require('lodash');
var Path = require('path');

var Account = db.account;

var accountController = {
  getAll: function(req, reply) {
    Account.findAll().then(function(accounts) {
      reply(accounts);  
    },
    function(err) {
      reply(Boom.wrap(err, 422));
    });
  },
  
  get: function(request, reply) {
    var accountID = '_' + encodeURIComponent(request.params.account);
    
    Account.findOne({
      where: {
        accountID: accountID
      }
    }).then(function(account) {
      reply(account);
    }, function(err) {
      reply(Boom.wrap(err, 422));
    });
  },
  
  create: function(request, reply) {
    var account = request.payload;
    
    Account.findOrCreate({
      where: {
        accountID: account.accountID
      },
      defaults: account
    }).then(function(result, created) {
      reply(result);
    }, function(err) {
      reply(Boom.wrap(err, 422));
    });
    
  },
  
  update: function(request, reply) {
    var account = request.payload;
    var matchID = account.matchID;
    var startTime = account.startTime;
    
    delete account.matchID;
    delete account.startTime;
    
    Account.findOne({
      where: {
        accountID: account.accountID
      }
    }).then(function(result) {
      if (!result) return reply(Boom.notFound('Record was not found. Please create before updating.'));
      
      var mmrChange = account.currentMMR - result.currentMMR;
      
      _.extend(result, account);
      result.save().then(function(result) {
        
        var server = require(Path.join(__dirname, '../../index.js'));
        
        
        // TODO: either use full address (need to get host and port from config),
        // or figure out a better way to do this. Is internal routing the way to go?
        server.inject({
          url: '/api/match',
          method: 'POST',
          payload: { 
            matchID: matchID,
            accountID: account.accountID,
            mmrChange: mmrChange,
            startTime: startTime
          }
        }, function(response) {
          reply(response);
        });
        
      }, function(err) {
        reply(Boom.wrap(err, 422));
      });
    }, function(err) {
      reply(Boom.wrap(err, 422));
    });
  },
  
  upsert: function(request, reply) {
    var account = request.payload;
    var matchID = account.matchID;
    delete account.matchID;
    
    Account.upsert(account).then(function(created) {
      
      server.inject({
        url: '/api/match',
        method: 'POST',
        payload: { matchID: matchID, accountID: account.accountID }
      }, function(response) {
        reply(created);
      });
      
    }, function(err) {
      reply(Boom.wrap(err, 422));
    });
  },
  
  delete: function(request, reply) {
    reply(Boom.methodNotAllowed('That method is not allowed. Get that shit outta here.'));
  }
};

module.exports = accountController;
