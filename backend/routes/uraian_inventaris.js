import express from "express";
import {
  createUraianInventaris,
  getAllUraianInventaris,
  getUraianInventarisById,
  updateUraianInventaris,
  deleteUraianInventaris
} from "../controllers/uraian_inventaris.js";

const router = express.Router();

router.post("/", createUraianInventaris);
router.get("/", getAllUraianInventaris);
router.get("/:id", getUraianInventarisById);
router.put("/:id", updateUraianInventaris);
router.delete("/:id", deleteUraianInventaris);

export default router; 