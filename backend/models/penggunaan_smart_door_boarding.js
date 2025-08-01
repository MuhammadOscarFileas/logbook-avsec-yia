import { DataTypes } from "sequelize";
import db from "../config/database.js";

const PenggunaanSmartDoorBoarding = db.define(
  "penggunaan_smart_door_boarding",
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
    gate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    instansi: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nama_petugas: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    keperluan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jam_buka: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    jam_tutup: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    petugas_avsec: {
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

export default PenggunaanSmartDoorBoarding; 