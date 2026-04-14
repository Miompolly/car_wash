const db = require("../config/db");

// Get all with JOIN
exports.getAll = (callback) => {
  const sql = `
    SELECT s.*, c.PlateNumber, p.PackageName
    FROM ServiceRecord s
    JOIN Car c ON s.CarID = c.CarID
    JOIN ServicePackage p ON s.PackageID = p.PackageID
  `;
  db.query(sql, callback);
};

// Create
exports.create = (data, callback) => {
  db.query("INSERT INTO ServiceRecord SET ?", data, callback);
};

// Get by ID
exports.getById = (id, callback) => {
  db.query("SELECT * FROM ServiceRecord WHERE ServiceID = ?", [id], callback);
};

// Update
exports.update = (id, data, callback) => {
  db.query("UPDATE ServiceRecord SET ? WHERE ServiceID = ?", [data, id], callback);
};

// Delete
exports.delete = (id, callback) => {
  db.query("DELETE FROM ServiceRecord WHERE ServiceID = ?", [id], callback);
};