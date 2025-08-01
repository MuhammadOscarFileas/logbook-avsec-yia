import { DataTypes } from "sequelize";
import db from "../config/database.js";
import LogbookHarianMaster from "./logbook_harian_master.js";

const UraianTugas = db.define(
  "uraian_tugas",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    logbook_harian_master_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: LogbookHarianMaster,
        key: "id",
      },
      onDelete: "CASCADE"
    },
    jam_mulai: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    jam_akhir: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    uraian_tugas: {
      type: DataTypes.TEXT,
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

UraianTugas.belongsTo(LogbookHarianMaster, {
  foreignKey: "logbook_harian_master_id",
  as: "logbook_harian_master",
});

export default UraianTugas; 