import jwt from "jsonwebtoken";

const verifyAdminToken = (req, res, next) => {
  const token = req.headers.token;
  if (!token)
    return res
      .status(401)
      .send({ name: "Access Denied", message: "access denied", success: false });

  try {
    const admin = jwt.verify(token, process.env.ADMIN_SECRET);
    req.admin = admin;
    next();
  } catch (err) {
    return res
      .status(401)
      .send({ name: "Access Denied", message: err.message, success: false });
  }
};

export default verifyAdminToken;
