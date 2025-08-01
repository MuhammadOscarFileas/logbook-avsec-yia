import { DataTypes } from "sequelize";
import db from "../config/database.js";
import FormPengendalianPI from "./form_pengendalian_pi.js";

const UraianPI = db.define(
  "uraian_pi",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    form_pengendalian_pi: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: FormPengendalianPI, // pakai objek model, bukan string
        key: "id",
      },
    },
    jenis_pi: {
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
  { timestamps: false }
);

export default UraianPI;