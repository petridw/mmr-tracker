var Boom = require('boom');
var Account = require('../models/Account');
var _ = require('lodash');

var accountsController = {
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
    
    Account.create(account).then(function(result) {
      reply(result);
    }, function(err) {
      reply(Boom.wrap(err, 422));
    });
    
  },
  
  update: function(request, reply) {
    var account = request.payload;
    
    Account.findOne({
      where: {
        accountID: account.accountID
      }
    }).then(function(result) {
      _.extend(result, account);
      result.save().then(function(result) {
        reply(result);
      }, function(err) {
        reply(Boom.wrap(err, 422));
      });
    }, function(err) {
      reply(Boom.wrap(err, 422));
    });
  },
  
  delete: function(request, reply) {
    reply(Boom.methodNotAllowed('That method is not allowed. Get that shit outta here.'));
  }
};

module.exports = accountsController;
