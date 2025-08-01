import express from "express";
import {
  createFormKemajuanPersonelUraian,
  getAllFormKemajuanPersonelUraian,
  getFormKemajuanPersonelUraianById,
  updateFormKemajuanPersonelUraian,
  deleteFormKemajuanPersonelUraian
} from "../controllers/form_kemajuan_personel_uraian.js";

const router = express.Router();

router.post("/", createFormKemajuanPersonelUraian);
router.get("/", getAllFormKemajuanPersonelUraian);
router.get("/:id", getFormKemajuanPersonelUraianById);
router.put("/:id", updateFormKemajuanPersonelUraian);
router.delete("/:id", deleteFormKemajuanPersonelUraian);

export default router; 