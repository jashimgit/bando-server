import bcrypt from "bcrypt";
import models from "../models";
import jwt from "jsonwebtoken";

export const handleUserLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await models.User.findOne({ email: email }).exec();
    if (!user)
      return res
        .status(404)
        .json({ name: "Not Found", message: "User Not found" });
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign(
      { _id: user._id, role: user.role, status: user.status },
      process.env.USER_SECRET
    );
    res.append("token", token);
    res.status(200).json({ message: "login success", name: "OK" });
  } catch (error) {
    return res
      .status(500)
      .json({ name: "Internal Sever Error", message: error.message });
  }
};

export const handleUserSignup = async (req, res) => {
  const body = req.body;

  // createing a new mongoose doc for user data
  const user = new models.User(body);
  try {
    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed password
    user.password = await bcrypt.hash(user.password, salt);
    const savedUser = await user.save();
    res
      .status(201)
      .send({ name: "OK", message: "user created id: " + savedUser._id });
  } catch (err) {
    res.status(501);
    console.log(err);
  }
};
