import express from "express";
import {
  createLogbookRaUraian,
  getAllLogbookRaUraian,
  getLogbookRaUraianById,
  updateLogbookRaUraian,
  deleteLogbookRaUraian
} from "../controllers/logbook_ra_uraian.js";

const router = express.Router();

router.post("/", createLogbookRaUraian);
router.get("/", getAllLogbookRaUraian);
router.get("/:id", getLogbookRaUraianById);
router.put("/:id", updateLogbookRaUraian);
router.delete("/:id", deleteLogbookRaUraian);

export default router; 