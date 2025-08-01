import FormPengendalianPi from "../models/form_pengendalian_pi.js";

export const createFormPengendalianPi = async (req, res) => {
  try {
    const data = await FormPengendalianPi.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllFormPengendalianPi = async (req, res) => {
  try {
    const data = await FormPengendalianPi.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getFormPengendalianPiById = async (req, res) => {
  try {
    const data = await FormPengendalianPi.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: "Data not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateFormPengendalianPi = async (req, res) => {
  try {
    const [updated] = await FormPengendalianPi.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: "Data not found" });
    res.json({ message: "Data updated" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteFormPengendalianPi = async (req, res) => {
  try {
    const deleted = await FormPengendalianPi.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: "Data not found" });
    res.json({ message: "Data deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 