const db = require("../config/db");

// Find user by username
exports.findUserByUsername = (username, callback) => {
  db.query("SELECT * FROM Users WHERE Username = ?", [username], callback);
};

// Create user
exports.createUser = (data, callback) => {
  db.query("INSERT INTO Users SET ?", data, callback);
};