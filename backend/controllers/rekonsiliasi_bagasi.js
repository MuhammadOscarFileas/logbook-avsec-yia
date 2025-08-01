import RekonsiliasiBagasi from "../models/rekonsiliasi_bagasi.js";

export const createRekonsiliasiBagasi = async (req, res) => {
  try {
    const data = await RekonsiliasiBagasi.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllRekonsiliasiBagasi = async (req, res) => {
  try {
    const data = await RekonsiliasiBagasi.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getRekonsiliasiBagasiById = async (req, res) => {
  try {
    const data = await RekonsiliasiBagasi.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: "Data not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateRekonsiliasiBagasi = async (req, res) => {
  try {
    const [updated] = await RekonsiliasiBagasi.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: "Data not found" });
    res.json({ message: "Data updated" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteRekonsiliasiBagasi = async (req, res) => {
  try {
    const deleted = await RekonsiliasiBagasi.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: "Data not found" });
    res.json({ message: "Data deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 