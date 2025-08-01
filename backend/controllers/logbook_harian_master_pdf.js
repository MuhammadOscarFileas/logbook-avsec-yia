import puppeteer from "puppeteer";
import LogbookHarianMaster from "../models/logbook_harian_master.js";
import UraianTugas from "../models/uraian_tugas.js";
import UraianInventaris from "../models/uraian_inventaris.js";
import { Op } from "sequelize";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to convert image to base64
function imageToBase64(imagePath) {
  try {
    const imageBuffer = fs.readFileSync(imagePath);
    const base64String = imageBuffer.toString('base64');
    const extension = path.extname(imagePath).substring(1);
    return `data:image/${extension};base64,${base64String}`;
  } catch (error) {
    console.error(`Error reading image ${imagePath}:`, error);
    return null;
  }
}

function laporanToHTML(laporan, uraianTugas, uraianInventaris) {
  const assetsPath = path.join(__dirname, "../assets");
  const yialogoPath = path.join(assetsPath, "yialogo.png");
  const injourneylogoPath = path.join(assetsPath, "injourneylogo.png");
  const injourneyjustPath = path.join(assetsPath, "injourneyjust.png");

  // Convert images to base64
  const yialogoBase64 = imageToBase64(yialogoPath);
  const injourneylogoBase64 = imageToBase64(injourneylogoPath);
  const injourneyjustBase64 = imageToBase64(injourneyjustPath);

  return `
    <div class="laporan-page">
      <!-- Header with logos -->
      <div class="header-section">
        <div class="header-left">
          ${injourneylogoBase64 ? `<img src="${injourneylogoBase64}" class="header-logo" alt="InJourney Logo"/>` : '<div class="logo-placeholder">InJourney Logo</div>'}
        </div>
        <div class="header-right">
          ${yialogoBase64 ? `<img src="${yialogoBase64}" class="header-logo" alt="YIA Logo"/>` : '<div class="logo-placeholder">YIA Logo</div>'}
        </div>
      </div>
      
      <div class="header-info">
        <div><b>HARI / TANGGAL</b>	: ${laporan.tanggal || "-"}</div>
        <div><b>DINAS / SHIFT</b>	: ${laporan.shift || "-"}</div>
      </div>
      
      <!-- Judul berdasarkan POS -->
      <div class="pos-title">
        <h2>${laporan.pos}</h2>
      </div>
      
      <br/>
      <table class="tugas-table">
        <thead>
          <tr>
            <th class="col-no">No</th>
            <th class="col-jam">Jam</th>
            <th class="col-uraian">Uraian Tugas</th>
            <th class="col-keterangan">Keterangan</th>
          </tr>
        </thead>
        <tbody>
          ${uraianTugas.map((tugas, i) => `
            <tr>
              <td class="col-no">${i + 1}</td>
              <td class="col-jam">${tugas.jam_mulai} - ${tugas.jam_akhir}</td>
              <td class="col-uraian">${tugas.uraian_tugas}</td>
              <td class="col-keterangan">${tugas.keterangan || ""}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
      ${uraianInventaris.length > 0 ? `
        <table class="inventaris-table">
          <thead>
            <tr>
              <th class="col-no">No</th>
              <th class="col-nama">Nama Inventaris</th>
              <th class="col-jumlah">Jumlah</th>
            </tr>
          </thead>
          <tbody>
            ${uraianInventaris.map((inv, i) => `
              <tr>
                <td class="col-no">${i + 1}</td>
                <td class="col-nama">${inv.nama_inventaris}</td>
                <td class="col-jumlah">${inv.jumlah}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      ` : ''}
      <br/>
      <table class="ttd-table" width="100%">
        <tr>
          <td class="ttd-header">Pembuat</td>
          <td class="ttd-header">Penerima</td>
          <td class="ttd-header">Chief</td>
        </tr>
        <tr>
          <td class="ttd-cell">
            ${laporan.ttd_yg_menyerahkan ? `<img src="${laporan.ttd_yg_menyerahkan}" class="ttd-signature"/><br/>` : "<br/><br/><br/>"}
            <div class="ttd-name">${laporan.nama_yg_menyerahkan || "-"}</div>
          </td>
          <td class="ttd-cell">
            ${laporan.ttd_yg_menerima ? `<img src="${laporan.ttd_yg_menerima}" class="ttd-signature"/><br/>` : "<br/><br/><br/>"}
            <div class="ttd-name">${laporan.nama_yg_menerima || "-"}</div>
          </td>
          <td class="ttd-cell">
            ${laporan.ttd_supervisor ? `<img src="${laporan.ttd_supervisor}" class="ttd-signature"/><br/>` : "<br/><br/><br/>"}
            <div class="ttd-name">${laporan.nama_supervisor || "-"}</div>
          </td>
        </tr>
      </table>
      
      <!-- Watermark -->
      <div class="watermark">
        ${injourneyjustBase64 ? `<img src="${injourneyjustBase64}" class="watermark-img" alt="InJourney Just"/>` : '<div class="watermark-placeholder">InJourney Just</div>'}
      </div>
    </div>
  `;
}

export const exportLogbookHarianMasterPDF = async (req, res) => {
  try {
    const { id, start_date, end_date } = req.query;
    let html = "";
    let filename = "logbook_harian_master.pdf";

    if (id) {
      // Mode 1: Berdasarkan id
      const laporan = await LogbookHarianMaster.findByPk(id, {
        include: [
          { model: UraianTugas, as: "uraian_tugas_list" },
          { model: UraianInventaris, as: "uraian_inventaris_list" },
        ],
      });
      if (!laporan) return res.status(404).json({ error: "Laporan tidak ditemukan" });
      html = laporanToHTML(laporan, laporan.uraian_tugas_list || [], laporan.uraian_inventaris_list || []);
      filename = `logbook_harian_master_${id}.pdf`;
    } else if (start_date && end_date) {
      // Mode 2: Berdasarkan rentang tanggal
      const laporanList = await LogbookHarianMaster.findAll({
        where: {
          tanggal: { [Op.between]: [start_date, end_date] },
        },
        order: [["tanggal", "ASC"]],
        include: [
          { model: UraianTugas, as: "uraian_tugas_list" },
          { model: UraianInventaris, as: "uraian_inventaris_list" },
        ],
      });
      if (!laporanList.length) return res.status(404).json({ error: "Tidak ada laporan di rentang tanggal tersebut" });
      html = laporanList.map((laporan, idx) => `
        ${idx > 0 ? '<div style="page-break-before: always;"></div>' : ''}
        ${laporanToHTML(laporan, laporan.uraian_tugas_list || [], laporan.uraian_inventaris_list || [])}
      `).join("");
      filename = `logbook_harian_master_${start_date}_to_${end_date}.pdf`;
    } else {
      return res.status(400).json({ error: "Parameter id atau start_date & end_date diperlukan" });
    }

    // Bungkus HTML dengan style global
    const fullHtml = `
      <html>
      <head>
        <style>
          body, table, th, td, div, span, p { 
            font-family: Arial, sans-serif; 
            font-size: 11px; 
          }
          body { 
            margin: 1in;
            padding: 0;
          }
          .laporan-page { 
            page-break-after: always; 
            position: relative;
            min-height: 100vh;
          }
          
          /* Header Section */
          .header-section { 
            display: flex; 
            justify-content: space-between; 
            align-items: center; 
            margin-bottom: 20px; 
            padding-bottom: 10px;
            border-bottom: 1px solid #ccc;
          }
          .header-left, .header-right { 
            flex: 1; 
            text-align: center;
          }
          .header-left { text-align: left; }
          .header-right { text-align: right; }
          .header-logo { 
            max-height: 60px; 
            max-width: 200px;
            object-fit: contain;
          }
          .logo-placeholder {
            max-height: 60px;
            max-width: 200px;
            background-color: #f0f0f0;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #555;
            font-size: 14px;
            font-weight: bold;
            border: 1px dashed #ccc;
            padding: 10px;
          }
          
          /* Header Info */
          .header-info div { margin-bottom: 4px; }
          
          /* POS Title */
          .pos-title {
            text-align: center;
            margin: 20px 0 15px 0;
            padding: 10px 0;
            border-bottom: 2px solid #333;
          }
          .pos-title h2 {
            margin: 0;
            font-size: 18px;
            font-weight: bold;
            color: #333;
            text-transform: uppercase;
          }
          
          /* Tables */
          table { 
            border-collapse: collapse; 
            width: 100%; 
            margin-bottom: 16px; 
            table-layout: fixed;
          }
          th, td { 
            border: 1px solid #000; 
            padding: 4px 8px; 
            text-align: left; 
            word-wrap: break-word;
            overflow-wrap: break-word;
          }
          th { background: #eee; }
          
          /* Tugas Table */
          .tugas-table {
            table-layout: fixed;
            width: 100%;
          }
          .tugas-table .col-no { width: 8%; }
          .tugas-table .col-jam { width: 20%; }
          .tugas-table .col-uraian { width: 52%; }
          .tugas-table .col-keterangan { width: 20%; }
          
          /* Inventaris Table */
          .inventaris-table {
            table-layout: fixed;
            width: 100%;
          }
          .inventaris-table .col-no { width: 10%; }
          .inventaris-table .col-nama { width: 70%; }
          .inventaris-table .col-jumlah { width: 20%; }
          
          /* TTD Table */
          .ttd-table { 
            margin-top: 20px;
            width: 100%;
          }
          .ttd-table .ttd-header { 
            border: none; 
            text-align: center; 
            padding: 8px;
            font-weight: bold;
            font-size: 12px;
          }
          .ttd-table .ttd-cell { 
            border: none; 
            text-align: center; 
            height: 120px; 
            vertical-align: top;
            padding: 10px 5px;
          }
          .ttd-signature {
            width: 120px;
            height: auto;
            margin-bottom: 5px;
          }
          .ttd-name {
            font-size: 11px;
            font-weight: bold;
            margin-top: 5px;
          }
          
          /* Watermark */
          .watermark { 
            position: fixed; 
            bottom: 40px; 
            right: 60px; 
            opacity: 0.15; 
            z-index: -1; 
            pointer-events: none;
          }
          .watermark-img { 
            max-height: 320px; 
            max-width: 480px;
            object-fit: contain;
          }
          .watermark-placeholder {
            max-height: 320px;
            max-width: 480px;
            background-color: #f0f0f0;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #555;
            font-size: 12px;
            font-weight: bold;
            border: 1px dashed #ccc;
            padding: 5px;
            opacity: 0.15;
          }
        </style>
      </head>
      <body>
        ${html}
      </body>
      </html>
    `;

    // Konversi HTML ke PDF pakai puppeteer
    const launchOptions = { headless: "new" };
    if (process.env.CHROME_PATH) {
      launchOptions.executablePath = process.env.CHROME_PATH;
    }
    const browser = await puppeteer.launch(launchOptions);
    const page = await browser.newPage();
    await page.setContent(fullHtml, { waitUntil: "networkidle0" });
    const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });
    await browser.close();

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=${filename}`,
    });
    res.send(pdfBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
