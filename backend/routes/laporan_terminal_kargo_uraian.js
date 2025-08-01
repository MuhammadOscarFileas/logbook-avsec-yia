import express from "express";
import {
  createLaporanTerminalKargoUraian,
  getAllLaporanTerminalKargoUraian,
  getLaporanTerminalKargoUraianById,
  updateLaporanTerminalKargoUraian,
  deleteLaporanTerminalKargoUraian
} from "../controllers/laporan_terminal_kargo_uraian.js";

const router = express.Router();

router.post("/", createLaporanTerminalKargoUraian);
router.get("/", getAllLaporanTerminalKargoUraian);
router.get("/:id", getLaporanTerminalKargoUraianById);
router.put("/:id", updateLaporanTerminalKargoUraian);
router.delete("/:id", deleteLaporanTerminalKargoUraian);

export default router; 