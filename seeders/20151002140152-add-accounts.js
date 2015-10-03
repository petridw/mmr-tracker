'use strict';

var Account = require('./../models').Account;

var now = new Date();

var accounts = [
  {
    account_id: "_32454426",
    steam_id: "_76561197992720154",
    username: "j0rlan",
    starting_mmr: 2707,
    current_mmr: 2852,
    createdAt: now,
    updatedAt: now
  },
  {
    account_id: "_31886047",
    steam_id: "_76561197992151775",
    username: "sandfriend",
    starting_mmr: 4698,
    current_mmr: 4844,
    createdAt: now,
    updatedAt: now
  },
  {
    account_id: "_7514776",
    steam_id: "_76561197967780504",
    username: "yuru",
    starting_mmr: 4434,
    current_mmr: 4504,
    createdAt: now,
    updatedAt: now
  },
  {
    account_id: "_18833870",
    steam_id: "_76561197979099598",
    username: "420 BOOTY WIZARD",
    starting_mmr: 3791,
    current_mmr: 3912,
    createdAt: now,
    updatedAt: now
  },
  {
    account_id: "_32452702",
    steam_id: "_76561197992718430",
    username: "Root Beer Guy",
    starting_mmr: 4269,
    current_mmr: 4392,
    createdAt: now,
    updatedAt: now
  },
  {
    account_id: "_3035228",
    steam_id: "_76561197963300956",
    username: "CaptinObvious",
    starting_mmr: 3133,
    current_mmr: 3182,
    createdAt: now,
    updatedAt: now
  },
  {
    account_id: "_76180485",
    steam_id: "_76561198036446213",
    username: "jaekwon",
    starting_mmr: 2437,
    current_mmr: 2437,
    createdAt: now,
    updatedAt: now
  }
];

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('account', accounts, {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('account', null, {});
  }
};
