exports.register = function(server, options, next) {

  // Add credentials to all views so that logout button can be shown
  server.ext('onPreResponse', function(request, reply) {
    
    var response = request.response;
    if (response.variety && response.variety === 'view') {
      response.source.context = response.source.context || {};
      response.source.context.credentials = request.auth.isAuthenticated ? request.auth.credentials : null;
    }
    return reply.continue();
  });
  
  next();
};

exports.register.attributes = {
    name: 'credentials'
};
