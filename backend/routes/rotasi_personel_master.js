import express from "express";
import {
  createRotasiPersonelMaster,
  getAllRotasiPersonelMaster,
  getRotasiPersonelMasterById,
  updateRotasiPersonelMaster,
  deleteRotasiPersonelMaster
} from "../controllers/rotasi_personel_master.js";

const router = express.Router();

router.post("/", createRotasiPersonelMaster);
router.get("/", getAllRotasiPersonelMaster);
router.get("/:id", getRotasiPersonelMasterById);
router.put("/:id", updateRotasiPersonelMaster);
router.delete("/:id", deleteRotasiPersonelMaster);

export default router; 