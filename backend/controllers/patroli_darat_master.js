import PatroliDaratMaster from "../models/patroli_darat_master.js";

export const createPatroliDaratMaster = async (req, res) => {
  try {
    const data = await PatroliDaratMaster.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllPatroliDaratMaster = async (req, res) => {
  try {
    const data = await PatroliDaratMaster.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPatroliDaratMasterById = async (req, res) => {
  try {
    const data = await PatroliDaratMaster.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: "Data not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updatePatroliDaratMaster = async (req, res) => {
  try {
    const [updated] = await PatroliDaratMaster.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: "Data not found" });
    res.json({ message: "Data updated" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deletePatroliDaratMaster = async (req, res) => {
  try {
    const deleted = await PatroliDaratMaster.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: "Data not found" });
    res.json({ message: "Data deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 