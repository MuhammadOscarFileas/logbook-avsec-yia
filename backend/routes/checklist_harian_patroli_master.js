import express from "express";
import {
  createChecklistHarianPatroliMaster,
  getAllChecklistHarianPatroliMaster,
  getChecklistHarianPatroliMasterById,
  updateChecklistHarianPatroliMaster,
  deleteChecklistHarianPatroliMaster
} from "../controllers/checklist_harian_patroli_master.js";

const router = express.Router();

router.post("/", createChecklistHarianPatroliMaster);
router.get("/", getAllChecklistHarianPatroliMaster);
router.get("/:id", getChecklistHarianPatroliMasterById);
router.put("/:id", updateChecklistHarianPatroliMaster);
router.delete("/:id", deleteChecklistHarianPatroliMaster);

export default router; 