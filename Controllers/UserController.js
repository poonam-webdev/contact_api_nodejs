import User from "../Models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// register logic-controller
export const userControllerRegister = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "All fields are required",
      success: false,
    });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(409).json({
      message: "User already exists",
      success: false,
    });
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const userData = await User.create({ name, email, password: hashPassword });

  return res.status(201).json({
    message: "User registered successfully",
    success: true,
    data: userData,
  });
};

// login logic-controller
export const userControllerLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "All fields are required",
      success: false,
    });
  }

  let userData = await User.findOne({ email });
  if (!userData) {
    return res.status(404).json({
      message: "This email is not registered",
      success: false,
    });
  }
  
  const validPwd = await bcrypt.compare(password, userData.password);
  if (!validPwd) {
    return res.status(401).json({
      message: "Credentials are wrong",
      success: false,
    });
  }

  const secretKey = process.env.Token_secret_key;
  const token = jwt.sign({ userId: userData._id }, secretKey, {
    expiresIn: "1h",
  });

  return res.status(200).json({
    message: `Welcome, ${userData.name} you have logged in`,
    success: true,
    token,
  });
};