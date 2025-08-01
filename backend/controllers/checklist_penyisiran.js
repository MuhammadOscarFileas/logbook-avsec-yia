import ChecklistPenyisiran from "../models/checklist_penyisiran.js";

export const createChecklistPenyisiran = async (req, res) => {
  try {
    const data = await ChecklistPenyisiran.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllChecklistPenyisiran = async (req, res) => {
  try {
    const data = await ChecklistPenyisiran.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getChecklistPenyisiranById = async (req, res) => {
  try {
    const data = await ChecklistPenyisiran.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: "Data not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateChecklistPenyisiran = async (req, res) => {
  try {
    const [updated] = await ChecklistPenyisiran.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: "Data not found" });
    res.json({ message: "Data updated" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteChecklistPenyisiran = async (req, res) => {
  try {
    const deleted = await ChecklistPenyisiran.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: "Data not found" });
    res.json({ message: "Data deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 