import express from "express";
import {
  createLogbookHarianMaster,
  getAllLogbookHarianMaster,
  getLogbookHarianMasterById,
  updateLogbookHarianMaster,
  deleteLogbookHarianMaster,
  getAllLogbookByLokasi,
  getAllLogbookLokasiList,
  getLogbookHarianMasterByIdWithDetails,
  getSubmittedAndCompletedLogbookHarianMaster
} from "../controllers/logbook_harian_master.js";
// Get all logbook with status Submitted or Completed
// Get logbook by id beserta uraian tugas & inventaris

const router = express.Router();

router.get("/submitted-completed", getSubmittedAndCompletedLogbookHarianMaster);
router.get("/detail/:id", getLogbookHarianMasterByIdWithDetails);
// List all possible lokasi
router.get("/lokasi-list", getAllLogbookLokasiList);
// Get all logbook by lokasi (dynamic)
router.get("/harian/:lokasi", getAllLogbookByLokasi);
router.post("/", createLogbookHarianMaster);
router.get("/", getAllLogbookHarianMaster);
router.get("/:id", getLogbookHarianMasterById);
router.put("/:id", updateLogbookHarianMaster);
router.delete("/:id", deleteLogbookHarianMaster);

export default router; 