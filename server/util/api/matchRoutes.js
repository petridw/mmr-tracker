var Joi = require('joi');
var accountController = require('./matchController');

exports.register = function(server, options, next) {

  server.route([
    {
      method: 'GET',
      path: '/api/match',
      handler: matchController.getAll
    },
    {
      method: 'GET',
      path: '/api/match/{match}',
      handler: matchController.get
    },
    {
      method: 'POST',
      path: '/api/match',
      handler: matchController.create,
      config: {
        validate: {
          payload: {
            matchID: Joi.string().required(),
            startTime: Joi.date().required(),
            win: Joi.boolean().required(),
            mmrChange: Joi.number().integer().required(),
            accountID: Joi.string().required()
          }
        }
      }
    },
    {
      method: 'PUT',
      path: '/api/match',
      handler: matchController.upsert,
      config: {
        validate: {
          payload: {
            matchID: Joi.string().required(),
            startTime: Joi.date(),
            win: Joi.boolean(),
            mmrChange: Joi.number().integer(),
            accountID: Joi.string()
          }
        }
      }
    },
    {
      method: 'DELETE',
      path: '/api/match/{match}',
      handler: matchController.delete
    }
  ]);
  
  next();
};

exports.register.attributes = {
    name: 'accountAPI'
};
