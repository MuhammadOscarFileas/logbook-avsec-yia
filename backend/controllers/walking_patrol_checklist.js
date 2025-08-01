import WalkingPatrolChecklist from "../models/walking_patrol_checklist.js";

export const createWalkingPatrolChecklist = async (req, res) => {
  try {
    const data = await WalkingPatrolChecklist.create(req.body);
    res.status(201).json({ msg: "Walking Patrol Checklist berhasil dibuat", data });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllWalkingPatrolChecklist = async (req, res) => {
  try {
    const data = await WalkingPatrolChecklist.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getWalkingPatrolChecklistById = async (req, res) => {
  try {
    const data = await WalkingPatrolChecklist.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: "Data not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateWalkingPatrolChecklist = async (req, res) => {
  try {
    const [updated] = await WalkingPatrolChecklist.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: "Data not found" });
    res.json({ message: "Data updated" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteWalkingPatrolChecklist = async (req, res) => {
  try {
    const deleted = await WalkingPatrolChecklist.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: "Data not found" });
    res.json({ message: "Data deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 