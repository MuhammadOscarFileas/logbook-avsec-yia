import { DataTypes } from "sequelize";
import db from "../config/database.js";
import LogbookRaMaster from "./logbook_ra_master.js";

const LogbookRaUraian = db.define(
  "logbook_ra_uraian",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    logbook_ra_master_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // references dihapus, relasi cukup di association.js
    },
    jam: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    nomor_polisi: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nomor_seal: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    personel_avsec_ra: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    petugas_acceptance: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pengemudi_kargo_ra: {
      type: DataTypes.STRING,
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


export default LogbookRaUraian; 