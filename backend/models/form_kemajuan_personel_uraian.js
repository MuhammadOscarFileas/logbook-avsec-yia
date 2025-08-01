import { DataTypes } from "sequelize";
import db from "../config/database.js";
import FormKemajuanPersonelMaster from "./form_kemajuan_personel_master.js";

const FormKemajuanPersonelUraian = db.define(
  "form_kemajuan_personel_uraian",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    form_kemajuan_personel_master_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // references dihapus, relasi cukup di association.js
    },
    tanggal: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    shift: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jumlah_personil: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    jumlah_kekuatan: {
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

FormKemajuanPersonelUraian.belongsTo(FormKemajuanPersonelMaster, {
  foreignKey: "form_kemajuan_personel_master_id",
  as: "form_kemajuan_personel_master",
});

export default FormKemajuanPersonelUraian; 