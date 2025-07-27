const express = require("express");
const router = express.Router();
const Hash = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const User = require("../models/User");
// const auth = require("../middleware/auth");

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  console.log("User registration data:", { email, name, password });
  // res.send("User registered successfully");
  // check if user already exists
  const userExists = await User.findOne({ email: email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });

    //rerouting
  }

  //2 create a new user
  const hashedPassword = await Hash.hash(password, 12);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  // 3. save the user to the database`
  const savedUser = await newUser.save();
  console.log("User saved successfully:", savedUser);
  res
    .status(201)
    .json({ message: "User registered successfully", user: savedUser });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  console.log("User login data:", { email, password });
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  // Find user by email
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const match = await Hash.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_TOKEN_SECRET,
    { expiresIn: "1h" }
  );
  res.json({ token });
});

router.get("/profile", authenticateToken, async (req, res) => {
  res.send("user profile shows");
});

function authenticateToken(req, res, next) {
  const token = req.headers["authorization"];
  console.log("Token received:", token);
  const secret = token && token.split(" ")[1];
  console.log("Secret extracted:", secret);
  jwt.verify(secret, process.env.JWT_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.error("Error verifying token:", err);
      return res.sendStatus(403);
    }
    console.log("User extracted from token:", user);
    req.user = user;
    next();
  });

  //   if (!token) return res.sendStatus(401);

  //   jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, user) => {
  //     if (err) return res.sendStatus(403);
  //     req.user = user;
  //     console.log("User authenticated:", user);
  //     next();
  //   });
}

module.exports = router;

//1. check if the user is a new user ->
// 2 encrpt the password using bcrypt
// 3. create and   save the user to the database
//4 send welcome mail
