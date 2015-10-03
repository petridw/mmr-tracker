'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable(
      'match',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        matchID: {
          type: Sequelize.STRING,
          field: 'match_id'
        },
        startTime: {
          type: Sequelize.DATE,
          field: 'start_time'
        },
        win: {
          type: Sequelize.BOOLEAN
        },
        mmrChange: {
          type: Sequelize.INTEGER,
          field: 'mmr_change'
        }
      },
      {
        charset: 'utf8',
        freezeTableName: true
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('match');
  }
};
