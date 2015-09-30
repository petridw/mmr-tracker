var Hapi = require('hapi');
var Good = require('good');


var server = new Hapi.Server();
server.connection({ 
    host: 'localhost', 
    port: process.env.PORT || 3000 
});

server.route({
    method: 'GET',
    path:'/hello', 
    handler: function (request, reply) {
        reply('hello world');
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
  }
], function (err) {
    if (err) throw err;

    server.start(function () {
        server.log('info', 'Server running at: ' + server.info.uri);
    });
});

module.exports = server;
