import express from "express";

import {
  getAllContact,
  createContact,
  getContactById,
  deleteContactById,
  updateContactById,
  getContactByUserId,
} from "../Controllers/ContactController.js";
import { isAuthenticated } from "../Middlewares/Auth.js";

const router = express.Router();

router.get("/", getAllContact);
router.post("/new", isAuthenticated, createContact);
router.get("/:id", getContactById);
router.delete("/:id", isAuthenticated, deleteContactById);
router.put("/:id", isAuthenticated, updateContactById);
router.get("/userid/:id", getContactByUserId);

export default router;
