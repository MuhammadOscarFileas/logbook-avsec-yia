import express from "express";
import {
  createBehaviourUraian,
  getAllBehaviourUraian,
  getBehaviourUraianById,
  updateBehaviourUraian,
  deleteBehaviourUraian
} from "../controllers/behaviour_uraian.js";

const router = express.Router();

router.post("/", createBehaviourUraian);
router.get("/", getAllBehaviourUraian);
router.get("/:id", getBehaviourUraianById);
router.put("/:id", updateBehaviourUraian);
router.delete("/:id", deleteBehaviourUraian);

export default router; 