import WalkingPatrolNonTerminalUraian from "../models/walking_patrol_non_terminal_uraian.js";

export const createWalkingPatrolNonTerminalUraian = async (req, res) => {
  try {
    const data = await WalkingPatrolNonTerminalUraian.create(req.body);
    res.status(201).json({ msg: "Walking Patrol Non Terminal Uraian berhasil dibuat", data });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllWalkingPatrolNonTerminalUraian = async (req, res) => {
  try {
    const data = await WalkingPatrolNonTerminalUraian.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getWalkingPatrolNonTerminalUraianById = async (req, res) => {
  try {
    const data = await WalkingPatrolNonTerminalUraian.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: "Data not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateWalkingPatrolNonTerminalUraian = async (req, res) => {
  try {
    const [updated] = await WalkingPatrolNonTerminalUraian.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: "Data not found" });
    res.json({ message: "Data updated" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteWalkingPatrolNonTerminalUraian = async (req, res) => {
  try {
    const deleted = await WalkingPatrolNonTerminalUraian.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: "Data not found" });
    res.json({ message: "Data deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 