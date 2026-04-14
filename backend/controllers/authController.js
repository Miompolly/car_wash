const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User=require('../models/userModels')

const SECRET = "mysecretkey"; // later move to .env

// REGISTER
exports.register = async (req, res) => {
  const { Username, Password, Role } = req.body;

  User.findUserByUsername(Username, async (err, result) => {
    if (result.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(Password, 10);

    const newUser = {
      Username,
      Password: hashedPassword,
      Role
    };

    User.createUser(newUser, (err, data) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "User registered successfully" });
    });
  });
};

// LOGIN
exports.login = (req, res) => {
  const { Username, Password } = req.body;

  User.findUserByUsername(Username, async (err, result) => {
    if (result.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = result[0];

    const isMatch = await bcrypt.compare(Password, user.Password);
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