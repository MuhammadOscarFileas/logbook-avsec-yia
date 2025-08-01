import { DataTypes } from "sequelize";
import db from "../config/database.js";

const ChecklistHarianPatroliMaster = db.define(
  "checklist_harian_patroli_master",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tangga: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    catatanl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nama_pagi: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ttd_pagi: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    nama_siang: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ttd_siang: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    nama_malam: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ttd_malam: {
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

export default ChecklistHarianPatroliMaster; 