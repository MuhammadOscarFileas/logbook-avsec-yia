import express from "express";
import {
  createUraianTugas,
  getAllUraianTugas,
  getUraianTugasById,
  updateUraianTugas,
  deleteUraianTugas
} from "../controllers/uraian_tugas.js";

const router = express.Router();

router.post("/", createUraianTugas);
router.get("/", getAllUraianTugas);
router.get("/:id", getUraianTugasById);
router.put("/:id", updateUraianTugas);
router.delete("/:id", deleteUraianTugas);

export default router; 