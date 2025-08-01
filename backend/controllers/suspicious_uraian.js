import SuspiciousUraian from "../models/suspicious_uraian.js";

export const createSuspiciousUraian = async (req, res) => {
  try {
    const data = await SuspiciousUraian.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllSuspiciousUraian = async (req, res) => {
  try {
    const data = await SuspiciousUraian.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getSuspiciousUraianById = async (req, res) => {
  try {
    const data = await SuspiciousUraian.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: "Data not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateSuspiciousUraian = async (req, res) => {
  try {
    const [updated] = await SuspiciousUraian.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: "Data not found" });
    res.json({ message: "Data updated" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteSuspiciousUraian = async (req, res) => {
  try {
    const deleted = await SuspiciousUraian.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: "Data not found" });
    res.json({ message: "Data deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 