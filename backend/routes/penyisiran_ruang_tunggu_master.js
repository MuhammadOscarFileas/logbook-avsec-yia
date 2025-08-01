import express from "express";
import {
  createPenyisiranRuangTungguMaster,
  getAllPenyisiranRuangTungguMaster,
  getPenyisiranRuangTungguMasterById,
  updatePenyisiranRuangTungguMaster,
  deletePenyisiranRuangTungguMaster
} from "../controllers/penyisiran_ruang_tunggu_master.js";

const router = express.Router();

router.post("/", createPenyisiranRuangTungguMaster);
router.get("/", getAllPenyisiranRuangTungguMaster);
router.get("/:id", getPenyisiranRuangTungguMasterById);
router.put("/:id", updatePenyisiranRuangTungguMaster);
router.delete("/:id", deletePenyisiranRuangTungguMaster);

export default router; 