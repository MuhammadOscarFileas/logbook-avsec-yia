import LogbookHarianMaster from "../models/logbook_harian_master.js";
import { Op } from "sequelize";

// GET /api/ttd-supervisor-kosong/:nama
export const getTtdSupervisorKosong = async (req, res) => {
  const nama = req.params.nama;
  try {
    const where = {
      ttd_supervisor: { [Op.or]: [null, ""] }
    };
    if (nama) {
      where["nama_petugas"] = nama;
    }
    const data = await LogbookHarianMaster.findAll({ where });
    res.json({ total: data.length, laporan: data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/laporan-belum-ttd-supervisor/:nama
export const getLaporanBelumTtdSupervisorByNama = async (req, res) => {
  const nama = req.params.nama;
  try {
    const where = {
      nama_supervisor: nama,
      ttd_supervisor: { [Op.or]: [null, ""] }
    };
    const data = await LogbookHarianMaster.findAll({ where });
    res.json({ total: data.length, laporan: data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/logbook-harian-master/belum-ttd-supervisor/:nama
export const getLogbookHarianMasterBelumTtdSupervisor = async (req, res) => {
  const nama = req.params.nama;
  try {
    const data = await LogbookHarianMaster.findAll({
      where: {
        nama_supervisor: nama,
        status: "Submitted",
        ttd_supervisor: { [Op.or]: [null, ""] }
      }
    });
    res.json({ total: data.length, laporan: data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/logbook-harian-master/sudah-ttd-supervisor/:nama
export const getLogbookHarianMasterSudahTtdSupervisor = async (req, res) => {
  const nama = req.params.nama;
  try {
    const data = await LogbookHarianMaster.findAll({
      where: {
        nama_supervisor: nama,
        ttd_supervisor: { [Op.and]: [{ [Op.ne]: null }, { [Op.ne]: "" }] }
      }
    });
    res.json({ total: data.length, laporan: data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/logbook-harian-master/count-belum-ttd-supervisor/:nama
export const countLogbookHarianMasterBelumTtdSupervisor = async (req, res) => {
  const nama = req.params.nama;
  try {
    const count = await LogbookHarianMaster.count({
      where: {
        nama_supervisor: nama,
        ttd_supervisor: { [Op.or]: [null, ""] }
      }
    });
    res.json({ total: count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};