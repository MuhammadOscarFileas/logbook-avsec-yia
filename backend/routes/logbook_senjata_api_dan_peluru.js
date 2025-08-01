import express from "express";
import {
  createLogbookSenjataApiDanPeluru,
  getAllLogbookSenjataApiDanPeluru,
  getLogbookSenjataApiDanPeluruById,
  updateLogbookSenjataApiDanPeluru,
  deleteLogbookSenjataApiDanPeluru
} from "../controllers/logbook_senjata_api_dan_peluru.js";

const router = express.Router();

router.post("/", createLogbookSenjataApiDanPeluru);
router.get("/", getAllLogbookSenjataApiDanPeluru);
router.get("/:id", getLogbookSenjataApiDanPeluruById);
router.put("/:id", updateLogbookSenjataApiDanPeluru);
router.delete("/:id", deleteLogbookSenjataApiDanPeluru);

export default router; 