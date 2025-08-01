import FormKemajuanPersonelUraian from "../models/form_kemajuan_personel_uraian.js";

export const createFormKemajuanPersonelUraian = async (req, res) => {
  try {
    const data = await FormKemajuanPersonelUraian.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllFormKemajuanPersonelUraian = async (req, res) => {
  try {
    const data = await FormKemajuanPersonelUraian.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getFormKemajuanPersonelUraianById = async (req, res) => {
  try {
    const data = await FormKemajuanPersonelUraian.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: "Data not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateFormKemajuanPersonelUraian = async (req, res) => {
  try {
    const [updated] = await FormKemajuanPersonelUraian.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: "Data not found" });
    res.json({ message: "Data updated" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteFormKemajuanPersonelUraian = async (req, res) => {
  try {
    const deleted = await FormKemajuanPersonelUraian.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: "Data not found" });
    res.json({ message: "Data deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 