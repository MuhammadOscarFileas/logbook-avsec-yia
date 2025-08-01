import LogbookRaMaster from "../models/logbook_ra_master.js";

export const createLogbookRaMaster = async (req, res) => {
  try {
    const data = await LogbookRaMaster.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllLogbookRaMaster = async (req, res) => {
  try {
    const data = await LogbookRaMaster.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getLogbookRaMasterById = async (req, res) => {
  try {
    const data = await LogbookRaMaster.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: "Data not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateLogbookRaMaster = async (req, res) => {
  try {
    const [updated] = await LogbookRaMaster.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: "Data not found" });
    res.json({ message: "Data updated" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteLogbookRaMaster = async (req, res) => {
  try {
    const deleted = await LogbookRaMaster.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: "Data not found" });
    res.json({ message: "Data deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 