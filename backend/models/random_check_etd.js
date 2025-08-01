import { DataTypes } from "sequelize";
import db from "../config/database.js";

const RandomCheckETD = db.define(
  "random_check_etd",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tanggal: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    jam: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    flight_penumpang: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nama_penumpang: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nama_petugas: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tanda_tangan: {
      type: DataTypes.TEXT,
      allowNull: true,
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

export default RandomCheckETD; 