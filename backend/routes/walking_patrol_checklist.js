import express from "express";
import {
  createWalkingPatrolChecklist,
  getAllWalkingPatrolChecklist,
  getWalkingPatrolChecklistById,
  updateWalkingPatrolChecklist,
  deleteWalkingPatrolChecklist
} from "../controllers/walking_patrol_checklist.js";

const router = express.Router();

router.post("/", createWalkingPatrolChecklist);
router.get("/", getAllWalkingPatrolChecklist);
router.get("/:id", getWalkingPatrolChecklistById);
router.put("/:id", updateWalkingPatrolChecklist);
router.delete("/:id", deleteWalkingPatrolChecklist);

export default router; 