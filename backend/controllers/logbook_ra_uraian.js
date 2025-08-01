import LogbookRaUraian from "../models/logbook_ra_uraian.js";

export const createLogbookRaUraian = async (req, res) => {
  try {
    const data = await LogbookRaUraian.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllLogbookRaUraian = async (req, res) => {
  try {
    const data = await LogbookRaUraian.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getLogbookRaUraianById = async (req, res) => {
  try {
    const data = await LogbookRaUraian.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: "Data not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateLogbookRaUraian = async (req, res) => {
  try {
    const [updated] = await LogbookRaUraian.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: "Data not found" });
    res.json({ message: "Data updated" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteLogbookRaUraian = async (req, res) => {
  try {
    const deleted = await LogbookRaUraian.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: "Data not found" });
    res.json({ message: "Data deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 