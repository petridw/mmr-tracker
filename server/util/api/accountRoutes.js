var Joi = require('joi');
var accountController = require('./accountController');

exports.register = function(server, options, next) {

  server.route([
    {
      method: 'GET',
      path: '/api/accounts',
      handler: accountController.getAll
    },
    {
      method: 'GET',
      path: '/api/accounts/{account}',
      handler: accountController.get
    },
    {
      method: 'POST',
      path: '/api/accounts',
      handler: accountController.create,
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
      handler: accountController.update,
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
      handler: accountController.delete
    }
  ]);
  
  next();
};

exports.register.attributes = {
    name: 'accountAPI'
};
