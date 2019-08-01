const express = require("express");
const router = express.Router();
const validation = require("./validation");
const userController = require("../controllers/userController");
const User = require("../../src/db/models").User;



router.get("/users/sign_up", userController.signUp);
router.post("/users", validation.validateUsers, userController.create);

router.get("/users/sign_in", userController.signInForm);
router.post("/users/sign_in", validation.validateSignIn, userController.signIn);
router.get("/users/sign_out", userController.signOut);

router.get("/users/:id", userController.show);

router.get("/users/:id/upgrade_page", userController.upgradePage);
router.get("/users/:id/downgrade_page", userController.downgradePage);

module.exports = router;