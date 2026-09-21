import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

// inside the mongoose.model function we give 2 arguments first the table name and second will be the structure of that table
const User = mongoose.model("table1", userSchema);
export default User;
