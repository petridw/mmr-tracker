'use strict';
module.exports = function(sequelize, DataTypes) {
  var Match = sequelize.define('match', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    matchID: {
      type: DataTypes.STRING,
      field: 'match_id'
    },
    startTime: {
      type: DataTypes.DATE,
      field: 'start_time'
    },
    win: {
      type: DataTypes.BOOLEAN
    },
    mmrChange: {
      type: DataTypes.INTEGER,
      field: 'mmr_change'
    },
    accountID: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    freezeTableName: true
  });
  return Match;
};
