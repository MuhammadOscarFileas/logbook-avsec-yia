import express from "express";
import {
  createRandomCheckEtd,
  getAllRandomCheckEtd,
  getRandomCheckEtdById,
  updateRandomCheckEtd,
  deleteRandomCheckEtd
} from "../controllers/random_check_etd.js";

const router = express.Router();

router.post("/", createRandomCheckEtd);
router.get("/", getAllRandomCheckEtd);
router.get("/:id", getRandomCheckEtdById);
router.put("/:id", updateRandomCheckEtd);
router.delete("/:id", deleteRandomCheckEtd);

export default router; 