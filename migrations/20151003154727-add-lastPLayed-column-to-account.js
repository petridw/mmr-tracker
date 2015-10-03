'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'account',
      'lastPlayed', 
      {
        type: Sequelize.DATE
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'account',
      'lastPlayed'
    );
  }
};
