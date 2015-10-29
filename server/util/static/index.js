
exports.register = function(server, options, next) {

  server.register(require('inert'), function (err) {

    if (err) throw err;

    server.route([
      {
        method: 'GET',
        path: '/',
        handler: {
          file: 'index.html'
        },
        config: {
          cache: {
              expiresIn: 30,
              privacy: 'private'
          }
        }
      },
      
      {
        method: 'GET',
        path: '/css/{param*}',
        handler: {
          directory: {
            path: 'css'
          }
        },
        config: {
          cache: {
              expiresIn: 30,
              privacy: 'private'
          }
        }
      },
      
      {
        method: 'get',
        path: '/build/{param*}',
        handler: {
          directory: {
            path: 'build'
          }
        },
        config: {
          cache: {
              expiresIn: 30,
              privacy: 'private'
          }
        }
      }
    ]);

    next();
    
  });
};

exports.register.attributes = {
    name: 'static'
};
