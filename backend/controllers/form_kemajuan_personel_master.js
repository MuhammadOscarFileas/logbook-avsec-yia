import FormKemajuanPersonelMaster from "../models/form_kemajuan_personel_master.js";

export const createFormKemajuanPersonelMaster = async (req, res) => {
  try {
    const data = await FormKemajuanPersonelMaster.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllFormKemajuanPersonelMaster = async (req, res) => {
  try {
    const data = await FormKemajuanPersonelMaster.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getFormKemajuanPersonelMasterById = async (req, res) => {
  try {
    const data = await FormKemajuanPersonelMaster.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: "Data not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateFormKemajuanPersonelMaster = async (req, res) => {
  try {
    const [updated] = await FormKemajuanPersonelMaster.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: "Data not found" });
    res.json({ message: "Data updated" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteFormKemajuanPersonelMaster = async (req, res) => {
  try {
    const deleted = await FormKemajuanPersonelMaster.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: "Data not found" });
    res.json({ message: "Data deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 