const express = require("express");
const router = express.Router();
const controller = require("../controllers/servicePackageController");
const auth = require('../middleware/authMiddleware');



router.get("/ist", auth,controller.getAll);
router.post("/create", auth,controller.create);
router.get("/:id", auth,controller.getOne);
router.put("/:id", auth,controller.update);
router.delete("/:id",auth, controller.delete);

module.exports = router;