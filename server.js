import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "node:dns";
import router from "./Routes/userRoute.js";
import contactRouter from "./Routes/contactRoute.js";
import cors from 'cors';

// Resolve querySrv ECONNREFUSED issue by using public Google DNS:
dns.setServers(["8.8.8.8", "8.8.4.4"]);

// allowing the dotenv configuration via this command:
dotenv.config();
const PORT = process.env.PORT;
const DB_URL = process.env.MONGO_URI;

// creating the express obj to do the apis work by using express methods:
const app = express();

app.use(cors());

// Middleware to read the json data:
app.use(express.json());

// to read the html form data by req.body:
app.use(express.urlencoded({ extended: true }));

// api/user se related all apis ko run krwana via middleware:
app.use("/api/user", router);

// api/contact se related all apis ko run krwana via middleware:
app.use("/api/contact", contactRouter);

// Database connection:
mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("❌ MongoDB connection failed:", error.message);
  });

// Example route
app.get("/", (req, res) => {
  res.send("You are on home page..");
});

// Server listens at:
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
