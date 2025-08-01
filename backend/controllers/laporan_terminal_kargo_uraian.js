import LaporanTerminalKargoUraian from "../models/laporan_terminal_kargo_uraian.js";

export const createLaporanTerminalKargoUraian = async (req, res) => {
  try {
    const data = await LaporanTerminalKargoUraian.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllLaporanTerminalKargoUraian = async (req, res) => {
  try {
    const data = await LaporanTerminalKargoUraian.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getLaporanTerminalKargoUraianById = async (req, res) => {
  try {
    const data = await LaporanTerminalKargoUraian.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: "Data not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateLaporanTerminalKargoUraian = async (req, res) => {
  try {
    const [updated] = await LaporanTerminalKargoUraian.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: "Data not found" });
    res.json({ message: "Data updated" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteLaporanTerminalKargoUraian = async (req, res) => {
  try {
    const deleted = await LaporanTerminalKargoUraian.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: "Data not found" });
    res.json({ message: "Data deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 