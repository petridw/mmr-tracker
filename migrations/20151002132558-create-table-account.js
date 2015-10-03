'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable(
      'account',
      {
        accountID: {
          type: Sequelize.STRING,
          field: 'account_id',
          primaryKey: true,
          unique: true
        },
        steamID: {
          type: Sequelize.STRING,
          field: 'steam_id',
          unique: true
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
        },
        createdAt: {
          type: Sequelize.DATE
        },
        updatedAt: {
          type: Sequelize.DATE
        }
      },
      {
        charset: 'utf8',
        freezeTableName: true
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('account');
  }
};
