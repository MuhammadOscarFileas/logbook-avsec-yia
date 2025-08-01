import PatrolDaratUraian from "../models/patrol_darat_uraian.js";

export const createPatrolDaratUraian = async (req, res) => {
  try {
    const data = await PatrolDaratUraian.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllPatrolDaratUraian = async (req, res) => {
  try {
    const data = await PatrolDaratUraian.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPatrolDaratUraianById = async (req, res) => {
  try {
    const data = await PatrolDaratUraian.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: "Data not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updatePatrolDaratUraian = async (req, res) => {
  try {
    const [updated] = await PatrolDaratUraian.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: "Data not found" });
    res.json({ message: "Data updated" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deletePatrolDaratUraian = async (req, res) => {
  try {
    const deleted = await PatrolDaratUraian.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: "Data not found" });
    res.json({ message: "Data deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 