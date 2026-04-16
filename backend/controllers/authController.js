const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User=require('../models/userModels')

const SECRET = "mysecretkey"; // later move to .env

// REGISTER
exports.register = async (req, res) => {
  const username = req.body.Username || req.body.username;
  const password = req.body.Password || req.body.password;
  const role = req.body.Role || req.body.role || "staff";

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  User.findUserByUsername(username, async (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      Username: username,
      Password: hashedPassword,
      Role: role
    };

    User.createUser(newUser, (err, data) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "User registered successfully" });
    });
  });
};

// LOGIN
exports.login = (req, res) => {
  const username = req.body.Username || req.body.username;
  const password = req.body.Password || req.body.password;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  User.findUserByUsername(username, async (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = result[0];

    const isMatch = await bcrypt.compare(password, user.Password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user.UserID, username: user.Username, role: user.Role },
      SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.UserID,
        username: user.Username,
        role: user.Role
      }
    });
  });
};