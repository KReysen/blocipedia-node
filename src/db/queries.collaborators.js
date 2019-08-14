const Wiki = require("./models").Wiki;
const Collaborator = require("./models").Collaborator;
const User = require("./models").User;
const Authorizer = require("../policies/collaborator");

module.exports = {
    addCollaborator(req, callback) {
        if(req.user.username == req.body.collaborator){
            return callback("You already own this wiki - can't add collaborator");
        }
        User.findOne({
            where: {
                username: req.body.collaborator
            }
        })
        .then((user) => {
            if(!user) {
                return callback("User not found");
            }
            Collaborator.findOne({
                where: {
                    userId: user.id,
                    wikiId: req.params.wikiId,
                }
            })
            .then((collaborator) => {
                if(collaborator) {
                    return callback("This user is already a collaborator");
                }
                let newCollaborator = {
                    userId: user.id,
                    wikiId: req.params.wikiId
                };
                return Collaborator.create(newCollaborator)
                
                .then((collaborator) => {
                    console.log(collaborator.username);
                    callback(null, collaborator);
                })
                .catch((err) => {
                    callback(err);
                });
            });
        });

    },
    removeCollaborator(req, callback) {
        let userId = req.body.collaborator;
        let wikiId = req.params.wikiId;
        Collaborator.destroy({
            where: {
                userId: userId,
                wikiId: wikiId
            }
        })
        .then(deletedRecordsCount => {
            callback(null, deletedRecordsCount);
        })
        .catch((err) => {
            callback(err);
        });

    },

    getCollaborators(id, callback) {
      let result = {};
      Wiki.findOne({
          where: { id: id}
      })
      .then(wiki => {
          if(!wiki) {
              callback(404);
          } else {
              result["wiki"] = wiki;
              Collaborator.scope({ method: ["isCollaboratorFor", wiki.id] })
              .findAll()
              .then(collaborators => {
                  result ["collaborators"] = collaborators;
                  callback(null, result);
              })
              .catch((err) => {
                  callback(err);
              });
          }
      });
    }


};