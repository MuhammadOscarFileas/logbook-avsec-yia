import LogbookHarianMaster from "../models/logbook_harian_master.js";
import BehaviourMaster from "../models/behaviour_master.js";
import FormKemajuanPersonelMaster from "../models/form_kemajuan_personel_master.js";
import LaporanPatroliRandomMaster from "../models/laporan_patroli_random_master.js";
import PatroliDaratMaster from "../models/patroli_darat_master.js";
import PatroliUdaraMaster from "../models/patroli_udara_master.js";
import RotasiPersonelMaster from "../models/rotasi_personel_master.js";
import SuspiciousMaster from "../models/suspicious_master.js";
import WalkingPatrolMaster from "../models/walking_patrol_master.js";
import WalkingPatrolNonTerminalMaster from "../models/walking_patrol_non_terminal_master.js";
import { Op } from "sequelize";

// Map model name to model and ttd field(s)
const models = [
  { name: "logbook_harian_master", model: LogbookHarianMaster, fields: ["ttd_supervisor"] },
  { name: "behaviour_master", model: BehaviourMaster, fields: ["ttd_supervisor1", "ttd_supervisor2"] },
  { name: "form_kemajuan_personel_master", model: FormKemajuanPersonelMaster, fields: ["ttd_supervisor"] },
  { name: "laporan_patroli_random_master", model: LaporanPatroliRandomMaster, fields: ["ttd_supervisor"] },
  { name: "patroli_darat_master", model: PatroliDaratMaster, fields: ["ttd_supervisor"] },
  { name: "patroli_udara_master", model: PatroliUdaraMaster, fields: ["ttd_supervisor"] },
  { name: "rotasi_personel_master", model: RotasiPersonelMaster, fields: ["ttd_supervisor", "ttd_supervisor2"] },
  { name: "suspicious_master", model: SuspiciousMaster, fields: ["ttd_supervisor1", "ttd_supervisor2"] },
  { name: "walking_patrol_master", model: WalkingPatrolMaster, fields: ["ttd_supervisor"] },
  { name: "walking_patrol_non_terminal_master", model: WalkingPatrolNonTerminalMaster, fields: ["ttd_supervisor"] },
];

// GET /api/ttd-supervisor-kosong/:nama
export const getTtdSupervisorKosong = async (req, res) => {
  const nama = req.params.nama;
  const result = {};
  try {
    for (const entry of models) {
      const where = {};
      for (const field of entry.fields) {
        where[field] = { [Op.or]: [null, ""] };
      }
      if (nama) {
        where["nama_petugas"] = nama;
      }
      const data = await entry.model.findAll({ where });
      result[entry.name] = {
        total: data.length,
        laporan: data
      };
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/laporan-belum-ttd-supervisor/:nama
export const getLaporanBelumTtdSupervisorByNama = async (req, res) => {
  const nama = req.params.nama;
  const result = {};
  try {
    for (const entry of models) {
      // Build where condition: nama_supervisor matches AND any ttd_supervisor field is empty
      const where = {
        nama_supervisor: nama
      };
      
      // Add condition for empty signature fields
      const ttdConditions = entry.fields.map(field => ({
        [field]: { [Op.or]: [null, ""] }
      }));
      
      if (ttdConditions.length === 1) {
        // Single field, use AND
        Object.assign(where, ttdConditions[0]);
      } else {
        // Multiple fields, use OR for ttd conditions
        where[Op.or] = ttdConditions;
      }
      
      const data = await entry.model.findAll({ where });
      result[entry.name] = {
        total: data.length,
        laporan: data
      };
    }
    res.json(result);
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
        status: "Submitted"
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
  const result = {};
  try {
    for (const entry of models) {
      // Build where condition: nama_supervisor matches AND all ttd_supervisor fields are filled
      const where = {
        nama_supervisor: nama
      };
      
      // Add condition for filled signature fields (not null and not empty)
      const ttdConditions = entry.fields.map(field => ({
        [field]: { [Op.and]: [{ [Op.ne]: null }, { [Op.ne]: "" }] }
      }));
      
      if (ttdConditions.length === 1) {
        // Single field, use AND
        Object.assign(where, ttdConditions[0]);
      } else {
        // Multiple fields, use AND for ttd conditions (all must be filled)
        where[Op.and] = ttdConditions;
      }
      
      const data = await entry.model.findAll({ where });
      result[entry.name] = {
        total: data.length,
        laporan: data
      };
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/logbook-harian-master/count-belum-ttd-supervisor/:nama
export const countLogbookHarianMasterBelumTtdSupervisor = async (req, res) => {
  const nama = req.params.nama;
  try {
    // Count all unsigned reports across all models
    let totalCount = 0;
    
    for (const entry of models) {
      // Build where condition: nama_supervisor matches AND any ttd_supervisor field is empty
      const where = {
        nama_supervisor: nama
      };
      
      // Add condition for empty signature fields
      const ttdConditions = entry.fields.map(field => ({
        [field]: { [Op.or]: [null, ""] }
      }));
      
      if (ttdConditions.length === 1) {
        // Single field, use AND
        Object.assign(where, ttdConditions[0]);
      } else {
        // Multiple fields, use OR for ttd conditions
        where[Op.or] = ttdConditions;
      }
      
      const count = await entry.model.count({ where });
      totalCount += count;
    }
    
    res.json({ total: totalCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};