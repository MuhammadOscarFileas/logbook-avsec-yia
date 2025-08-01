import express from "express";
import {
  createDataTrackingCctv,
  getAllDataTrackingCctv,
  getDataTrackingCctvById,
  updateDataTrackingCctv,
  deleteDataTrackingCctv
} from "../controllers/data_tracking_cctv.js";

const router = express.Router();

router.post("/", createDataTrackingCctv);
router.get("/", getAllDataTrackingCctv);
router.get("/:id", getDataTrackingCctvById);
router.put("/:id", updateDataTrackingCctv);
router.delete("/:id", deleteDataTrackingCctv);

export default router; 