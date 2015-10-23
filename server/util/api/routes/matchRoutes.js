var Joi = require('joi');
var matchesController = require('../controllers/matchesController');

exports.register = function(server, options, next) {

  server.route([
    {
      method: 'GET',
      path: '/api/matches',
      handler: matchesController.getAll
    },
    {
      method: 'GET',
      path: '/api/match/{match}',
      handler: matchesController.get
    },
    {
      method: 'POST',
      path: '/api/match',
      handler: matchesController.create.bind(null, server),
      config: {
        validate: {
          payload: {
            matchID: Joi.string().required(),
            startTime: Joi.date(),
            mmrChange: Joi.number().integer().required(),
            accountID: Joi.string().required(),
            hero: Joi.number().integer()
          }
        }
      }
    },
    {
      method: 'PUT',
      path: '/api/match',
      handler: matchesController.update,
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
      handler: matchesController.delete
    }
  ]);
  
  next();
};

exports.register.attributes = {
    name: 'matchRoutes'
};
