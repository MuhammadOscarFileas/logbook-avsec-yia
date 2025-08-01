import UraianInventaris from "../models/uraian_inventaris.js";

export const createUraianInventaris = async (req, res) => {
  try {
    const data = await UraianInventaris.create(req.body);
    res.status(201).json({ msg: "Uraian Inventaris berhasil dibuat", data });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllUraianInventaris = async (req, res) => {
  try {
    const data = await UraianInventaris.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUraianInventarisById = async (req, res) => {
  try {
    const data = await UraianInventaris.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: "Data not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateUraianInventaris = async (req, res) => {
  try {
    await UraianInventaris.update(req.body, { where: { id: req.params.id } });
    res.json({ msg: "Uraian Inventaris berhasil diupdate" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteUraianInventaris = async (req, res) => {
  try {
    const deleted = await UraianInventaris.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: "Data not found" });
    res.json({ msg: "Uraian Inventaris berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 