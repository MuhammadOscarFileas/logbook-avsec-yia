import { DataTypes } from "sequelize";
import db from "../config/database.js";
import SuspiciousUraian from "./suspicious_uraian.js";

const SuspiciousMaster = db.define(
  "suspicious_master",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tanggal: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    nama_petugas: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ttd_petugas: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    nama_supervisor1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ttd_supervisor1: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    nama_supervisor2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ttd_supervisor2: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

export default SuspiciousMaster; 