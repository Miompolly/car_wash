const express = require("express");
const router = express.Router();
const controller = require("../controllers/servicePackageController");
const auth = require('../middleware/authMiddleware');

// Main REST endpoints
router.get("/", controller.getAll);
router.post("/", controller.create);

// Backward-compatible aliases
router.get("/list", controller.getAll);
router.post("/create",  controller.create);

router.get("/:id", controller.getOne);
router.put("/:id",controller.update);
router.delete("/:id", controller.delete);

module.exports = router;