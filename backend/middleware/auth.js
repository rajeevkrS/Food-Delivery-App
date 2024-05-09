import jwt from "jsonwebtoken";

// This middleware will take the token and convert it into userId and using userId- add, remove and get the data from the cart.
const authMiddleware = async (req, res, next) => {
  // Taking token from users using the headers
  const { token } = req.headers;
  if (!token) {
    return res.json({ success: false, message: "Not authorized login again!" });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    // putting decoded token id in the req.body.userId
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error!" });
  }
};

export default authMiddleware;
