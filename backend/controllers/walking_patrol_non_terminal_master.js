import WalkingPatrolNonTerminalMaster from "../models/walking_patrol_non_terminal_master.js";

export const createWalkingPatrolNonTerminalMaster = async (req, res) => {
  try {
    const data = await WalkingPatrolNonTerminalMaster.create(req.body);
    res.status(201).json({ msg: "Walking Patrol Non Terminal Master berhasil dibuat", data });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllWalkingPatrolNonTerminalMaster = async (req, res) => {
  try {
    const data = await WalkingPatrolNonTerminalMaster.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getWalkingPatrolNonTerminalMasterById = async (req, res) => {
  try {
    const data = await WalkingPatrolNonTerminalMaster.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: "Data not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateWalkingPatrolNonTerminalMaster = async (req, res) => {
  try {
    const [updated] = await WalkingPatrolNonTerminalMaster.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: "Data not found" });
    res.json({ message: "Data updated" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteWalkingPatrolNonTerminalMaster = async (req, res) => {
  try {
    const deleted = await WalkingPatrolNonTerminalMaster.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: "Data not found" });
    res.json({ message: "Data deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 