import React from 'react';
import { Link } from 'react-router-dom';

const NonMastersIndex = () => (
  <div className="p-4">
    <h2 className="text-xl font-bold mb-4">Halaman Nonmaster</h2>
    <ul className="list-disc pl-6">
      <li>
        <Link to="/forms/nonmasters/uraian-inventaris">Uraian Inventaris</Link>
      </li>
      <li>
        <Link to="/forms/nonmasters/uraian-tugas">Uraian Tugas</Link>
      </li>
      {/* Tambahkan link nonmaster lain di sini */}
    </ul>
  </div>
);

export default NonMastersIndex; 