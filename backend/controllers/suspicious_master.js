import SuspiciousMaster from "../models/suspicious_master.js";

export const createSuspiciousMaster = async (req, res) => {
  try {
    const data = await SuspiciousMaster.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllSuspiciousMaster = async (req, res) => {
  try {
    const data = await SuspiciousMaster.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getSuspiciousMasterById = async (req, res) => {
  try {
    const data = await SuspiciousMaster.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: "Data not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateSuspiciousMaster = async (req, res) => {
  try {
    const [updated] = await SuspiciousMaster.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: "Data not found" });
    res.json({ message: "Data updated" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteSuspiciousMaster = async (req, res) => {
  try {
    const deleted = await SuspiciousMaster.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: "Data not found" });
    res.json({ message: "Data deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 