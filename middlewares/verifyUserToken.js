import jwt from "jsonwebtoken";

const verifyUserToken = (req, res, next) => {
  const token = req.headers.token;
  if (!token)
    return res
      .status(401)
      .send({ name: "Access Denied", message: "access denied" });

  const user = jwt.verify(token, process.env.USER_SECRET);
  req.user = user;
  next();
};

export default verifyUserToken;
