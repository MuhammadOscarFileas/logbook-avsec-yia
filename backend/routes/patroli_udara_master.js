import express from "express";
import {
  createPatroliUdaraMaster,
  getAllPatroliUdaraMaster,
  getPatroliUdaraMasterById,
  updatePatroliUdaraMaster,
  deletePatroliUdaraMaster
} from "../controllers/patroli_udara_master.js";

const router = express.Router();

router.post("/", createPatroliUdaraMaster);
router.get("/", getAllPatroliUdaraMaster);
router.get("/:id", getPatroliUdaraMasterById);
router.put("/:id", updatePatroliUdaraMaster);
router.delete("/:id", deletePatroliUdaraMaster);

export default router; 