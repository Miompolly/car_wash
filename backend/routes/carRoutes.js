const express = require("express");
const router = express.Router();
const carController = require("../controllers/carController");
const auth = require("../middleware/authMiddleware");

router.post("/", auth, carController.createCar);


router.put("/:id", carController.updateCar);


router.delete("/:id", auth, carController.deleteCar);


router.get("/list",auth, carController.getCars);


router.get("/:id", auth, carController.getCar);

module.exports = router;




