var Joi = require('joi');
var accountController = require('./accountController');

exports.register = function(server, options, next) {

  server.route([
    {
      method: 'GET',
      path: '/api/account',
      handler: accountController.getAll
    },
    {
      method: 'GET',
      path: '/api/account/{account}',
      handler: accountController.get
    },
    {
      method: 'POST',
      path: '/api/account',
      handler: accountController.create
    },
    {
      method: 'PUT',
      path: '/api/account/{account}',
      handler: accountController.update
    },
    {
      method: 'DELETE',
      path: '/api/account/{account}',
      handler: accountController.delete
    }
  ]);
  
  next();
};

exports.register.attributes = {
    name: 'accountAPI'
};
