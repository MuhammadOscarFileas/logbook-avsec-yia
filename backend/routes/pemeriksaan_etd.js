import express from "express";
import {
  createPemeriksaanEtd,
  getAllPemeriksaanEtd,
  getPemeriksaanEtdById,
  updatePemeriksaanEtd,
  deletePemeriksaanEtd
} from "../controllers/pemeriksaan_etd.js";

const router = express.Router();

router.post("/", createPemeriksaanEtd);
router.get("/", getAllPemeriksaanEtd);
router.get("/:id", getPemeriksaanEtdById);
router.put("/:id", updatePemeriksaanEtd);
router.delete("/:id", deletePemeriksaanEtd);

export default router; 