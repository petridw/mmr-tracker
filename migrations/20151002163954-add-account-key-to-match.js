'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'match',
      'accountID', 
      {
        type: Sequelize.STRING,
        allowNull: false
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'match',
      'accountID'
    );
  }
};
