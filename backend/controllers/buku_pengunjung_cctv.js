import BukuPengunjungCCTV from "../models/buku_pengunjung_cctv.js";

export const createBukuPengunjungCCTV = async (req, res) => {
  try {
    const data = await BukuPengunjungCCTV.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllBukuPengunjungCCTV = async (req, res) => {
  try {
    const data = await BukuPengunjungCCTV.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getBukuPengunjungCCTVById = async (req, res) => {
  try {
    const data = await BukuPengunjungCCTV.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: "Data not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateBukuPengunjungCCTV = async (req, res) => {
  try {
    const [updated] = await BukuPengunjungCCTV.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: "Data not found" });
    res.json({ message: "Data updated" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteBukuPengunjungCCTV = async (req, res) => {
  try {
    const deleted = await BukuPengunjungCCTV.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: "Data not found" });
    res.json({ message: "Data deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 