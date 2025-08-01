import { DataTypes } from "sequelize";
import db from "../config/database.js";

const BukuPemeriksaanManual = db.define(
  "buku_pemeriksaan_manual",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    hari_tanggal: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    shift: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jam: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    nama_petugas: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pemeriksaan_pax: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pemeriksaan_flight: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pemeriksaan_orang: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pemeriksaan_barang: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    temuan: {
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

export default BukuPemeriksaanManual; 