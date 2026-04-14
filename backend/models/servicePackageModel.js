const db = require("../config/db");

// Get all
exports.getAll = (callback) => {
  db.query("SELECT * FROM ServicePackage", callback);
};

// Create
exports.create = (data, callback) => {
  db.query("INSERT INTO ServicePackage SET ?", data, callback);
};

// Get by ID
exports.getById = (id, callback) => {
  db.query("SELECT * FROM ServicePackage WHERE PackageID = ?", [id], callback);
};

// Update
exports.update = (id, data, callback) => {
  db.query("UPDATE ServicePackage SET ? WHERE PackageID = ?", [data, id], callback);
};

// Delete
exports.delete = (id, callback) => {
  db.query("DELETE FROM ServicePackage WHERE PackageID = ?", [id], callback);
};