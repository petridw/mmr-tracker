'use strict';
module.exports = function(sequelize, DataTypes) {
  var Account = sequelize.define('account', {
    accountID: {
      type: DataTypes.STRING,
      field: 'account_id',
      primaryKey: true,
      unique: true
    },
    steamID: {
      type: DataTypes.STRING,
      field: 'steam_id',
      unique: true
    },
    username: {
      type: DataTypes.STRING
    },
    startingMMR: {
      type: DataTypes.INTEGER,
      field: 'starting_mmr'
    },
    currentMMR: {
      type: DataTypes.INTEGER,
      field: 'current_mmr'
    },
    lastPlayed: {
      type: DataTypes.DATE
    },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    }
  }, {
    classMethods: {
      associate: function(models) {
        Account.hasMany(models.match, { as: 'Matches', foreignKey: 'accountID' });
      }
    },
    freezeTableName: true
  });
  return Account;
};
