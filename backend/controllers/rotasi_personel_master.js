import RotasiPersonelMaster from "../models/rotasi_personel_master.js";

export const createRotasiPersonelMaster = async (req, res) => {
  try {
    const data = await RotasiPersonelMaster.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllRotasiPersonelMaster = async (req, res) => {
  try {
    const data = await RotasiPersonelMaster.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getRotasiPersonelMasterById = async (req, res) => {
  try {
    const data = await RotasiPersonelMaster.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: "Data not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateRotasiPersonelMaster = async (req, res) => {
  try {
    const [updated] = await RotasiPersonelMaster.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: "Data not found" });
    res.json({ message: "Data updated" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteRotasiPersonelMaster = async (req, res) => {
  try {
    const deleted = await RotasiPersonelMaster.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: "Data not found" });
    res.json({ message: "Data deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 