import express from "express";
import { getTtdSupervisorKosong, getLaporanBelumTtdSupervisorByNama, getLogbookHarianMasterBelumTtdSupervisor, getLogbookHarianMasterSudahTtdSupervisor, countLogbookHarianMasterBelumTtdSupervisor } from "../controllers/ttd_supervisor_checker.js";

const router = express.Router();

// GET /api/ttd-supervisor-kosong/:nama
router.get("/logbook-harian-master/count-belum-ttd-supervisor/:nama", countLogbookHarianMasterBelumTtdSupervisor);
router.get("/logbook-harian-master/sudah-ttd-supervisor/:nama", getLogbookHarianMasterSudahTtdSupervisor);
router.get("/laporan-belum-ttd-supervisor/:nama", getLogbookHarianMasterBelumTtdSupervisor);
router.get("/ttd-supervisor-kosong/:nama", getTtdSupervisorKosong);
//router.get("/laporan-belum-ttd-supervisor/:nama", getLogbookHarianMasterBelumTtdSupervisor);

export default router