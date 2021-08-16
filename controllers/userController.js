import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import models from "../models";

const { User } = models;

// user login handle
export const handleUserLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email }).exec();
    if (!user)
      return res
        .status(404)
        .send({ name: "Not Found", message: "User Not found", success: false });
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign(
      { _id: user._id, role: user.role, status: user.status },
      process.env.USER_SECRET
    );
    // res.append("token", token);
    res
      .status(200)
      .json({ message: "login success", name: "OK", success: true, token: token, role: user.role, status: user.status });
  } catch (error) {
    return res
      .status(500)
      .send({
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
    return res.status(400).send({
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
    res.status(201).send({
      name: "OK",
      success: true,
      message: "user created id: " + savedUser._id,
    });
  } catch (err) {
    res.status(501);
    console.log(err);
  }
};
