//check is seller
export const isSeller = (req) => {
  if (req.user.role === "seller") {
    return true;
  }
  return false;
};

//check user is admin and return true or false
export const isAdmin = (req) => {
  if (req.user.role === "admin") {
    return true;
  }
  return false;
};

// send response

export const sendResponse = (res, statusCode, sendObj) => {
  return res.status(statusCode).send(sendObj);
};
