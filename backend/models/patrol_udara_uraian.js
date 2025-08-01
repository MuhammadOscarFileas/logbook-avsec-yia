import { DataTypes } from "sequelize";
import db from "../config/database.js";
import PatroliUdaraMaster from "./patroli_udara_master.js";

const PatrolUdaraiUraian = db.define(
  "patrol_udarai_uraian",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    patroli_master_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // references dihapus, relasi cukup di association.js
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    area: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    waktu: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    clear: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    catatan_penting: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

PatrolUdaraiUraian.belongsTo(PatroliUdaraMaster, {
  foreignKey: "patroli_master_id",
  as: "patroli_udara_master",
});

export default PatrolUdaraiUraian; 