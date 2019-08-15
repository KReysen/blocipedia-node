require("dotenv").config();
const Wiki = require("../db/models").Wiki;
const collaboratorQueries = require ("../db/queries.collaborators.js");
const wikiQueries = require ("../db/queries.wikis.js");
const Authorizer = require ("../policies/collaborator.js");

module.exports = {
    add(req, res, next) {
           if(req.user) {
             collaboratorQueries.addCollaborator(req, (err, collaborator) => {
                if(err){
                    req.flash("notice", "Failed to add collaborator");
                    console.log(err)
                } 
            });
        } 
        res.redirect(req.headers.referer);

    },

    remove(req, res, next){
        if(req.user) {
            collaboratorQueries.removeCollaborator(req, (err, collaborator) => {
                if(err) {
                    req.flash("error", err);
                }
                res.redirect(req.headers.referer);
            });
        } else {
            req.flash("notice", "You are not authorized to do that");
            res.redirect(req.headers.referer);
        }
    },

    editPage(req, res, next){
       
        collaboratorQueries.getCollaborators(
        req.params.wikiId,
        (err, result) => {
            if(err) {
                req.flash("error", err);
                res.redirect(404, "/");
            } else {
                
                res.render("collaborators/editCollabs", { ...result });
            }
        }
        );
    },

}