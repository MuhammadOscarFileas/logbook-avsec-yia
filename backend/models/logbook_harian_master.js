import { DataTypes } from "sequelize";
import db from "../config/database.js";

const LogbookHarianMaster = db.define(
  "logbook_harian_master",
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
    shift: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pos: {
      type: DataTypes.ENUM("Screening", "Terminal Protection", "Non-Terminal Protection"),
      allowNull: true,
    },
    lokasi: {
      type: DataTypes.ENUM("Chief Terminal Protection", 
                          "Ruang Tunggu", 
                          "Walking Patrol", 
                          "Mezzanine Domestik", 
                          "Kedatangan Domestik", 
                          "Akses Karyawan", 
                          "Bulding Protection", 
                          "CCTV", "Main Gate", 
                          "Chief Non-Terminal Protection", 
                          "Patroli", "Kargo", 
                          "Papa November", 
                          "Pos Congot", 
                          "PSCP", 
                          "Level 4", 
                          "HBS", 
                          "SCP LAGs", 
                          "SSCP", 
                          "OOG"),
      allowNull: false,
    },
    nama_yg_menyerahkan: {
      type: DataTypes.STRING,
      allowNull: true,
    },  
    ttd_yg_menyerahkan: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    nama_yg_menerima: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ttd_yg_menerima: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    nama_supervisor: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ttd_supervisor: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("Draft", "Submitted", "Completed"),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

export default LogbookHarianMaster; 