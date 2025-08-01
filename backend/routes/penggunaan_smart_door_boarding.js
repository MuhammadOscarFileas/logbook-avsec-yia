import express from "express";
import {
  createPenggunaanSmartDoorBoarding,
  getAllPenggunaanSmartDoorBoarding,
  getPenggunaanSmartDoorBoardingById,
  updatePenggunaanSmartDoorBoarding,
  deletePenggunaanSmartDoorBoarding
} from "../controllers/penggunaan_smart_door_boarding.js";

const router = express.Router();

router.post("/", createPenggunaanSmartDoorBoarding);
router.get("/", getAllPenggunaanSmartDoorBoarding);
router.get("/:id", getPenggunaanSmartDoorBoardingById);
router.put("/:id", updatePenggunaanSmartDoorBoarding);
router.delete("/:id", deletePenggunaanSmartDoorBoarding);

export default router; 