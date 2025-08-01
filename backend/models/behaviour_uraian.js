import { DataTypes } from "sequelize";
import db from "../config/database.js";
import BehaviourMaster from "./behaviour_master.js";

const BehaviourUraian = db.define(
  "behaviour_uraian",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    behaviour_master_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: BehaviourMaster, // pakai objek model, bukan string
        key: "id",
      },
    },
    petugas_cctv: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jam: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    lokasi: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tindak_lanjut_laporan: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
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

BehaviourUraian.belongsTo(BehaviourMaster, {
  foreignKey: "behaviour_master_id",
  as: "behaviour_master",
});

export default BehaviourUraian; 