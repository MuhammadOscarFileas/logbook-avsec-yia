import LogbookSenjataApiDanPeluru from "../models/logbook_senjata_api_dan_peluru.js";

export const createLogbookSenjataApiDanPeluru = async (req, res) => {
  try {
    const data = await LogbookSenjataApiDanPeluru.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllLogbookSenjataApiDanPeluru = async (req, res) => {
  try {
    const data = await LogbookSenjataApiDanPeluru.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getLogbookSenjataApiDanPeluruById = async (req, res) => {
  try {
    const data = await LogbookSenjataApiDanPeluru.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: "Data not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateLogbookSenjataApiDanPeluru = async (req, res) => {
  try {
    const [updated] = await LogbookSenjataApiDanPeluru.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: "Data not found" });
    res.json({ message: "Data updated" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteLogbookSenjataApiDanPeluru = async (req, res) => {
  try {
    const deleted = await LogbookSenjataApiDanPeluru.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: "Data not found" });
    res.json({ message: "Data deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 