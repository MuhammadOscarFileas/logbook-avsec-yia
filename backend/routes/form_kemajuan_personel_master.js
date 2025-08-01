import express from "express";
import {
  createFormKemajuanPersonelMaster,
  getAllFormKemajuanPersonelMaster,
  getFormKemajuanPersonelMasterById,
  updateFormKemajuanPersonelMaster,
  deleteFormKemajuanPersonelMaster
} from "../controllers/form_kemajuan_personel_master.js";

const router = express.Router();

router.post("/", createFormKemajuanPersonelMaster);
router.get("/", getAllFormKemajuanPersonelMaster);
router.get("/:id", getFormKemajuanPersonelMasterById);
router.put("/:id", updateFormKemajuanPersonelMaster);
router.delete("/:id", deleteFormKemajuanPersonelMaster);

export default router; 