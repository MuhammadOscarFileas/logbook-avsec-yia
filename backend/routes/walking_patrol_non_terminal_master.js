import express from "express";
import {
  createWalkingPatrolNonTerminalMaster,
  getAllWalkingPatrolNonTerminalMaster,
  getWalkingPatrolNonTerminalMasterById,
  updateWalkingPatrolNonTerminalMaster,
  deleteWalkingPatrolNonTerminalMaster
} from "../controllers/walking_patrol_non_terminal_master.js";

const router = express.Router();

router.post("/", createWalkingPatrolNonTerminalMaster);
router.get("/", getAllWalkingPatrolNonTerminalMaster);
router.get("/:id", getWalkingPatrolNonTerminalMasterById);
router.put("/:id", updateWalkingPatrolNonTerminalMaster);
router.delete("/:id", deleteWalkingPatrolNonTerminalMaster);

export default router; 