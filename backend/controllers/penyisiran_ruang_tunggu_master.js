import PenyisiranRuangTungguMaster from "../models/penyisiran_ruang_tunggu_master.js";

export const createPenyisiranRuangTungguMaster = async (req, res) => {
  try {
    const data = await PenyisiranRuangTungguMaster.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllPenyisiranRuangTungguMaster = async (req, res) => {
  try {
    const data = await PenyisiranRuangTungguMaster.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPenyisiranRuangTungguMasterById = async (req, res) => {
  try {
    const data = await PenyisiranRuangTungguMaster.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: "Data not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updatePenyisiranRuangTungguMaster = async (req, res) => {
  try {
    const [updated] = await PenyisiranRuangTungguMaster.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: "Data not found" });
    res.json({ message: "Data updated" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deletePenyisiranRuangTungguMaster = async (req, res) => {
  try {
    const deleted = await PenyisiranRuangTungguMaster.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: "Data not found" });
    res.json({ message: "Data deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 