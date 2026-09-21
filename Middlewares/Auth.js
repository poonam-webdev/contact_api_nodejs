import jwt from "jsonwebtoken";
import User from "../Models/User.js";
import dotenv from "dotenv";
export const isAuthenticated = async (req, res, next) => {
  const token = req.header("auth");

  if (!token) {
    return res.status(401).json({
      message: "Please login",
    });
  }

  try {
    dotenv.config();
    const secretKey = process.env.Token_secret_key;
    const decoded = jwt.verify(token, secretKey);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({
        message: "User does not exist, please register yourself",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};
