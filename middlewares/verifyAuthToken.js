import jwt from "jsonwebtoken";

const verifyAuthToken = (req, res, next) => {
  const token = req.headers.token;
  const {authorization} = req.headers;

  if (!token)
    return res.status(401).send({
      name: "Access Denied",
      message: "access denied",
      success: false,
    });

  // if(!authorization){
  //   return res.status(401).send({
  //     name: "Access Denied",
  //     message: "access denied",
  //     success: false,
  //   });
  // }

  // try {
  //   const token = authorization.split(' ')[1]
  //   const user = jwt.verify(token, process.env.AUTH_SECRET);
  //   req.user = user;
  //   next();
  // } catch (err) {
  //   return res
  //     .status(401)
  //     .send({ name: "Access Denied", message: err.message, success: false });
  // }



  try {
    const user = jwt.verify(token, process.env.AUTH_SECRET);
    req.user = user;
    next();
  } catch (err) {
    return res
      .status(401)
      .send({ name: "Access Denied", message: err.message, success: false });
  }

};

export default verifyAuthToken;
