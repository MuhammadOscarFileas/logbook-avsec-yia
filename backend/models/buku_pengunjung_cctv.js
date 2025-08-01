import { DataTypes } from "sequelize";
import db from "../config/database.js";

const BukuPengunjungCCTV = db.define(
  "buku_pengunjung_cctv",
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
    nama_petugas: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nama_pengunjung: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    instansi: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    no_telp: {
      type: DataTypes.STRING,
      allowNull: false,
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

export default BukuPengunjungCCTV; 