import PenggunaanSmartDoorBoarding from "../models/penggunaan_smart_door_boarding.js";

export const createPenggunaanSmartDoorBoarding = async (req, res) => {
  try {
    const data = await PenggunaanSmartDoorBoarding.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllPenggunaanSmartDoorBoarding = async (req, res) => {
  try {
    const data = await PenggunaanSmartDoorBoarding.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPenggunaanSmartDoorBoardingById = async (req, res) => {
  try {
    const data = await PenggunaanSmartDoorBoarding.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: "Data not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updatePenggunaanSmartDoorBoarding = async (req, res) => {
  try {
    const [updated] = await PenggunaanSmartDoorBoarding.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: "Data not found" });
    res.json({ message: "Data updated" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deletePenggunaanSmartDoorBoarding = async (req, res) => {
  try {
    const deleted = await PenggunaanSmartDoorBoarding.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: "Data not found" });
    res.json({ message: "Data deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 