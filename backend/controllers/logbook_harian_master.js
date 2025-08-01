import LogbookHarianMaster from "../models/logbook_harian_master.js";
import UraianTugas from "../models/uraian_tugas.js";
import UraianInventaris from "../models/uraian_inventaris.js";
// GET /api/logbook-harian-master/detail/:id
export const getLogbookHarianMasterByIdWithDetails = async (req, res) => {
  try {
    const data = await LogbookHarianMaster.findByPk(req.params.id, {
      include: [
        { model: UraianTugas, as: "uraian_tugas_list" },
        { model: UraianInventaris, as: "uraian_inventaris_list" }
      ]
    });
    if (!data) return res.status(404).json({ error: "Data not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllLogbookByLokasi = async (req, res) => {
  try {
    const lokasi = req.params.lokasi;
    const data = await LogbookHarianMaster.findAll({ where: { lokasi } });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/logbook-harian-master/lokasi-list
export const getAllLogbookLokasiList = async (req, res) => {
  try {
    const lokasiList = [
      "Chief Terminal Protection",
      "Ruang Tunggu",
      "Walking Patrol",
      "Mezzanine Domestik",
      "Kedatangan Domestik",
      "Akses Karyawan",
      "Bulding Protection",
      "CCTV",
      "Main Gate",
      "Chief Non-Terminal Protection",
      "Patroli",
      "Kargo",
      "Papa November",
      "Pos Congot",
      "PSCP",
      "Level 4",
      "HBS",
      "SCP LAGs",
      "SSCP",
      "OOG"
    ];
    res.json(lokasiList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createLogbookHarianMaster = async (req, res) => {
  try {
    const data = await LogbookHarianMaster.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllLogbookHarianMaster = async (req, res) => {
  try {
    const data = await LogbookHarianMaster.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getLogbookHarianMasterById = async (req, res) => {
  try {
    const data = await LogbookHarianMaster.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: "Data not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateLogbookHarianMaster = async (req, res) => {
  try {
    await LogbookHarianMaster.update(req.body, { where: { id: req.params.id } });
    res.json({ message: "Data updated" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteLogbookHarianMaster = async (req, res) => {
  try {
    const deleted = await LogbookHarianMaster.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: "Data not found" });
    res.json({ message: "Data deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 

// GET /api/logbook-harian-master/submitted-completed
export const getSubmittedAndCompletedLogbookHarianMaster = async (req, res) => {
  try {
    const data = await LogbookHarianMaster.findAll({
      where: {
        status: ["Submitted", "Completed"]
      }
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}