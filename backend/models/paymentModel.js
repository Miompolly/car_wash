const db = require("../config/db");

// Get all with JOIN
exports.getAll = (callback) => {
  const sql = `
    SELECT p.*, c.PlateNumber
    FROM Payment p
    JOIN ServiceRecord s ON p.ServiceID = s.ServiceID
    JOIN Car c ON s.CarID = c.CarID
  `;
  db.query(sql, callback);
};

// Create
exports.create = (data, callback) => {
  db.query("INSERT INTO Payment SET ?", data, callback);
};

// Get by ID
exports.getById = (id, callback) => {
  db.query("SELECT * FROM Payment WHERE PaymentID = ?", [id], callback);
};

// Update
exports.update = (id, data, callback) => {
  db.query("UPDATE Payment SET ? WHERE PaymentID = ?", [data, id], callback);
};

// Delete
exports.delete = (id, callback) => {
  db.query("DELETE FROM Payment WHERE PaymentID = ?", [id], callback);
};