import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: {
      type: String,
      match: [/^[0-9]{10}$/, "Please add 10 digit number."],
    },
    type: { type: String, required: true },
    // here where we are trying to do the foreign key work it will join to the user model:
    user: { type: mongoose.Schema.Types.ObjectId},
  },
  { timestamps: true },
);

const ContactModel = mongoose.model("ContactTable", contactSchema);
export default ContactModel;

// in future we will try to do below thing:
// User: { type: mongoose.Schema.Types.ObjectId , ref: "User", required: true }