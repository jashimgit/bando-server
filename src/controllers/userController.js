import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendResponse } from "../helpersFunctions";
import models from "../models";

const { Auth } = models;

// get user by id
export const getUserById = async (req, res) => {
 
  try {
    const user = await Auth.findOne({ _id: req.params.id })
      .select("-password")
      .exec();
    if (!user) {
      return sendResponse(res, 404, {
        name: "Not Found",
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(200).json({ success: false, error });
  }
};

