import { DataTypes } from "sequelize";
import db from "../config/database.js";
import RotasiPersonelMaster from "./rotasi_personel_master.js";

const RotasiPersonelUraian = db.define(
  "rotasi_personel_uraian",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    rotasi_personel_master_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // references dihapus, relasi cukup di association.js
    },
    kode1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pemdok_start: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    pemdok_end: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    kode2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pengflow_start: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    pengflow_end: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    kode3: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    opsxray_start: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    pemeriksaan_orang_manual_start: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    pemeriksaan_orang_manual_end: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    pemeriksaan_orang_manual_random: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pemeriksaan_orang_manual_unpredict: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    kode4: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    manual_cabin_start: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    manual_cabin_end: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    kode5: {
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

export default RotasiPersonelUraian; 