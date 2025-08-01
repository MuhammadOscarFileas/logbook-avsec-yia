import BehaviourUraian from "../models/behaviour_uraian.js";

export const createBehaviourUraian = async (req, res) => {
  try {
    const data = await BehaviourUraian.create(req.body);
    res.status(201).json(data);
    res.status(201).json({ msg: "Behaviour uraian berhasil dibuat", data });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllBehaviourUraian = async (req, res) => {
  try {
    const data = await BehaviourUraian.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getBehaviourUraianById = async (req, res) => {
  try {
    const data = await BehaviourUraian.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: "Data not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateBehaviourUraian = async (req, res) => {
  try {
    const [updated] = await BehaviourUraian.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: "Data not found" });
    res.json({ message: "Data updated" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteBehaviourUraian = async (req, res) => {
  try {
    const deleted = await BehaviourUraian.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: "Data not found" });
    res.json({ message: "Data deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 