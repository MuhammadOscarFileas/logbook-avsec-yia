import { DataTypes } from "sequelize";
import db from "../config/database.js";
import WalkingPatrolNonTerminalMaster from "./walking_patrol_non_terminal_master.js";

const WalkingPatrolNonTerminalUraian = db.define(
  "walking_patrol_non_terminal_uraian",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    walking_patrol_non_terminal_master_id: {
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
    keterangan_clear: {
      type: DataTypes.STRING,
      allowNull: true,
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

export default WalkingPatrolNonTerminalUraian; 