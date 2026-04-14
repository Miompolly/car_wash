const Car = require("../models/carModel");

// Get all cars
exports.getCars = (req, res) => {
  Car.getAllCars((err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

// Create car
exports.createCar = (req, res) => {
  Car.createCar(req.body, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Car created", id: result.insertId });
  });
};

// Get one car
exports.getCar = (req, res) => {
  Car.getCarById(req.params.id, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result[0]);
  });
};

// Update car
exports.updateCar = (req, res) => {
  Car.updateCar(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Car updated" });
  });
};

// Delete car
exports.deleteCar = (req, res) => {
  Car.deleteCar(req.params.id, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Car deleted" });
  });
};