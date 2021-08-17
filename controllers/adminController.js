import models from "../models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendResponse } from "../helpersFunctions";

const { Admin } = models;

// handle add admin
export const handleMakeAdmin = async (req, res) => {
  //check this email is already have an admin account or not
  const adminExist = await Admin.findOne({ email: req.body.email });
  if (adminExist) {
    return sendResponse(res, 400, {
      name: "Bad Request",
      success: false,
      message: "admin already exist is this email: " + req.body.email,
    });
  }

  // creating a new mongoose doc for user data
  const newAdmin = new Admin(req.body);

  try {
    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);

    // set admin password to hash password
    newAdmin.password = await bcrypt.hash(newAdmin.password, salt);
    //saved admin
    const savedAdmin = await newAdmin.save();

    if (!savedAdmin) {
      return sendResponse(res, 400, {
        name: "Faild",
        success: false,
        message: "user created faild",
      });
    }

    // send success message
    return sendResponse(res, 201, {
      name: "Created",
      success: true,
      message: "admin created id: " + savedAdmin._id,
    });
  } catch (err) {
    return sendResponse(res, 501, {
      name: "Internal Server Error",
      success: false,
      message: err.message,
    });
  }

  return res.send({ admin: newAdmin });
};

// user login handle
export const handleAdminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email: email }).select("-__v");

    /// return if not found document
    if (!admin) {
      return sendResponse(res, 404, {
        name: "Not Found",
        message: "Admin Not found",
        success: false,
      });
    }

    //compare password
    const validPassword = await bcrypt.compare(password, admin.password);

    // return if password not match
    if (!validPassword)
      return sendResponse(res, 400, {
        name: "Forbidden",
        message: "Wrong password",
        success: false,
      });

    // create jwt token
    const token = jwt.sign(
      { _id: admin._id, email: admin.email },
      process.env.ADMIN_SECRET
    );

    // success return
    return sendResponse(res, 200, {
      name: "OK",
      message: "Login successfully",
      success: true,
      token: token,
      admin: {
        name: admin.name,
        createdAt: admin.createdAt,
        _id: admin._id,
        email: admin.email,
      },
    });
  } catch (error) {
    return res.status(500).send({
      name: "Internal Sever Error",
      message: error.message,
      success: false,
    });
  }
};
