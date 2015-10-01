var Hapi = require('hapi');
var Good = require('good');
var Path = require('path');
var db = require('./util/db/sequelize');
var Account = require('./util/models/Account');
var Match = require('./util/models/Match');

Account.sync({ force: true });
Match.sync({ force: true });

var server = new Hapi.Server({
  connections: {
    router: {
      stripTrailingSlash: true
    }
  }
});

server.connection({ 
    host: 'localhost', 
    port: process.env.PORT || 3000,
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
    register: require('./util/api/accountsAPI')
  }
], function (err) {
    if (err) throw err;

    server.start(function () {
        server.log('info', 'Server running at: ' + server.info.uri);
    });
});

module.exports = server;
