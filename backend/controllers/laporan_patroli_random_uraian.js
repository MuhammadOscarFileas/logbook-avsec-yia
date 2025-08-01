import LaporanPatroliRandomUraian from "../models/laporan_patroli_random_uraian.js";

export const createLaporanPatroliRandomUraian = async (req, res) => {
  try {
    const data = await LaporanPatroliRandomUraian.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllLaporanPatroliRandomUraian = async (req, res) => {
  try {
    const data = await LaporanPatroliRandomUraian.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getLaporanPatroliRandomUraianById = async (req, res) => {
  try {
    const data = await LaporanPatroliRandomUraian.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: "Data not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateLaporanPatroliRandomUraian = async (req, res) => {
  try {
    const [updated] = await LaporanPatroliRandomUraian.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: "Data not found" });
    res.json({ message: "Data updated" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteLaporanPatroliRandomUraian = async (req, res) => {
  try {
    const deleted = await LaporanPatroliRandomUraian.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: "Data not found" });
    res.json({ message: "Data deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 