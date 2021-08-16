//check is seller
export const isSeller = (req) => {
  if (req.user.role !== "seller") {
    return false;
  }
  return true;
};

// send response

export const sendResponse = (res, statusCode, sendObj) => {
  return res.status(statusCode).send(sendObj);
};
