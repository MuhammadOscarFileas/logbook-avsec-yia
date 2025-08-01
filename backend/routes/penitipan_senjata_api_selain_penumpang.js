import express from "express";
import {
  createPenitipanSenjataApiSelainPenumpang,
  getAllPenitipanSenjataApiSelainPenumpang,
  getPenitipanSenjataApiSelainPenumpangById,
  updatePenitipanSenjataApiSelainPenumpang,
  deletePenitipanSenjataApiSelainPenumpang
} from "../controllers/penitipan_senjata_api_selain_penumpang.js";

const router = express.Router();

router.post("/", createPenitipanSenjataApiSelainPenumpang);
router.get("/", getAllPenitipanSenjataApiSelainPenumpang);
router.get("/:id", getPenitipanSenjataApiSelainPenumpangById);
router.put("/:id", updatePenitipanSenjataApiSelainPenumpang);
router.delete("/:id", deletePenitipanSenjataApiSelainPenumpang);

export default router; 