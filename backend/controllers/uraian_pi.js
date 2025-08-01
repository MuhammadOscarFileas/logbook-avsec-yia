import UraianPI from "../models/uraian_pi.js";

// Get all uraian_pi
export const getAllUraianPI = async (req, res) => {
  try {
    const data = await UraianPI.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get uraian_pi by id
export const getUraianPIById = async (req, res) => {
  try {
    const data = await UraianPI.findByPk(req.params.id);
    if (!data) return res.status(404).json({ message: "Not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create uraian_pi
export const createUraianPI = async (req, res) => {
  try {
    const data = await UraianPI.create(req.body);
    res.status(201).json({ msg: "Uraian PI berhasil dibuat", data });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update uraian_pi
export const updateUraianPI = async (req, res) => {
  try {
    const data = await UraianPI.update(req.body, {
      where: { id: req.params.id },
    });
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete uraian_pi
export const deleteUraianPI = async (req, res) => {
  try {
    await UraianPI.destroy({ where: { id: req.params.id } });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
