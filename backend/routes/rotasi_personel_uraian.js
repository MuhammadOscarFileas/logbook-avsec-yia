import express from "express";
import {
  createRotasiPersonelUraian,
  getAllRotasiPersonelUraian,
  getRotasiPersonelUraianById,
  updateRotasiPersonelUraian,
  deleteRotasiPersonelUraian
} from "../controllers/rotasi_personel_uraian.js";

const router = express.Router();

router.post("/", createRotasiPersonelUraian);
router.get("/", getAllRotasiPersonelUraian);
router.get("/:id", getRotasiPersonelUraianById);
router.put("/:id", updateRotasiPersonelUraian);
router.delete("/:id", deleteRotasiPersonelUraian);

export default router; 