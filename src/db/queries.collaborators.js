const Wiki = require("./models").Wiki;
const Collaborator = require("./models").Collaborator;
const User = require("./models").User;
const Authorizer = require("../policies/collaborator");

module.exports = {
    addCollaborator(req, callback) {
        if(req.user.username == req.body.collaborator){
            return callback("You already own this wiki - can't add collaborator");
        }
        User.findAll({
            where: {
                username: req.body.collaborator
            }
        })
        .then((users) => {
            if(!users) {
                return callback("User not found");
            }
            Collaborator.findAll({
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
                    callback(null, collaborator);
                })
                .catch((err) => {
                    callback(err);
                });
            });
        });

    },
    removeCollaborator() {

    }


}