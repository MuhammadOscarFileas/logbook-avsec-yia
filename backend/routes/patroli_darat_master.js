import express from "express";
import {
  createPatroliDaratMaster,
  getAllPatroliDaratMaster,
  getPatroliDaratMasterById,
  updatePatroliDaratMaster,
  deletePatroliDaratMaster
} from "../controllers/patroli_darat_master.js";

const router = express.Router();

router.post("/", createPatroliDaratMaster);
router.get("/", getAllPatroliDaratMaster);
router.get("/:id", getPatroliDaratMasterById);
router.put("/:id", updatePatroliDaratMaster);
router.delete("/:id", deletePatroliDaratMaster);

export default router; 