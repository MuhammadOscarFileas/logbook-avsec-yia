import express from "express";
import {
  createSuspiciousUraian,
  getAllSuspiciousUraian,
  getSuspiciousUraianById,
  updateSuspiciousUraian,
  deleteSuspiciousUraian
} from "../controllers/suspicious_uraian.js";

const router = express.Router();

router.post("/", createSuspiciousUraian);
router.get("/", getAllSuspiciousUraian);
router.get("/:id", getSuspiciousUraianById);
router.put("/:id", updateSuspiciousUraian);
router.delete("/:id", deleteSuspiciousUraian);

export default router; 