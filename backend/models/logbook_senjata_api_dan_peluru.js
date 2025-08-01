import { DataTypes } from "sequelize";
import db from "../config/database.js";

const LogbookSenjataApiDanPeluru = db.define(
  "logbook_senjata_api_dan_peluru",
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
    nama_pax: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nama_instansi: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nomor_flight: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tujuan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jenis_senjata_api: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jumlah_senjata_api: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    jumlah_magazine: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    jumlah_peluru: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nomor_ijin_kepemilikan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nama_petugas_airline: {
      type: DataTypes.STRING, 
      allowNull: true,
    },
    ttd_petugas_airline: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    nama_petugas_airport_security: {
      type: DataTypes.STRING, 
      allowNull: true,
    },
    ttd_petugas_airport_security: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

export default LogbookSenjataApiDanPeluru; 