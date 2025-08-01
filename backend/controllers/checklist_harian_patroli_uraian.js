import ChecklistHarianPatroliUraian from "../models/checklist_harian_patroli_uraian.js";

export const createChecklistHarianPatroliUraian = async (req, res) => {
  try {
    const data = await ChecklistHarianPatroliUraian.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllChecklistHarianPatroliUraian = async (req, res) => {
  try {
    const data = await ChecklistHarianPatroliUraian.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getChecklistHarianPatroliUraianById = async (req, res) => {
  try {
    const data = await ChecklistHarianPatroliUraian.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: "Data not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateChecklistHarianPatroliUraian = async (req, res) => {
  try {
    const [updated] = await ChecklistHarianPatroliUraian.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: "Data not found" });
    res.json({ message: "Data updated" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteChecklistHarianPatroliUraian = async (req, res) => {
  try {
    const deleted = await ChecklistHarianPatroliUraian.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: "Data not found" });
    res.json({ message: "Data deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 