import { DataTypes } from "sequelize";
import db from "../config/database.js";
import PenyisiranRuangTungguMaster from "./penyisiran_ruang_tunggu_master.js";

const ChecklistPenyisiran = db.define(
  "checklist_penyisiran",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    masterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: PenyisiranRuangTungguMaster,
        key: "id",
      },
    },
    keterangan: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    temuan: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    kondisi: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

ChecklistPenyisiran.belongsTo(PenyisiranRuangTungguMaster, {
  foreignKey: "masterId",
  as: "penyisiran_ruang_tunggu_master",
});

export default ChecklistPenyisiran; 