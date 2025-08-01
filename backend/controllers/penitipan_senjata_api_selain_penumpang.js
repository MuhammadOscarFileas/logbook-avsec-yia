import PenitipanSenjataApiSelainPenumpang from "../models/penitipan_senjata_api_selain_penumpang.js";

export const createPenitipanSenjataApiSelainPenumpang = async (req, res) => {
  try {
    const data = await PenitipanSenjataApiSelainPenumpang.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllPenitipanSenjataApiSelainPenumpang = async (req, res) => {
  try {
    const data = await PenitipanSenjataApiSelainPenumpang.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPenitipanSenjataApiSelainPenumpangById = async (req, res) => {
  try {
    const data = await PenitipanSenjataApiSelainPenumpang.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: "Data not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updatePenitipanSenjataApiSelainPenumpang = async (req, res) => {
  try {
    const [updated] = await PenitipanSenjataApiSelainPenumpang.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: "Data not found" });
    res.json({ message: "Data updated" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deletePenitipanSenjataApiSelainPenumpang = async (req, res) => {
  try {
    const deleted = await PenitipanSenjataApiSelainPenumpang.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: "Data not found" });
    res.json({ message: "Data deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 