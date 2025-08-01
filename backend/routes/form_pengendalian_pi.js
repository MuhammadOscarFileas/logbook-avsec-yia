import express from "express";
import {
  createFormPengendalianPi,
  getAllFormPengendalianPi,
  getFormPengendalianPiById,
  updateFormPengendalianPi,
  deleteFormPengendalianPi
} from "../controllers/form_pengendalian_pi.js";

const router = express.Router();

router.post("/", createFormPengendalianPi);
router.get("/", getAllFormPengendalianPi);
router.get("/:id", getFormPengendalianPiById);
router.put("/:id", updateFormPengendalianPi);
router.delete("/:id", deleteFormPengendalianPi);

export default router; 