require("dotenv").config();
const Wiki = require("../db/models").Wiki;
const collaboratorQueries = require ("../db/queries.collaborators.js");
const wikiQueries = require ("../db/queries.wikis.js");
const Authorizer = require ("../policies/collaborator.js");

module.exports = {
    add(req, res, next) {
        const authorized = new Authorizer(req.user).new();
        if(authorized){
            collaboratorQueries.addCollaborator(req, (err, collaborator) => {
                if(err){
                    req.flash("notice", "Failed to add collaborator");
                    console.log(err)
                }
            });
        } else {
            req.flash("notice", "You are not authorized to do that");
        }
        res.redirect(req.headers.referer);
    },

    remove(req, res, next){

    }
}