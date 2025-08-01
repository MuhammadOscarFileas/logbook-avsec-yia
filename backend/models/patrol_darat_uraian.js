import { DataTypes } from "sequelize";
import db from "../config/database.js";
import PatroliDaratMaster from "./patroli_darat_master.js";

const PatrolDaratUraian = db.define(
  "patrol_darat_uraian",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    patroli_master_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: PatroliDaratMaster, // pakai objek model, bukan string
        key: "id",
      },
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


export default PatrolDaratUraian; 