const jwt = require("jsonwebtoken");
const { User } = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded.user.id);
      req.user = await User.findById(decoded).select("-password");

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json("Not authorized, token failed" + error);
    }
  }
  if (!token) {
    res.status(401).json("Not authorized, no token");
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json(null, "Not authorized as an admin");
  }
};

module.exports = {
  protect,
  admin,
};
