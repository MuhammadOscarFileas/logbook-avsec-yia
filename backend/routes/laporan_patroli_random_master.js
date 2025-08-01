import express from "express";
import {
  createLaporanPatroliRandomMaster,
  getAllLaporanPatroliRandomMaster,
  getLaporanPatroliRandomMasterById,
  updateLaporanPatroliRandomMaster,
  deleteLaporanPatroliRandomMaster
} from "../controllers/laporan_patroli_random_master.js";

const router = express.Router();

router.post("/", createLaporanPatroliRandomMaster);
router.get("/", getAllLaporanPatroliRandomMaster);
router.get("/:id", getLaporanPatroliRandomMasterById);
router.put("/:id", updateLaporanPatroliRandomMaster);
router.delete("/:id", deleteLaporanPatroliRandomMaster);

export default router; 