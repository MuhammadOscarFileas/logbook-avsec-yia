import { DataTypes } from "sequelize";
import db from "../config/database.js";
import LogbookHarianMaster from "./logbook_harian_master.js";

const UraianInventaris = db.define(
  "uraian_inventaris",
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
    nama_inventaris: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jumlah: {
      type: DataTypes.INTEGER,
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

UraianInventaris.belongsTo(LogbookHarianMaster, {
  foreignKey: "logbook_harian_master_id",
  as: "logbook_harian_master",
});

export default UraianInventaris; 