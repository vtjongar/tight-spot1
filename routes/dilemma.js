const express = require("express");
const router = express.Router();
const dilemmaController = require("../controllers/dilemma");

router.post("/", dilemmaController.requireAuth, dilemmaController.create);
router.get("/new", dilemmaController.requireAuth, dilemmaController.new);
router.get("/:id", dilemmaController.show);
router.put("/:id", dilemmaController.requireAuth, dilemmaController.update);
router.delete("/:id", dilemmaController.requireAuth, dilemmaController.delete)


// router.post("/", dilemmaController.create);
// router.get("/new", dilemmaController.new);
// router.get("/:id", dilemmaController.show);
// router.put("/:id", dilemmaController.update);
// router.delete("/:id", dilemmaController.delete);

module.exports = router;