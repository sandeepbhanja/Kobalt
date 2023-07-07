import { asyncHandler } from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// Auth user and get token
// POST/api/users/login
// Public access
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Username and Password do not match");
  }
});

// Register user and get token
// POST/api/users/login
// Public access
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User exists");
  }
  const user = await User.create({
    name: name,
    email: email,
    password,
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("invalid credentials");
  }
});

// Logout user and get token
// POST/api/users/logout
// Public access
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", " ", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out" });
});

// Get user profile and get token
// GET/api/users/profile
// Private access
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});

//Update user profile
// PUT/api/users/profile
//Private access
const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updateUser = await user.save();
    res.status(200).json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin,
    });
  }else{
    res.status(404);
    throw new Error('Not Found');
  }
});

//Get users
// GET/api/users
// private/admin
const getUsers = asyncHandler(async (req, res) => {
  res.send("get users");
});

//Delete Users
// DELETE api/users/:id
//private/admin
const deleteUser = asyncHandler(async (req, res) => {
  res.send("delete user");
});

//get user by id
// GET /api/users/:id
//private/admin
const getUserById = asyncHandler(async (req, res) => {
  res.send("get user by id");
});

//Update users by id
// GET/api/users/:id
// private/admin
const updateUsers = asyncHandler(async (req, res) => {
  res.send("update users");
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateProfile,
  getUsers,
  getUserById,
  updateUsers,
  deleteUser,
};
