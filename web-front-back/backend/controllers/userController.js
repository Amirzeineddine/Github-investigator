const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");

// @desc    Register new user
// @route   POST /api/users
// @access  Public

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  // Check if User Exits

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user

  const user = await User.create({
    username,
    email,
    // image,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      //   image: user.image,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }

  res.json({ message: "Register User" });
});

// @desc    Authenticate a user
// @route   POST /api/users
// @access  Public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if User Exits

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      _id: user.id,

      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// @desc    Get user data
// @route   Get /api/users/me
// @access  Private

const getUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

// @desc    Get all user
// @route   Get /api/users/all
// @access  Private

const getallUser = asyncHandler(async (req, res) => {
  const user = await User.find();

  let users = user.map(
    (user) =>
      new Object({
        _id: user._id,
        username: user.username,
        Gamewon: user.Gamewon,
        GamePlay: user.GamePlay,
      })
  );

  res.status(200).json(users);
});

// Generate JWT

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
  getallUser
 
};
