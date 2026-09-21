import ContactModel from "../Models/Contact.js";

// getting all contact:
export const getAllContact = async (req, res) => {
  // getting all data which is stored in contact table/collection via 'find':
  const getData = await ContactModel.find();
  if (getData.length == 0) {
    return res.status(400).json({
      message: "No data found",
    });
  }
  return res.json({
    message: "Getted data successfully",
    success: true,
    data: getData,
  });
};

// creating a contact:
export const createContact = async (req, res) => {
  const { name, email, phone, type } = req.body;
  if (name == "" || email == "" || phone == "" || type == "") {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  // checking if that details of contact already exist or not:
  let contactData = await ContactModel.findOne({ phone, email });
  if (contactData) {
    return res.json({ message: "Contact detail already exist...!" });
  }
  // and if not then we will perform the creating operation:
  contactData = await ContactModel.create({
    name,
    email,
    phone,
    type,
    user: req.user,
  });
  return res.status(201).json({
    message: "New contact details added",
    success: true,
    data: contactData,
  });
};

// getting the contact details of the specific contact on the basis of ID:
export const getContactById = async (req, res) => {
  // to get the param info we use "req.params.id":
  const cid = req.params.id;
  // it will find the id data by 'findById' method in mongoose:
  const data = await ContactModel.findById(cid);
  if (!data) {
    return res.status(201).json({
      message: "No such contact exist",
    });
  } else if (data) {
    return res.status(201).json({
      message: "New contact details added",
      success: true,
      contactDetail: data,
    });
  }
};

// delete the contact detail of the specific contact on the basis of ID:
export const deleteContactById = async (req, res) => {
  // to get the param info we use "req.params.id":
  const cid = req.params.id;

  try {
    // it will find the id data and then delete it by passing only the id inside the params of 'findByIdAndDelete' method in mongoose:
    const user = await ContactModel.findByIdAndDelete(cid);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "Deleted successfully", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// update the contact detail of the specific contact on the basis of contact ID:
export const updateContactById = async (req, res) => {
  const cid = req.params.id;
  const data = req.body;
  try {
    // it will find the id data and then update it by passing only the id and detail object which needs to update inside the params of 'findByIdAndUpdate' method in mongoose:
    const user = await ContactModel.findByIdAndUpdate(cid, data, { returnDocument: 'after' });
    if (!user) {
      return res.status(404).json({
        message: "Contact data not found.",
      });
    }
    res.status(201).json({
      message: "Successfully updated",
      success: true,
      data: data,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// get the contact detail which is stored by a specific user via user ID:
export const getContactByUserId = async (req, res) => {
  const cid = req.params.id;
  try {
    // it will find the id data of a user and then finding the contact details of a user which stored by that user via 'find' method in mongoose:
    const user = await ContactModel.find({ user: cid });
    if (!user) {
      return res.status(404).json({
        message: "Contact data not found.",
      });
    }
    res.status(201).json({
      message:
        "Successfully getting contact details for specific stored by user",
      success: true,
      data: user,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};