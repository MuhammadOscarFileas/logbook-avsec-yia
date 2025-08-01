import express from "express";
import {
  createPatrolDaratUraian,
  getAllPatrolDaratUraian,
  getPatrolDaratUraianById,
  updatePatrolDaratUraian,
  deletePatrolDaratUraian
} from "../controllers/patrol_darat_uraian.js";

const router = express.Router();

router.post("/", createPatrolDaratUraian);
router.get("/", getAllPatrolDaratUraian);
router.get("/:id", getPatrolDaratUraianById);
router.put("/:id", updatePatrolDaratUraian);
router.delete("/:id", deletePatrolDaratUraian);

export default router; 