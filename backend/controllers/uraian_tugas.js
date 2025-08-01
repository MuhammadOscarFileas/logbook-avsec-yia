import UraianTugas from "../models/uraian_tugas.js";

export const createUraianTugas = async (req, res) => {
  try {
    const data = await UraianTugas.create(req.body);
    res.status(201).json({ msg: "Uraian Tugas berhasil dibuat", data });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllUraianTugas = async (req, res) => {
  try {
    const data = await UraianTugas.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUraianTugasById = async (req, res) => {
  try {
    const data = await UraianTugas.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: "Data not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateUraianTugas = async (req, res) => {
  try {
    await UraianTugas.update(req.body, { where: { id: req.params.id } });
    res.json({ msg: "Uraian Tugas berhasil diupdate" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteUraianTugas = async (req, res) => {
  try {
    const deleted = await UraianTugas.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: "Data not found" });
    res.json({ msg: "Uraian Tugas berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 