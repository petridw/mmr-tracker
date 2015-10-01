var Sequelize = require('sequelize');
var sequelize = require('./../db/sequelize');

var Account = sequelize.define('account', {
  accountID: {
    type: Sequelize.STRING,
    field: 'account_id',
    primaryKey: true
  },
  steamID: {
    type: Sequelize.STRING,
    field: 'steam_id'
  },
  username: {
    type: Sequelize.STRING
  },
  startingMMR: {
    type: Sequelize.INTEGER,
    field: 'starting_mmr'
  },
  currentMMR: {
    type: Sequelize.INTEGER,
    field: 'current_mmr'
  }
}, {
  freezeTableName: true
});

module.exports = Account;
