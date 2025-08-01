import RandomCheckEtd from "../models/random_check_etd.js";

export const createRandomCheckEtd = async (req, res) => {
  try {
    const data = await RandomCheckEtd.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllRandomCheckEtd = async (req, res) => {
  try {
    const data = await RandomCheckEtd.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getRandomCheckEtdById = async (req, res) => {
  try {
    const data = await RandomCheckEtd.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: "Data not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateRandomCheckEtd = async (req, res) => {
  try {
    const [updated] = await RandomCheckEtd.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: "Data not found" });
    res.json({ message: "Data updated" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteRandomCheckEtd = async (req, res) => {
  try {
    const deleted = await RandomCheckEtd.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: "Data not found" });
    res.json({ message: "Data deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 