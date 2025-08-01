import { DataTypes } from "sequelize";
import db from "../config/database.js";
import LaporanTerminalKargoMaster from "./laporan_terminal_kargo_master.js";

const LaporanTerminalKargoUraian = db.define(
  "laporan_terminal_kargo_uraian",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    laporan_terminal_kargo_master_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // references dihapus, relasi cukup di association.js
    },
    jam: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    nomor_seal: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nomor_polisi: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nama_personel_avsec_ra: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nama_petugas_acceptance: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nama_pengemudi_ra: {
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

LaporanTerminalKargoUraian.belongsTo(LaporanTerminalKargoMaster, {
  foreignKey: "laporan_terminal_kargo_master_id",
  as: "laporan_terminal_kargo_master",
});

export default LaporanTerminalKargoUraian; 