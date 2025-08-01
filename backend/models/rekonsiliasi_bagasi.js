import { DataTypes } from "sequelize";
import db from "../config/database.js";

const RekonsiliasiBagasi = db.define(
  "rekonsiliasi_bagasi",
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
    flight: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nama_pax: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hasil_temuan: {
      type: DataTypes.STRING,
      allowNull: true,
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

export default RekonsiliasiBagasi; 