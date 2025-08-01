import LaporanTerminalKargoMaster from "../models/laporan_terminal_kargo_master.js";

export const createLaporanTerminalKargoMaster = async (req, res) => {
  try {
    const data = await LaporanTerminalKargoMaster.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllLaporanTerminalKargoMaster = async (req, res) => {
  try {
    const data = await LaporanTerminalKargoMaster.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getLaporanTerminalKargoMasterById = async (req, res) => {
  try {
    const data = await LaporanTerminalKargoMaster.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: "Data not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateLaporanTerminalKargoMaster = async (req, res) => {
  try {
    const [updated] = await LaporanTerminalKargoMaster.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: "Data not found" });
    res.json({ message: "Data updated" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteLaporanTerminalKargoMaster = async (req, res) => {
  try {
    const deleted = await LaporanTerminalKargoMaster.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: "Data not found" });
    res.json({ message: "Data deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 