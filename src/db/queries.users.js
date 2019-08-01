require("dotenv").config();
const User = require("./models").User;
const bcrypt = require("bcryptjs");
const sgMail = require('@sendgrid/mail');
const Wiki = require("./models").Wiki;
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
      User.findById(id)
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

    downgradeUser(id, callback){
      User.findById(id)
      .then(user => {
        user.update({
          role: 0
        });
        callback(null, user);
      })
      .catch(err => {
        callback(err);
      });
    },

    getUser(id, callback){
      let result = {};
      User.findById(id)
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
      })
    }


  
  }