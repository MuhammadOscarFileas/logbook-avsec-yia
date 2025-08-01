import express from "express";
import {
  createChecklistPenyisiran,
  getAllChecklistPenyisiran,
  getChecklistPenyisiranById,
  updateChecklistPenyisiran,
  deleteChecklistPenyisiran
} from "../controllers/checklist_penyisiran.js";

const router = express.Router();

router.post("/", createChecklistPenyisiran);
router.get("/", getAllChecklistPenyisiran);
router.get("/:id", getChecklistPenyisiranById);
router.put("/:id", updateChecklistPenyisiran);
router.delete("/:id", deleteChecklistPenyisiran);

export default router; 