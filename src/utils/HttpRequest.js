// Simple http request
//  - Assumes JSON response

module.exports = function HttpRequest(options, next) {
  
  var request = new XMLHttpRequest();
  
  request.open(options.method, options.url, true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      // Success!
      var data = JSON.parse(request.responseText);
      
      return next(null, data);
    } else {
      // We reached our target server, but it returned an error
      return next(request.status);
    }
  };

  request.onerror = function(err) {
    // There was a connection error of some sort
    return next(request);
  };

  request.send(options.data);
  
};
