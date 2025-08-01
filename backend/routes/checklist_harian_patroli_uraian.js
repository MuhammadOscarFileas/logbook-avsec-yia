import express from "express";
import {
  createChecklistHarianPatroliUraian,
  getAllChecklistHarianPatroliUraian,
  getChecklistHarianPatroliUraianById,
  updateChecklistHarianPatroliUraian,
  deleteChecklistHarianPatroliUraian
} from "../controllers/checklist_harian_patroli_uraian.js";

const router = express.Router();

router.post("/", createChecklistHarianPatroliUraian);
router.get("/", getAllChecklistHarianPatroliUraian);
router.get("/:id", getChecklistHarianPatroliUraianById);
router.put("/:id", updateChecklistHarianPatroliUraian);
router.delete("/:id", deleteChecklistHarianPatroliUraian);

export default router; 