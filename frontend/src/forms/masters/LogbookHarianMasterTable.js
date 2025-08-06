import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const LogbookHarianMasterTable = () => {
  const navigate = useNavigate();
  const query = useQuery();
  const lokasiFilter = query.get('lokasi');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    let url = '/api/logbook-harian-master/';
    if (lokasiFilter) {
      url = `/api/logbook-harian-master/harian/${encodeURIComponent(lokasiFilter)}`;
    }
    axiosInstance.get(url)
      .then(res => setData(res.data))
      .catch(err => setError('Gagal mengambil data'))
      .finally(() => setLoading(false));
  }, [lokasiFilter]);

  const handleCardClick = (id) => {
    navigate(`/forms/masters/logbook-harian/${id}`);
  };

  const handlePreview = (e, id) => {
    e.stopPropagation();
    navigate(`/forms/masters/logbook-harian/preview/${id}`);
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (window.confirm('Apakah Anda yakin ingin menghapus logbook ini? Semua data uraian tugas dan inventaris akan ikut terhapus.')) {
      try {
        console.log('Attempting to delete logbook with ID:', id);
        
        // Delete the main logbook (backend should handle cascading deletes)
        const response = await axiosInstance.delete(`/api/logbook-harian-master/${id}`);
        console.log('Delete response:', response);
        
        setData(data.filter(item => item.id !== id));
        alert('Logbook berhasil dihapus');
      } catch (err) {
        console.error('Delete error:', err);
        console.error('Error response:', err.response?.data);
        alert(`Gagal menghapus logbook: ${err.response?.data?.error || err.message}`);
      }
    }
  };

  const handleCreate = () => {
    navigate(`/forms/masters/logbook-harian/create${lokasiFilter ? `?lokasi=${encodeURIComponent(lokasiFilter)}` : ''}`);
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
      case 'selesai':
        return 'bg-green-100 text-green-800';
      case 'submitted':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
      case 'menunggu':
        return 'bg-yellow-100 text-yellow-800';
      case 'draft':
      case 'draf':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const isEditable = (status) => {
    return status?.toLowerCase() !== 'submitted';
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Logbook Harian  
          {lokasiFilter && <span className="text-blue-600 ml-2">({lokasiFilter})</span>}
        </h2>
        <button 
          onClick={handleCreate} 
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium shadow-sm"
        >
          + Buat Logbook Baru
        </button>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="loader"></div>
          <span className="ml-3 text-gray-500">Memuat data...</span>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <div className="text-red-500 text-lg">{error}</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((row) => (
            <div
              key={row.id}
              className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 overflow-hidden ${
                isEditable(row.status) ? 'cursor-pointer' : 'cursor-not-allowed opacity-75'
              }`}
              onClick={() => isEditable(row.status) && handleCardClick(row.id)}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {row.tanggal}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      Shift {row.shift}
                    </p>
                    <p className="text-sm font-medium text-gray-700">
                      {row.lokasi}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(row.status)}`}>
                    {row.status}
                  </span>
                </div>
                
                <div className="space-y-2 mb-4">
                  {row.nama_yg_menyerahkan && (
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Menyerahkan:</span> {row.nama_yg_menyerahkan}
                    </div>
                  )}
                  {row.nama_yg_menerima && (
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Menerima:</span> {row.nama_yg_menerima}
                    </div>
                  )}
                  {row.nama_supervisor && (
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Supervisor:</span> {row.nama_supervisor}
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2 pt-4 border-t border-gray-100">
                  <button
                    onClick={(e) => handlePreview(e, row.id)}
                    className="flex-1 bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors duration-200"
                  >
                    Preview
                  </button>
                  {isEditable(row.status) && (
                    <button
                      onClick={(e) => handleDelete(e, row.id)}
                      className="flex-1 bg-red-50 text-red-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors duration-200"
                    >
                      Hapus
                    </button>
                  )}
                </div>
                
                {!isEditable(row.status) && (
                  <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800">
                    ⚠️ Logbook ini sudah dikirim ke supervisor dan tidak dapat diedit
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {!loading && !error && data.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-2">Tidak ada data logbook</div>
          <p className="text-gray-500">Belum ada logbook harian untuk lokasi ini.</p>
        </div>
      )}
    </div>
  );
};

export default LogbookHarianMasterTable; 