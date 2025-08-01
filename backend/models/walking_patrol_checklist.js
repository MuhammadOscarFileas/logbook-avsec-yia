import { DataTypes } from "sequelize";
import db from "../config/database.js";
import WalkingPatrolMaster from "./walking_patrol_master.js";

const WalkingPatrolChecklist = db.define(
  "walking_patrol_checklist",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    walking_patrol_master_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: WalkingPatrolMaster, // pakai objek model, bukan string
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

WalkingPatrolChecklist.belongsTo(WalkingPatrolMaster, {
  foreignKey: "walking_patrol_master_id",
  as: "walking_patrol_master",
});

export default WalkingPatrolChecklist; 