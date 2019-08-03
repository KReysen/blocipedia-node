require("dotenv").config();
const userQueries = require("../db/queries.users.js");
const passport = require("passport");
const express = require('express');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const publishableKey = process.env.PUBLISHABLE_KEY;


module.exports = {
    signUp(req, res, next){
        res.render("users/sign_up");
    },

    create(req, res, next){
      let newUser = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        passwordConfirmation: req.body.passwordConfirmation
      };

      userQueries.createUser(newUser, (err, user) => {
        if(err){
          req.flash("error", err);
          res.redirect("/users/sign_up");
        } else {
          passport.authenticate("local")(req, res, () => {
            req.flash("notice", "You've successfully signed in!");
            res.redirect("/");
          })
        }
      });
    },
           
    signInForm(req, res, next){
      
        res.render("users/sign_in");
    },

    signIn(req, res, next){
      
      passport.authenticate("local")(req, res, function(){
        if(!req.user){
          req.flash("notice", "Sign in failed. Please try again.")
          res.redirect("/users/sign_in");
        } else {
          req.flash("notice", "You've successfully signed in!");
          res.redirect("/");
        }
      })
      },

      signOut(req, res, next){
        req.logout();
        req.flash("notice", "You've successfully signed out!");
        res.redirect("/");
      },

      show(req, res, next){
         if(req.user && req.user.id == req.params.id){
         userQueries.getUser(req.params.id, (err, result) => {
     
           if(err || result.user === undefined){
             req.flash("notice", "No user found with that ID.");
             res.redirect("/");
           } else {
             res.render("users/show", {...result});
           }
         });
       } else {
         res.redirect(403, "/");
       }
      },

       upgrade(req, res, next){

         const payment = 1500;
        stripe.customers
         .create({
           email: req.body.stripeEmail,
           source: req.body.stripeToken
         })
         .then(customer => {
           return stripe.charges.create({
             amount: payment,
             description: "Blocipedia premium account upgrade",
             currency: "usd",
             customer: customer.id
           });
         })
         .then(charge => {
           if (charge) {
             userQueries.upgradeUser(req.params.id, (err, result) => {
               req.flash("notice", "You have upgraded to premium user status");
               res.redirect("/");
             });
           } else {
             req.flash("notice", "Error, upgrade unsuccessful");
             res.redirect("/users/" + req.user.id);
           }
         })
         .catch((err) => {
           console.log(err);
         });
      
       },

       downgrade(req, res, next){
         userQueries.downgradeUser(req.params.id);
          {
            req.flash("notice", "You are now a standard user");
            res.redirect("/");
          }
       },
}
