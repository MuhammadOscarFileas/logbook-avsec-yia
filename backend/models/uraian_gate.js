import { DataTypes } from "sequelize";
import db from "../config/database.js";
import FormPengendalianPI from "./form_pengendalian_pi.js";

const UraianGate = db.define(
  "uraian_gate",
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
        model: FormPengendalianPI,
        key: "id",
      },
    },
    jenis_pintu: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lokasi: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    checked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    jam: {
      type: DataTypes.TIME,
      allowNull: false,
    },
  },
  { timestamps: false }
);

export default UraianGate;