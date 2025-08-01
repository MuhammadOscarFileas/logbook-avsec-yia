import UraianGate from "../models/uraian_gate.js";

// Get all uraian_gate
export const getAllUraianGate = async (req, res) => {
  try {
    const data = await UraianGate.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get uraian_gate by id
export const getUraianGateById = async (req, res) => {
  try {
    const data = await UraianGate.findByPk(req.params.id);
    if (!data) return res.status(404).json({ message: "Not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create uraian_gate
export const createUraianGate = async (req, res) => {
  try {
    const data = await UraianGate.create(req.body);
    res.status(201).json({ msg: "Uraian Gate berhasil dibuat", data });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update uraian_gate
export const updateUraianGate = async (req, res) => {
  try {
    const data = await UraianGate.update(req.body, {
      where: { id: req.params.id },
    });
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete uraian_gate
export const deleteUraianGate = async (req, res) => {
  try {
    await UraianGate.destroy({ where: { id: req.params.id } });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
