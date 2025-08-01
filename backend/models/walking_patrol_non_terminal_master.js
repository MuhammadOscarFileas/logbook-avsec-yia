import { DataTypes } from "sequelize";
import db from "../config/database.js";

const WalkingPatrolNonTerminalMaster = db.define(
  "walking_patrol_non_terminal_master",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nama_officer: {
      type: DataTypes.STRING, 
      allowNull: true,
    },
    ttd_officer: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    nama_supervisor: {
      type: DataTypes.STRING, 
      allowNull: true,
    },
    ttd_supervisor: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

export default WalkingPatrolNonTerminalMaster; 