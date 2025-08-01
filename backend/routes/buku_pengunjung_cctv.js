import express from "express";
import {
  createBukuPengunjungCCTV,
  getAllBukuPengunjungCCTV,
  getBukuPengunjungCCTVById,
  updateBukuPengunjungCCTV,
  deleteBukuPengunjungCCTV
} from "../controllers/buku_pengunjung_cctv.js";

const router = express.Router();

router.post("/", createBukuPengunjungCCTV);
router.get("/", getAllBukuPengunjungCCTV);
router.get("/:id", getBukuPengunjungCCTVById);
router.put("/:id", updateBukuPengunjungCCTV);
router.delete("/:id", deleteBukuPengunjungCCTV);

export default router; 