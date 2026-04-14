const db = require("../config/db");

// Get all cars
exports.getAllCars = (callback) => {
  db.query("SELECT * FROM Car", callback);
};

// Create car
exports.createCar = (data, callback) => {
  const sql = "INSERT INTO Car SET ?";
  db.query(sql, data, callback);
};

// Get single car
exports.getCarById = (id, callback) => {
  db.query("SELECT * FROM Car WHERE CarID = ?", [id], callback);
};

// Update car
exports.updateCar = (id, data, callback) => {
  db.query("UPDATE Car SET ? WHERE CarID = ?", [data, id], callback);
};

// Delete car
exports.deleteCar = (id, callback) => {
  db.query("DELETE FROM Car WHERE CarID = ?", [id], callback);
};