import WalkingPatrolMaster from "../models/walking_patrol_master.js";

export const createWalkingPatrolMaster = async (req, res) => {
  try {
    const data = await WalkingPatrolMaster.create(req.body);
    res.status(201).json({ msg: "Walking Patrol Master berhasil dibuat", data });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllWalkingPatrolMaster = async (req, res) => {
  try {
    const data = await WalkingPatrolMaster.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getWalkingPatrolMasterById = async (req, res) => {
  try {
    const data = await WalkingPatrolMaster.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: "Data not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateWalkingPatrolMaster = async (req, res) => {
  try {
    const [updated] = await WalkingPatrolMaster.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: "Data not found" });
    res.json({ message: "Data updated" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteWalkingPatrolMaster = async (req, res) => {
  try {
    const deleted = await WalkingPatrolMaster.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: "Data not found" });
    res.json({ message: "Data deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 