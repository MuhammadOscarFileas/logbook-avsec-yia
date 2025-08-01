import express from "express";
import {
  createBukuPemeriksaanManual,
  getAllBukuPemeriksaanManual,
  getBukuPemeriksaanManualById,
  updateBukuPemeriksaanManual,
  deleteBukuPemeriksaanManual
} from "../controllers/buku_pemeriksaan_manual.js";

const router = express.Router();

router.post("/", createBukuPemeriksaanManual);
router.get("/", getAllBukuPemeriksaanManual);
router.get("/:id", getBukuPemeriksaanManualById);
router.put("/:id", updateBukuPemeriksaanManual);
router.delete("/:id", deleteBukuPemeriksaanManual);

export default router; 