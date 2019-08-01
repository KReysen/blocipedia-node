'use strict';
const bcrypt = require("bcryptjs");

const faker = require("faker");

const encryptPassword = (password) => {
  const salt = bcrypt.genSaltSync();
  const hashedPassword = bcrypt.hashSync(password, salt);
  return hashedPassword;
}
let users = [
  {
    username: 'Leo',
    email: 'Leo@cat.com',
    password: encryptPassword('password'),
    createdAt: new Date(),
    updatedAt: new Date(),
    role: 0
  },
  {
    username: 'Mack',
    email: 'Mack@dog.com',
    password: encryptPassword('password1'),
    createdAt: new Date(),
    updatedAt: new Date(),
    role: 0
  },
  {
    username: 'MrMoneybags',
    email: 'rich@wealth.com',
    password: encryptPassword('password2'),
    createdAt: new Date(),
    updatedAt: new Date(),
    role: 1
  },

  {
    username: 'admin',
    email: 'admin@blocipedia.com',
    password: encryptPassword('password3'),
    createdAt: new Date(),
    updatedAt: new Date(),
    role: 2
  },
];

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert("Users", users, {});
  },

  down: (queryInterface, Sequelize) => {
  return queryInterface.bulkDelete("Users", null, {});
  }
};
