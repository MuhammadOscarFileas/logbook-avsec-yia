import express from "express";
import {
  createPatrolUdaraUraian,
  getAllPatrolUdaraUraian,
  getPatrolUdaraUraianById,
  updatePatrolUdaraUraian,
  deletePatrolUdaraUraian
} from "../controllers/patrol_udara_uraian.js";

const router = express.Router();

router.post("/", createPatrolUdaraUraian);
router.get("/", getAllPatrolUdaraUraian);
router.get("/:id", getPatrolUdaraUraianById);
router.put("/:id", updatePatrolUdaraUraian);
router.delete("/:id", deletePatrolUdaraUraian);

export default router; 