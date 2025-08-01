import RotasiPersonelUraian from "../models/rotasi_personel_uraian.js";

export const createRotasiPersonelUraian = async (req, res) => {
  try {
    const data = await RotasiPersonelUraian.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllRotasiPersonelUraian = async (req, res) => {
  try {
    const data = await RotasiPersonelUraian.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getRotasiPersonelUraianById = async (req, res) => {
  try {
    const data = await RotasiPersonelUraian.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: "Data not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateRotasiPersonelUraian = async (req, res) => {
  try {
    const [updated] = await RotasiPersonelUraian.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: "Data not found" });
    res.json({ message: "Data updated" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteRotasiPersonelUraian = async (req, res) => {
  try {
    const deleted = await RotasiPersonelUraian.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: "Data not found" });
    res.json({ message: "Data deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 