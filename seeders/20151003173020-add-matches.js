'use strict';

var now = new Date();

var matches = [
  // sandfriend
  {
    match_id: "1840184040",
    start_time: new Date(1443890231000),
    win: false,
    mmr_change: -25,
    accountID: "_31886047",
    createdAt: now,
    updatedAt: now
  },
  {
    match_id: "1835395508",
    start_time: new Date(1443732961000),
    win: true,
    mmr_change: 25,
    accountID: "_31886047",
    createdAt: now,
    updatedAt: now
  },
  {
    match_id: "1835309483",
    start_time: new Date(1443729139000),
    win: true,
    mmr_change: 25,
    accountID: "_31886047",
    createdAt: now,
    updatedAt: now
  },
  {
    match_id: "1832809681",
    start_time: new Date(1443647569000),
    win: true,
    mmr_change: 24,
    accountID: "_31886047",
    createdAt: now,
    updatedAt: now
  },
  {
    match_id: "1832747918",
    start_time: new Date(1443644512000),
    win: true,
    mmr_change: 24,
    accountID: "_31886047",
    createdAt: now,
    updatedAt: now
  },
  // yuru
  {
    match_id: "1840827706",
    start_time: new Date(1443911208000),
    win: false,
    mmr_change: -25,
    accountID: "_7514776",
    createdAt: now,
    updatedAt: now
  },
];

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('match', matches, {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('match', null, {});
  }
};
