'use strict';
const faker = require("faker");

let wikis = [

  {
    title: faker.hacker.noun(),
    body: faker.hacker.phrase(),
    private: false,
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: faker.hacker.noun(),
    body: faker.hacker.phrase(),
    private: false,
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: faker.hacker.noun(),
    body: faker.hacker.phrase(),
    private: false,
    userId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: faker.hacker.noun(),
    body: faker.hacker.phrase(),
    private: false,
    userId: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  },

];
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Wikis", wikis, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Wikis", null, {});
  }
};
