import { DataTypes } from "sequelize";
import db from "../config/database.js";
import SuspiciousMaster from "./suspicious_master.js";

const SuspiciousUraian = db.define(
  "suspicious_uraian",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    suspicious_master_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // references dihapus, relasi cukup di association.js
    },
    petugas_cctv: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jam: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    lokasi: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tindak_lanjut_laporan: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    keterangan: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

export default SuspiciousUraian; 