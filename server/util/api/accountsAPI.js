var Joi = require('joi');
var accountsController = require('./accountsController');

exports.register = function(server, options, next) {

  server.route([
    {
      method: 'GET',
      path: '/api/accounts',
      handler: accountsController.getAll
    },
    {
      method: 'GET',
      path: '/api/accounts/{account}',
      handler: accountsController.get
    },
    {
      method: 'POST',
      path: '/api/accounts',
      handler: accountsController.create,
      config: {
        validate: {
          payload: {
            accountID: Joi.string().required(),
            steamID: Joi.string(),
            username: Joi.string().required(),
            startingMMR: Joi.number().integer().positive().required(),
            currentMMR: Joi.number().integer().positive().required()
          }
        }
      }
    },
    {
      method: 'PUT',
      path: '/api/accounts',
      handler: accountsController.update,
      config: {
        validate: {
          payload: {
            accountID: Joi.string().required(),
            steamID: Joi.string(),
            username: Joi.string(),
            startingMMR: Joi.number().integer().positive(),
            currentMMR: Joi.number().integer().positive()
          }
        }
      }
    },
    {
      method: 'DELETE',
      path: '/api/accounts/{account}',
      handler: accountsController.delete
    }
  ]);
  
  next();
};

exports.register.attributes = {
    name: 'accountAPI'
};
