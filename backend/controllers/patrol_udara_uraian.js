import PatrolUdaraUraian from "../models/patrol_udara_uraian.js";

export const createPatrolUdaraUraian = async (req, res) => {
  try {
    const data = await PatrolUdaraUraian.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllPatrolUdaraUraian = async (req, res) => {
  try {
    const data = await PatrolUdaraUraian.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPatrolUdaraUraianById = async (req, res) => {
  try {
    const data = await PatrolUdaraUraian.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: "Data not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updatePatrolUdaraUraian = async (req, res) => {
  try {
    const [updated] = await PatrolUdaraUraian.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: "Data not found" });
    res.json({ message: "Data updated" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deletePatrolUdaraUraian = async (req, res) => {
  try {
    const deleted = await PatrolUdaraUraian.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: "Data not found" });
    res.json({ message: "Data deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 