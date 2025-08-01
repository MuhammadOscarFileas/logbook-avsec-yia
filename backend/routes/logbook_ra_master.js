import express from "express";
import {
  createLogbookRaMaster,
  getAllLogbookRaMaster,
  getLogbookRaMasterById,
  updateLogbookRaMaster,
  deleteLogbookRaMaster
} from "../controllers/logbook_ra_master.js";

const router = express.Router();

router.post("/", createLogbookRaMaster);
router.get("/", getAllLogbookRaMaster);
router.get("/:id", getLogbookRaMasterById);
router.put("/:id", updateLogbookRaMaster);
router.delete("/:id", deleteLogbookRaMaster);

export default router; 