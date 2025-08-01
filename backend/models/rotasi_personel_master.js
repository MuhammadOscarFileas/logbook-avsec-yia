import { DataTypes } from "sequelize";
import db from "../config/database.js";

const RotasiPersonelMaster = db.define(
  "rotasi_personel_master",
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
    dinas: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    regu: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    line: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nama_supervisor: {
      type : DataTypes.STRING,
      allowNull: true,
    },
    ttd_supervisor: {
      type: DataTypes.TEXT,
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

export default RotasiPersonelMaster; 