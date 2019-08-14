const express = require("express");
const router = express.Router();
const collaboratorController = require("../controllers/collaboratorController");

router.get("/wikis/:wikiId/editCollabs", collaboratorController.editPage);

router.post("/wikis/:wikiId/editCollabs/add", collaboratorController.add);
router.post("/wikis/:wikiId/editCollabs/remove", collaboratorController.remove);
module.exports = router;