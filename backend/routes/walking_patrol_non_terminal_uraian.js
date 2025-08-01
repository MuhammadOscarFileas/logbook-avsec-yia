import express from "express";
import {
  createWalkingPatrolNonTerminalUraian,
  getAllWalkingPatrolNonTerminalUraian,
  getWalkingPatrolNonTerminalUraianById,
  updateWalkingPatrolNonTerminalUraian,
  deleteWalkingPatrolNonTerminalUraian
} from "../controllers/walking_patrol_non_terminal_uraian.js";

const router = express.Router();

router.post("/", createWalkingPatrolNonTerminalUraian);
router.get("/", getAllWalkingPatrolNonTerminalUraian);
router.get("/:id", getWalkingPatrolNonTerminalUraianById);
router.put("/:id", updateWalkingPatrolNonTerminalUraian);
router.delete("/:id", deleteWalkingPatrolNonTerminalUraian);

export default router; 