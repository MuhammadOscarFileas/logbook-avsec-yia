import express from "express";
import { 
  createUser, 
  getAllUser, 
  getUserById, 
  updateUser, 
  deleteUser, 
  register, 
  login, 
  countUserByRole
} from "../controllers/user.js";

const router = express.Router();

router.get("/count-role", countUserByRole);
router.post("/register", register);
router.post("/login", login);
router.post("/", createUser);
router.get("/", getAllUser);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router; 