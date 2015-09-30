
exports.register = function(server, options, next) {

  server.register(require('inert'), function (err) {

    if (err) throw err;

    server.route([
      {
        method: 'GET',
        path: '/',
        handler: {
          file: 'index.html'
        }
      },
      
      {
        method: 'GET',
        path: '/css/{param*}',
        handler: {
          directory: {
            path: 'css'
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
        }
      }
    ]);

    next();
    
  });
};

exports.register.attributes = {
    name: 'static'
};
