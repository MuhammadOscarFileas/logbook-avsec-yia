import { DataTypes } from "sequelize";
import db from "../config/database.js";

const PenyisiranRuangTungguMaster = db.define(
  "penyisiran_ruang_tunggu_master",
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
    jam: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    regu: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nama_petugas: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ttd_petugas_penyisiran: {
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

export default PenyisiranRuangTungguMaster; 