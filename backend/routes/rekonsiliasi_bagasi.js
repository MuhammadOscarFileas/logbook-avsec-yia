import express from "express";
import {
  createRekonsiliasiBagasi,
  getAllRekonsiliasiBagasi,
  getRekonsiliasiBagasiById,
  updateRekonsiliasiBagasi,
  deleteRekonsiliasiBagasi
} from "../controllers/rekonsiliasi_bagasi.js";

const router = express.Router();

router.post("/", createRekonsiliasiBagasi);
router.get("/", getAllRekonsiliasiBagasi);
router.get("/:id", getRekonsiliasiBagasiById);
router.put("/:id", updateRekonsiliasiBagasi);
router.delete("/:id", deleteRekonsiliasiBagasi);

export default router; 