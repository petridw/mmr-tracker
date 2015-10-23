var Joi = require('joi');
var accountsController = require('../controllers/accountsController');

exports.register = function(server, options, next) {

  server.route([
    {
      method: 'GET',
      path: '/api/accounts/{matches?}',
      handler: accountsController.getAll
    },
    {
      method: 'GET',
      path: '/api/account/{account}/{matches?}',
      handler: accountsController.get
    },
    {
      method: 'POST',
      path: '/api/account',
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
      path: '/api/account',
      handler: accountsController.update,
      config: {
        validate: {
          payload: {
            accountID: Joi.string().required(),
            steamID: Joi.string(),
            username: Joi.string(),
            startingMMR: Joi.number().integer().positive(),
            currentMMR: Joi.number().integer().positive(),
            lastPlayed: Joi.date(),
          }
        }
      }
    },
    {
      method: 'DELETE',
      path: '/api/account/{account}',
      handler: accountsController.delete
    },
    {
      method: 'GET',
      path: '/api/matchHistory/{account}',
      handler: accountsController.getMatchHistory.bind(null, server)
    }
  ]);
  
  next();
};

exports.register.attributes = {
    name: 'accountRoutes'
};
