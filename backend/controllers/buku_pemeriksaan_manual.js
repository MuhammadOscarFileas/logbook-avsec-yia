import BukuPemeriksaanManual from "../models/buku_pemeriksaan_manual.js";

export const createBukuPemeriksaanManual = async (req, res) => {
  try {
    const data = await BukuPemeriksaanManual.create(req.body);
    res.status(201).json({ msg: "Buku Pemeriksaan Manual berhasil dibuat", data });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllBukuPemeriksaanManual = async (req, res) => {
  try {
    const data = await BukuPemeriksaanManual.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getBukuPemeriksaanManualById = async (req, res) => {
  try {
    const data = await BukuPemeriksaanManual.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: "Data not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateBukuPemeriksaanManual = async (req, res) => {
  try {
    const [updated] = await BukuPemeriksaanManual.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: "Data not found" });
    res.json({ msg: "Buku Pemeriksaan Manual berhasil diupdate" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteBukuPemeriksaanManual = async (req, res) => {
  try {
    const deleted = await BukuPemeriksaanManual.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: "Data not found" });
    res.json({ msg: "Buku Pemeriksaan Manual berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 