import { DataTypes } from "sequelize";
import db from "../config/database.js";

const FormPengendalianPI = db.define(
  "form_pengendalian_pi",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nomor_seri: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tanggal: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    perusahaan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    keperluan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    area_kerja: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nama_supervisor: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ttd_supervisor: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    nama_pekerja: {
      type: DataTypes.STRING, 
      allowNull: true,
    },
    ttd_pekerja: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

export default FormPengendalianPI; 