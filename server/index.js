var Hapi = require('hapi');
var Good = require('good');
var Path = require('path');
var config = require('config');
// var db = require('./util/db/sequelize');
// var Account = require('./util/models/Account');
// var Match = require('./util/models/Match');
var db = require('../models');

var server = new Hapi.Server({
  connections: {
    router: {
      stripTrailingSlash: true
    }
  }
});

server.connection({ 
    host: config.get('server').host,
    port: config.get('server').port,
    routes: {
      cors: true,
      files: {
        relativeTo: Path.join(__dirname, '/../client')
      }
    }
});

server.register([
  {
    register: Good,
    options: {
        reporters: [{
            reporter: require('good-console'),
            events: {
                response: '*',
                log: '*'
            }
        }]
    }
  },
  {
    register: require('./util/static/static')
  },
  {
    register: require('./util/api/accountRoutes')
  },
  {
    register: require('./util/api/matchRoutes')
  }
], function (err) {
    if (err) throw err;

    server.start(function () {
        server.log('info', 'Server running at: ' + server.info.uri);
    });
});

module.exports = server;
