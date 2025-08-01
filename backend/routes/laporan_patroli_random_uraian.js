import express from "express";
import {
  createLaporanPatroliRandomUraian,
  getAllLaporanPatroliRandomUraian,
  getLaporanPatroliRandomUraianById,
  updateLaporanPatroliRandomUraian,
  deleteLaporanPatroliRandomUraian
} from "../controllers/laporan_patroli_random_uraian.js";

const router = express.Router();

router.post("/", createLaporanPatroliRandomUraian);
router.get("/", getAllLaporanPatroliRandomUraian);
router.get("/:id", getLaporanPatroliRandomUraianById);
router.put("/:id", updateLaporanPatroliRandomUraian);
router.delete("/:id", deleteLaporanPatroliRandomUraian);

export default router; 