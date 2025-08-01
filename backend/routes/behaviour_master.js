import express from "express";
import {
  createBehaviourMaster,
  getAllBehaviourMaster,
  getBehaviourMasterById,
  updateBehaviourMaster,
  deleteBehaviourMaster
} from "../controllers/behaviour_master.js";

const router = express.Router();

router.post("/", createBehaviourMaster);
router.get("/", getAllBehaviourMaster);
router.get("/:id", getBehaviourMasterById);
router.put("/:id", updateBehaviourMaster);
router.delete("/:id", deleteBehaviourMaster);

export default router; 