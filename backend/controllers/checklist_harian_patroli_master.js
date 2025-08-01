import ChecklistHarianPatroliMaster from "../models/checklist_harian_patroli_master.js";

export const createChecklistHarianPatroliMaster = async (req, res) => {
  try {
    const data = await ChecklistHarianPatroliMaster.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllChecklistHarianPatroliMaster = async (req, res) => {
  try {
    const data = await ChecklistHarianPatroliMaster.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getChecklistHarianPatroliMasterById = async (req, res) => {
  try {
    const data = await ChecklistHarianPatroliMaster.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: "Data not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateChecklistHarianPatroliMaster = async (req, res) => {
  try {
    const [updated] = await ChecklistHarianPatroliMaster.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: "Data not found" });
    res.json({ message: "Data updated" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteChecklistHarianPatroliMaster = async (req, res) => {
  try {
    const deleted = await ChecklistHarianPatroliMaster.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: "Data not found" });
    res.json({ message: "Data deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 