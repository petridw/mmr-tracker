var Boom = require('boom');

var accountController = {
  getAll: function(req, reply) {
    reply('getAll');
  },
  
  get: function(req, reply) {
    reply('get');
  },
  
  create: function(req, reply) {
    reply('create');
  },
  
  update: function(req, reply) {
    reply('update');
  },
  
  delete: function(req, reply) {
    reply(Boom.methodNotAllowed('That method is not allowed. Get that shit outta here.'));
  }
};

module.exports = accountController;
