import LaporanPatroliRandomMaster from "../models/laporan_patroli_random_master.js";

export const createLaporanPatroliRandomMaster = async (req, res) => {
  try {
    const data = await LaporanPatroliRandomMaster.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllLaporanPatroliRandomMaster = async (req, res) => {
  try {
    const data = await LaporanPatroliRandomMaster.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getLaporanPatroliRandomMasterById = async (req, res) => {
  try {
    const data = await LaporanPatroliRandomMaster.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: "Data not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateLaporanPatroliRandomMaster = async (req, res) => {
  try {
    const [updated] = await LaporanPatroliRandomMaster.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: "Data not found" });
    res.json({ message: "Data updated" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteLaporanPatroliRandomMaster = async (req, res) => {
  try {
    const deleted = await LaporanPatroliRandomMaster.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: "Data not found" });
    res.json({ message: "Data deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 