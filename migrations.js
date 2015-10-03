var Umzug = require('umzug');
var umzug = new Umzug({
  storage: 'json',
  logging: false,
  upName: 'up',
  downName: 'down',
  path: migrations
});
