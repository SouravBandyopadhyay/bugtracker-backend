import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import Admin from "../models/adminModel.js";
const protect = asyncHandler(async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    try {
      token = authHeader.split(" ")[1];

      const decoded = jwt.verify(token, "sdfgsdfgaskdjfli43345345ghfd");

      req.admin = await Admin.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized as Admin, invalid token");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized as Admin, no token found");
  }
});

export { protect };
