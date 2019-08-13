require("dotenv").config();
const User = require("./models").User;
const bcrypt = require("bcryptjs");
const sgMail = require('@sendgrid/mail');
const Wiki = require("./models").Wiki;
const wikiQueries = require("./queries.wikis.js");
const Collaborator = require("./models").Collaborator;
const collaboratorQueries = require("../db/queries.collaborators.js");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = {

    createUser(newUser, callback) {
      const salt = bcrypt.genSaltSync();
      const hashedPassword = bcrypt.hashSync(newUser.password, salt);
      return User.create({
        username: newUser.username,
        email: newUser.email,
        password: hashedPassword
        
      })
        .then((user) => {
          const msg = {
            to: newUser.email,
            from: 'admin@Blocipedia.com',
            subject: 'Blocipedia account created',
            text: 'Blocipedia account has been created',
            html: '<strong>Welcome to Blocipedia</strong>',
          };
          sgMail.send(msg);

            callback(null, user);
        })
        .catch((err) => {
          callback(err);
        })
    },

    upgradeUser(id, callback){
      User.findByPk(id)
      .then(user => {
        user.update({
          role: 1
        });
        callback(null, user);
      })
      .catch(err => {
        callback(err);
      });
    },

    downgradeUser(id){
      User.findByPk(id)
      .then((user) => {
        if(!user) {
          return callback("No user");
        } else {
          return user.update({ role: 0 });
      }
      })
      .catch(err => {
        console.log(err);
      })
    },

    getUser(id, callback){
      let result = {};
      User.findByPk(id)
      .then((user) => {
        if(!user) {
          callback(404);
        } else {
          result["user"] = user;
          Wiki.scope({method: ["lastFiveFor", id]}).findAll()
          .then((wikis) => {
            result["wikis"] = wikis;
            callback(null, result);
            })
            .catch((err) => {
              callback(err);
            })
        }
      });
    },

    getUserCollabs(id, callback) {
      let result = {};
      User.findByPk(id)
      console.log(user.id)
      .then((user) => {
        if(!user) {
          callback(404);
        } else {
          result["user"] = user;
          Collaborator.scope({method: ["isCollaboratorFor", id]}).findAll()
          .then((collaborator) => {
            result["collaborator"] = collaborator;
            callback(null, result);
          })
          .catch((err) => {
            callback(err);
          });
        }
      });
    }

  
  }