var Boom = require('boom');
var db = require('../../../../models');
var _ = require('lodash');
var Path = require('path');
var config = require('config');

var Account = db.account;
var Match = db.match;

var accountsController = {
  getAll: function(request, reply) {
    var find_options = {};
    
    if (encodeURIComponent(request.query.matches) !== 'false') {
      find_options.include = [
        { model: Match, as: 'Matches' }
      ];
    }
    
    Account.findAll(find_options).then(function(accounts) {
      reply(accounts);  
    },
    function(err) {
      reply(Boom.wrap(err, 422));
    });
  },
  
  get: function(request, reply) {
    var accountID = encodeURIComponent(request.params.account);
    
    if (accountID.charAt(0) !== '_') {
      return reply.redirect('/api/account/_' + accountID);
    }
    
    var find_options = {
      where: {
        accountID: accountID
      }
    };
    
    if (encodeURIComponent(request.query.matches) !== 'false') {
      find_options.include = [
        { model: Match, as: 'Matches' }
      ];
    }
    
    Account.findOne(find_options).then(function(account) {
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
    
    var account = {
      accountID: request.payload.accountID,
    };
    
    if (request.payload.steamID) account.steamID = request.payload.steamID;
    if (request.payload.username) account.username = request.payload.username;
    if (request.payload.startingMMR) account.startingMMR = request.payload.startingMMR;
    if (request.payload.currentMMR) account.currentMMR = request.payload.currentMMR;
    if (request.payload.lastPlayed) account.lastPlayed = request.payload.lastPlayed;
    
    Account.findOne({
      where: {
        accountID: request.payload.accountID
      }
    }).then(function(result) {
      if (!result) return reply(Boom.notFound('Record was not found. Please create before updating.'));
            
      _.extend(result, account);
      result.save().then(function(updated_account) {
        
        return reply(updated_account);
                
      }, function(err) {
        return reply(Boom.wrap(err, 422));
      });
    }, function(err) {
      return reply(Boom.wrap(err, 422));
    });
  },
  
  delete: function(request, reply) {
    reply(Boom.methodNotAllowed('That method is not allowed. Get that shit outta here.'));
  },
  
  getMatchHistory: function(server, request, reply) {
    var accountID = encodeURIComponent(request.params.account);
    
    accountID = accountID.charAt(0) === '_' ? accountID.substring(1) : accountID;
    
    server.methods.getMatchHistory(accountID, function(err, result) {
      if (err) throw new Error(err);
      return reply(result);
    });
  }
};

module.exports = accountsController;
