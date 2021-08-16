import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendResponse } from "../helpersFunctions";
import models from "../models";

const { User } = models;

// user login handle
export const handleUserLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email }).select("-__v");

    if (!user) {
      return res
        .status(404)
        .send({ name: "Not Found", message: "User Not found", success: false });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return sendResponse(res, 403, {
        name: "Forbidden",
        message: "Wrong password",
        success: false,
      });

    const token = jwt.sign(
      { _id: user._id, role: user.role, status: user.status },
      process.env.USER_SECRET
    );

    const {
      name,
      photoUrl,
      role,
      phone,
      email: newEmail,
      _id,
      createdAt,
      status,
    } = user;
    const newUser = {
      name,
      photoUrl,
      role,
      phone,
      email: newEmail,
      _id,
      createdAt,
      status,
    };
    // res.append("token", token);
    res.status(200).json({
      message: "login success",
      name: "OK",
      success: true,
      token: token,
      user: newUser,
    });
  } catch (error) {
    return res.status(500).send({
      name: "Internal Sever Error",
      message: error.message,
      success: false,
    });
  }
};

// user signup handle
export const handleUserSignup = async (req, res) => {
  const body = req.body;

  //check this email is already have an account or not
  const userExist = await User.findOne({ email: body.email });
  if (userExist) {
    return sendResponse(res, 400, {
      name: "Bad Request",
      success: false,
      message: "user already exist is this email: " + body.email,
    });
  }

  // createing a new mongoose doc for user data
  const user = new User(body);
  try {
    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed password
    user.password = await bcrypt.hash(user.password, salt);
    const savedUser = await user.save();
    return sendResponse(res, 201, {
      name: "OK",
      success: true,
      message: "user created id: " + savedUser._id,
    });
  } catch (err) {
    return sendResponse(res, 501, {
      name: "Internal Server Error",
      success: false,
      message: err.message,
    });
  }
};

// get all users

export const getAllUsers = async (req, res) => {
  const users = await User.find({}).select("-password").exec();

  try {
    if (users) {
      res.status(200).send({ success: true, users: users });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// get user by id

export const getUserById = async (req, res) => {
  const id = req.params.id;

  const singleUser = await User.find({ _id: id }).select("-password").exec();
    try {
      if (singleUser) {
        res.status(200).send({ success: true, user: singleUser });
      }
    } catch (error) {
      res.status(500).json(error);
    }
/*
  try {
    User.findById({ _id: id }, (err, doc) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send(doc);
      }
    });
  } catch (error) {
    console.log("error catch block", error);
  }
*/
 
};

// Get all user where role
export const findByUserRole = async (req, res) => {
  const role = req.params.role;
    await User.find({ role: role }, (err, data) => {
        if (err) {
          res.status(500).json({
            error: "some eror",
          });
        } else {
          res.status(200).json({
            results: data,
            success: true
          });
        }
    }).select('-password').exec()
};
