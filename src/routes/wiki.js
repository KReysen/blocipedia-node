const express = require("express");
const router = express.Router();
const helper = require("../auth/helpers");
const validation = require("./validation");
const wikiController = require("../controllers/wikiController");

router.get("/wikis", wikiController.index);
router.get("/wikis/new", helper.ensureAuthenticated, wikiController.new);
router.get("/wikis/:id", wikiController.show);

router.post("/wikis/create", helper.ensureAuthenticated, validation.validateWikis, wikiController.create);
router.post("/wikis/:id/destroy", helper.ensureAuthenticated, wikiController.destroy);
router.post("/wikis/:id/update", helper.ensureAuthenticated, validation.validateWikis, wikiController.update);
router.get("/wikis/:id/edit", helper.ensureAuthenticated, wikiController.edit);

module.exports = router;