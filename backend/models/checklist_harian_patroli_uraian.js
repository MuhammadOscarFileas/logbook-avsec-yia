import { DataTypes } from "sequelize";
import db from "../config/database.js";
import ChecklistHarianPatroliMaster from "./checklist_harian_patroli_master.js";

const ChecklistHarianPatroliUraian = db.define(
  "checklist_harian_patroli_uraian",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    checklist_harian_patroli_master_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ChecklistHarianPatroliMaster, // pakai objek model, bukan string
        key: "id",
      },
    },
    keterangan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shift_pagi: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    shift_siang: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    shift_malam: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

ChecklistHarianPatroliUraian.belongsTo(ChecklistHarianPatroliMaster, {
  foreignKey: "checklist_harian_patroli_master_id",
  as: "checklist_harian_patroli_master",
});

export default ChecklistHarianPatroliUraian; 