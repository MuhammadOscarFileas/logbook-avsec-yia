import { DataTypes } from "sequelize";
import db from "../config/database.js";

const LaporanPatroliRandomMaster = db.define(
  "laporan_patroli_random_master",
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
    petugas1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    petugas2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    petugas3: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    petugas4: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    checkpoint1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    checkpoint2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nama_officer: {
      type: DataTypes.STRING, 
      allowNull: true,
    },
    ttd_officer: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    nama_supervisor: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ttd_supervisor: {
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

export default LaporanPatroliRandomMaster; 