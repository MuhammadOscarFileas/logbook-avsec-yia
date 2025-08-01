import express from "express";
import {
  getAllUraianGate,
  getUraianGateById,
  createUraianGate,
  updateUraianGate,
  deleteUraianGate,
} from "../controllers/uraian_gate.js";

const router = express.Router();

router.get("/", getAllUraianGate);
router.get("/:id", getUraianGateById);
router.post("/", createUraianGate);
router.put("/:id", updateUraianGate);
router.delete("/:id", deleteUraianGate);

export default router;
