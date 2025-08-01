import { DataTypes } from "sequelize";
import db from "../config/database.js";

const LaporanTerminalKargoMaster = db.define(
  "laporan_terminal_kargo_master",
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
    shift: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    petugas_jaga: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nama_menyerahkan: { 
      type: DataTypes.STRING,
      allowNull: true,
    },
    ttd_menyerahkan: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    nama_menerima: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ttd_menerima: {
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

export default LaporanTerminalKargoMaster; 