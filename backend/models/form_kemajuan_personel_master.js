import { DataTypes } from "sequelize";
import db from "../config/database.js";

const FormKemajuanPersonelMaster = db.define(
  "form_kemajuan_personel_master",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    lokasi: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nama_supervisor: {
      type: DataTypes.STRING, 
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

export default FormKemajuanPersonelMaster; 