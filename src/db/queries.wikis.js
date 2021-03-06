require("dotenv").config();
const Wiki = require("./models").Wiki;
const Collaborator = require("./models").Collaborator;
const User = require("./models").User;
const Authorizer = require("../policies/application");

module.exports = {
    getAllWikis(callback) {
        return Wiki.findAll({
          include: [
            {model: Collaborator, as: "collaborators", include: [
              {model: User}
            ]},
          ]})
        .then((wikis) => {
            callback(null, wikis);
        })
        .catch((err) => {
            callback(err);
        })
    },
    addWiki(newWiki, callback){
        return Wiki.create({
            title: newWiki.title,
            body: newWiki.body,
            private: newWiki.private,
            userId: newWiki.userId
        })
        .then((wiki) => {
            callback(null, wiki);
        })
        .catch((err) => {
            callback(err);
        })
    },
    getWiki(id, callback){
        return Wiki.findByPk(id)    
        .then((wiki) => {
          callback(null, wiki);
        })
        .catch((err) => {
          callback(err);
        })
    },

    deleteWiki(id, callback){
        return Wiki.destroy({
            where: {id}
        })
        .then((wiki) => {
            callback(null, wiki);
        })
        .catch((err) => {
            callback(err);
        })
    },
    updateWiki(id, updatedWiki, callback){
        return Wiki.findByPk(id)
        .then((wiki) => {
          if(!wiki){
            return callback("wiki not found");
          }
          wiki.update(updatedWiki, {
            fields: Object.keys(updatedWiki)
          })
          .then(() => {
            callback(null, wiki);
          })
          .catch((err) => {
            callback(err);
          });
        });
      },

      downgradeUserWikis(id, callback) {
        return Wiki.findAll({
            where: { userId: id }
        })
        .then(wikis => {
            wikis.forEach(wiki => {
                wiki.update({ private: false});
            });
        })
        .catch(err => {
            console.log(err);
        });
      },

}