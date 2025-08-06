import React, { useState, useEffect } from 'react';
import { useAuth } from '../../auth/useAuth';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';

const SupervisorSignedReports = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSignedReports = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const supervisorName = auth?.user?.nama_lengkap;
        
        // Use the API endpoint for signed reports
        const response = await axiosInstance.get(`/api/logbook-harian-master/sudah-ttd-supervisor/${encodeURIComponent(supervisorName)}`);
        const data = response.data;
        
        console.log('Signed Reports API Response:', data); // For debugging
        
        // Transform the data to include type information
        const allReports = [];
        
        // Handle case where data is not in expected format
        if (!data || typeof data !== 'object') {
          console.warn('Unexpected data format:', data);
          setReports([]);
          return;
        }
        
        // Process each model type
        Object.keys(data).forEach(modelName => {
          const modelData = data[modelName];
          console.log(`Processing signed ${modelName}:`, modelData); // For debugging
          if (modelData && modelData.laporan && modelData.laporan.length > 0) {
            modelData.laporan.forEach(report => {
              // Map model names to display names
              let displayType = '';
              switch (modelName) {
                case 'logbook_harian_master':
                  displayType = 'Logbook Harian';
                  break;
                case 'behaviour_master':
                  displayType = 'Behaviour';
                  break;
                case 'form_kemajuan_personel_master':
                  displayType = 'Form Kemajuan Personel';
                  break;
                case 'laporan_patroli_random_master':
                  displayType = 'Laporan Patroli Random';
                  break;
                case 'patroli_darat_master':
                  displayType = 'Patroli Darat';
                  break;
                case 'patroli_udara_master':
                  displayType = 'Patroli Udara';
                  break;
                case 'rotasi_personel_master':
                  displayType = 'Rotasi Personel';
                  break;
                case 'suspicious_master':
                  displayType = 'Suspicious';
                  break;
                case 'walking_patrol_master':
                  displayType = 'Walking Patrol';
                  break;
                case 'walking_patrol_non_terminal_master':
                  displayType = 'Walking Patrol Non Terminal';
                  break;
                default:
                  displayType = modelName.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
              }
              
              allReports.push({
                ...report,
                type: displayType,
                modelName: modelName
              });
            });
          }
        });

        console.log('Processed Signed Reports:', allReports); // For debugging
        setReports(allReports);
      } catch (err) {
        console.error('Error fetching signed reports:', err);
        console.error('Error response:', err.response?.data);
        setError(`Gagal mengambil data laporan: ${err.response?.data?.error || err.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (auth?.user?.nama_lengkap) {
      fetchSignedReports();
    }
  }, [auth?.user?.nama_lengkap]);

  const handleReportClick = (report) => {
    // Navigate to the specific report form in preview mode
    switch (report.modelName) {
      case 'logbook_harian_master':
        navigate(`/forms/masters/logbook-harian/preview/${report.id}`);
        break;
      case 'behaviour_master':
        navigate(`/forms/masters/behaviour/preview/${report.id}`);
        break;
      case 'form_kemajuan_personel_master':
        navigate(`/forms/masters/form-kemajuan-personel/preview/${report.id}`);
        break;
      case 'laporan_patroli_random_master':
        navigate(`/forms/masters/laporan-patroli-random/preview/${report.id}`);
        break;
      case 'patroli_darat_master':
        navigate(`/forms/masters/patroli-darat/preview/${report.id}`);
        break;
      case 'patroli_udara_master':
        navigate(`/forms/masters/patroli-udara/preview/${report.id}`);
        break;
      case 'rotasi_personel_master':
        navigate(`/forms/masters/rotasi-personel/preview/${report.id}`);
        break;
      case 'suspicious_master':
        navigate(`/forms/masters/suspicious/preview/${report.id}`);
        break;
      case 'walking_patrol_master':
        navigate(`/forms/masters/walking-patrol/preview/${report.id}`);
        break;
      case 'walking_patrol_non_terminal_master':
        navigate(`/forms/masters/walking-patrol-non-terminal/preview/${report.id}`);
        break;
      default:
        console.log('Unknown report type:', report.modelName);
        alert('Jenis laporan ini belum didukung untuk ditampilkan');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    
    // Handle different date formats
    let date;
    if (typeof dateString === 'string') {
      // Try to parse the date string
      date = new Date(dateString);
      if (isNaN(date.getTime())) {
        // If parsing fails, return the original string
        return dateString;
      }
    } else {
      date = new Date(dateString);
    }
    
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'submitted':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'done':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat laporan...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-2">⚠️</div>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 fade-in p-6">
      <div className="w-full">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Laporan Sudah Ditandatangani</h1>
            <button
              onClick={() => navigate('/dashboard/supervisor')}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Kembali ke Dashboard
            </button>
          </div>
          <p className="text-gray-600">
            Menampilkan laporan yang telah ditandatangani oleh Anda sebagai supervisor
          </p>
        </div>

        {/* Reports Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Jenis Laporan
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Petugas
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lokasi/Pos
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tanggal/Shift
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reports.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                      Tidak ada laporan yang telah ditandatangani
                    </td>
                  </tr>
                ) : (
                  reports.map((report, index) => (
                    <tr 
                      key={`${report.type}-${report.id}`} 
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleReportClick(report)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {report.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {report.nama_petugas || report.nama_yg_menyerahkan || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {report.lokasi || report.pos || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div>
                          <div>{formatDate(report.tanggal)}</div>
                          {report.shift && <div className="text-xs text-gray-500">{report.shift}</div>}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(report.status)}`}>
                          {report.status || 'Completed'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <button className="text-green-600 hover:text-green-900 font-medium">
                          Lihat Laporan
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-6 bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">
            Total laporan yang telah ditandatangani: <span className="font-semibold text-green-600">{reports.length}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SupervisorSignedReports; 