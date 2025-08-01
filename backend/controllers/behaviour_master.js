import BehaviourMaster from "../models/behaviour_master.js";

export const createBehaviourMaster = async (req, res) => {
  try {
    const data = await BehaviourMaster.create(req.body);
    res.status(201).json({ msg: "Behaviour Master berhasil dibuat", data });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllBehaviourMaster = async (req, res) => {
  try {
    const data = await BehaviourMaster.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getBehaviourMasterById = async (req, res) => {
  try {
    const data = await BehaviourMaster.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: "Data not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateBehaviourMaster = async (req, res) => {
  try {
    const [updated] = await BehaviourMaster.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: "Data not found" });
    res.json({ message: "Data updated" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteBehaviourMaster = async (req, res) => {
  try {
    const deleted = await BehaviourMaster.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: "Data not found" });
    res.json({ message: "Data deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 