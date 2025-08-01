import PatroliUdaraMaster from "../models/patroli_udara_master.js";

export const createPatroliUdaraMaster = async (req, res) => {
  try {
    const data = await PatroliUdaraMaster.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllPatroliUdaraMaster = async (req, res) => {
  try {
    const data = await PatroliUdaraMaster.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPatroliUdaraMasterById = async (req, res) => {
  try {
    const data = await PatroliUdaraMaster.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: "Data not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updatePatroliUdaraMaster = async (req, res) => {
  try {
    const [updated] = await PatroliUdaraMaster.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: "Data not found" });
    res.json({ message: "Data updated" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deletePatroliUdaraMaster = async (req, res) => {
  try {
    const deleted = await PatroliUdaraMaster.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: "Data not found" });
    res.json({ message: "Data deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 