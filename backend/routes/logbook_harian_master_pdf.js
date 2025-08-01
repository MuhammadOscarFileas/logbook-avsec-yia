import express from "express";
import { exportLogbookHarianMasterPDF } from "../controllers/logbook_harian_master_pdf.js";
const router = express.Router();

// GET /api/logbook-harian-master/export-pdf?start=YYYY-MM-DD&end=YYYY-MM-DD
// GET /api/logbook-harian-master/export-pdf?id=123
router.get("/export-pdf", exportLogbookHarianMasterPDF);

export default router;
