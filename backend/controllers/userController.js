import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils /generateToken.js";
import bcrypt from "bcryptjs";
// @desc Auth user & get token
// @route  POST /aoi.users/login
// @access public

const authUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      is_admin: user.is_admin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid username and password");
  }
});

// @desc  register a new user
// @route  POST /aoi/users/register
// @access public
const registerUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({
    name,
    email,
    password,
  });
  res.send({
    _id: user._id,
    name: user.name,
    email: user.email,
    is_admin: user.is_admin,
    token: generateToken(user._id),
  });
});
// @desc  user profile
// @route  POST /aoi/users/profile
// @access private
// function getUserProfile to get  user profile

const getUserProfile = expressAsyncHandler(async (req, res) => {
  res.send(req.user);
});

// @desc  Update user profile
// @route  POST /aoi/users/profile
// @access private
// function updateUserProfile to update  user profile
const updateUserProfile = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.send({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      is_admin: updatedUser.is_admin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export { authUser, getUserProfile, registerUser, updateUserProfile };
