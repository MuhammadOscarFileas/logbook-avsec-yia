import express from "express";
import {
  getAllUraianPI,
  getUraianPIById,
  createUraianPI,
  updateUraianPI,
  deleteUraianPI,
} from "../controllers/uraian_pi.js";

const router = express.Router();

router.get("/", getAllUraianPI);
router.get("/:id", getUraianPIById);
router.post("/", createUraianPI);
router.put("/:id", updateUraianPI);
router.delete("/:id", deleteUraianPI);

export default router;
