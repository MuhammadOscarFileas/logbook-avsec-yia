import express from "express";
import {
  createLaporanTerminalKargoMaster,
  getAllLaporanTerminalKargoMaster,
  getLaporanTerminalKargoMasterById,
  updateLaporanTerminalKargoMaster,
  deleteLaporanTerminalKargoMaster
} from "../controllers/laporan_terminal_kargo_master.js";

const router = express.Router();

router.post("/", createLaporanTerminalKargoMaster);
router.get("/", getAllLaporanTerminalKargoMaster);
router.get("/:id", getLaporanTerminalKargoMasterById);
router.put("/:id", updateLaporanTerminalKargoMaster);
router.delete("/:id", deleteLaporanTerminalKargoMaster);

export default router; 