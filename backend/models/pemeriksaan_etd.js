import { DataTypes } from "sequelize";
import db from "../config/database.js";

const PemeriksaanETD = db.define(
  "pemeriksaan_etd",
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
    flight_penumpang: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nam_penumpang: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nama_operator_etd: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lokasi: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nama_petugas: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tanda_tangan: {
      type: DataTypes.TEXT,
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

export default PemeriksaanETD; 