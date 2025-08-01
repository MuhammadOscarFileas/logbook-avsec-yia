import express from "express";
import {
  createWalkingPatrolMaster,
  getAllWalkingPatrolMaster,
  getWalkingPatrolMasterById,
  updateWalkingPatrolMaster,
  deleteWalkingPatrolMaster
} from "../controllers/walking_patrol_master.js";

const router = express.Router();

router.post("/", createWalkingPatrolMaster);
router.get("/", getAllWalkingPatrolMaster);
router.get("/:id", getWalkingPatrolMasterById);
router.put("/:id", updateWalkingPatrolMaster);
router.delete("/:id", deleteWalkingPatrolMaster);

export default router; 