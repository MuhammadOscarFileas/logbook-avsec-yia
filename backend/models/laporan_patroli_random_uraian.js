import { DataTypes } from "sequelize";
import db from "../config/database.js";
import LaporanPatroliRandomMaster from "./laporan_patroli_random_master.js";

const LaporanPatroliRandomUraian = db.define(
  "laporan_patroli_random_uraian",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    laporan_patroli_random_master_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // references dihapus, relasi cukup di association.js
    },
    temuan: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tindak_lanjut: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

LaporanPatroliRandomUraian.belongsTo(LaporanPatroliRandomMaster, {
  foreignKey: "laporan_patroli_random_master_id",
  as: "laporan_patroli_random_master",
});

export default LaporanPatroliRandomUraian; 