import PemeriksaanEtd from "../models/pemeriksaan_etd.js";

export const createPemeriksaanEtd = async (req, res) => {
  try {
    const data = await PemeriksaanEtd.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllPemeriksaanEtd = async (req, res) => {
  try {
    const data = await PemeriksaanEtd.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPemeriksaanEtdById = async (req, res) => {
  try {
    const data = await PemeriksaanEtd.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: "Data not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updatePemeriksaanEtd = async (req, res) => {
  try {
    const [updated] = await PemeriksaanEtd.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: "Data not found" });
    res.json({ message: "Data updated" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deletePemeriksaanEtd = async (req, res) => {
  try {
    const deleted = await PemeriksaanEtd.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: "Data not found" });
    res.json({ message: "Data deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 