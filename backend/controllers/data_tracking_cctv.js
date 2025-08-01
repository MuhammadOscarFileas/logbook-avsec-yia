import DataTrackingCctv from "../models/data_tracking_cctv.js";

export const createDataTrackingCctv = async (req, res) => {
  try {
    const data = await DataTrackingCctv.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllDataTrackingCctv = async (req, res) => {
  try {
    const data = await DataTrackingCctv.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getDataTrackingCctvById = async (req, res) => {
  try {
    const data = await DataTrackingCctv.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: "Data not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateDataTrackingCctv = async (req, res) => {
  try {
    const [updated] = await DataTrackingCctv.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: "Data not found" });
    res.json({ message: "Data updated" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteDataTrackingCctv = async (req, res) => {
  try {
    const deleted = await DataTrackingCctv.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: "Data not found" });
    res.json({ message: "Data deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 