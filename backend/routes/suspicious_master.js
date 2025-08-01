import express from "express";
import {
  createSuspiciousMaster,
  getAllSuspiciousMaster,
  getSuspiciousMasterById,
  updateSuspiciousMaster,
  deleteSuspiciousMaster
} from "../controllers/suspicious_master.js";

const router = express.Router();

router.post("/", createSuspiciousMaster);
router.get("/", getAllSuspiciousMaster);
router.get("/:id", getSuspiciousMasterById);
router.put("/:id", updateSuspiciousMaster);
router.delete("/:id", deleteSuspiciousMaster);

export default router; 