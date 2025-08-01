import React, { useState, useEffect } from 'react';
import { useAuth } from '../../auth/useAuth';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';

const SupervisorAllReports = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    const fetchAllReports = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch reports where nama_supervisor matches the logged-in supervisor
        const supervisorName = auth?.user?.nama_lengkap;
        
        // Get all logbook harian master reports
        const logbookResponse = await axiosInstance.get('/api/logbook-harian-master/');
        const logbookReports = logbookResponse.data.filter(report => 
          report.nama_supervisor === supervisorName
        );

        // Get all patroli darat master reports
        const patroliDaratResponse = await axiosInstance.get('/api/patroli-darat-master/');
        const patroliDaratReports = patroliDaratResponse.data.filter(report => 
          report.nama_supervisor === supervisorName
        );

        // Get all patroli udara master reports
        const patroliUdaraResponse = await axiosInstance.get('/api/patroli-udara-master/');
        const patroliUdaraReports = patroliUdaraResponse.data.filter(report => 
          report.nama_supervisor === supervisorName
        );

        // Get all walking patrol master reports
        const walkingPatrolResponse = await axiosInstance.get('/api/walking-patrol-master/');
        const walkingPatrolReports = walkingPatrolResponse.data.filter(report => 
          report.nama_supervisor === supervisorName
        );

        // Combine all reports with type information
        const allReports = [
          ...logbookReports.map(report => ({ ...report, type: 'Logbook Harian' })),
          ...patroliDaratReports.map(report => ({ ...report, type: 'Patroli Darat' })),
          ...patroliUdaraReports.map(report => ({ ...report, type: 'Patroli Udara' })),
          ...walkingPatrolReports.map(report => ({ ...report, type: 'Walking Patrol' }))
        ];

        setReports(allReports);
      } catch (err) {
        console.error('Error fetching reports:', err);
        setError('Gagal mengambil data laporan');
      } finally {
        setLoading(false);
      }
    };

    if (auth?.user?.nama_lengkap) {
      fetchAllReports();
    }
  }, [auth?.user?.nama_lengkap]);

  const handleReportClick = (report) => {
    // Navigate to the specific report form based on type
    switch (report.type) {
      case 'Logbook Harian':
        navigate(`/forms/masters/logbook-harian/${report.id}`);
        break;
      case 'Patroli Darat':
        navigate(`/forms/masters/patroli-darat/${report.id}`);
        break;
      case 'Patroli Udara':
        navigate(`/forms/masters/patroli-udara/${report.id}`);
        break;
      case 'Walking Patrol':
        navigate(`/forms/masters/walking-patrol/${report.id}`);
        break;
      default:
        console.log('Unknown report type:', report.type);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
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
      case 'submit to supervisor':
        return 'bg-blue-100 text-blue-800';
      case 'done':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSignatureStatus = (report) => {
    if (!report.ttd_supervisor || report.ttd_supervisor === '') {
      return { text: 'Belum Ditandatangani', color: 'text-red-600' };
    }
    return { text: 'Sudah Ditandatangani', color: 'text-green-600' };
  };

  const filteredReports = filterType === 'all' 
    ? reports 
    : reports.filter(report => report.type === filterType);

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
            <h1 className="text-2xl font-bold text-gray-900">Semua Laporan</h1>
            <button
              onClick={() => navigate('/dashboard/supervisor')}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Kembali ke Dashboard
            </button>
          </div>
          <p className="text-gray-600">
            Menampilkan semua laporan yang terkait dengan Anda sebagai supervisor
          </p>
        </div>

        {/* Filter */}
        <div className="mb-6 bg-white rounded-lg shadow p-4">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">Filter Jenis Laporan:</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Semua Laporan</option>
              <option value="Logbook Harian">Logbook Harian</option>
              <option value="Patroli Darat">Patroli Darat</option>
              <option value="Patroli Udara">Patroli Udara</option>
              <option value="Walking Patrol">Walking Patrol</option>
            </select>
          </div>
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
                    Lokasi
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tanggal
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tanda Tangan
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredReports.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                      Tidak ada laporan yang ditemukan
                    </td>
                  </tr>
                ) : (
                  filteredReports.map((report, index) => {
                    const signatureStatus = getSignatureStatus(report);
                    return (
                      <tr 
                        key={`${report.type}-${report.id}`} 
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleReportClick(report)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {report.type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {report.lokasi || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatDate(report.tanggal)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(report.status)}`}>
                            {report.status || 'Draft'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={signatureStatus.color}>
                            {signatureStatus.text}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <button className="text-blue-600 hover:text-blue-900 font-medium">
                            Lihat Detail
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-6 bg-white rounded-lg shadow p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-600">
                Total laporan: <span className="font-semibold text-blue-600">{reports.length}</span>
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">
                Belum ditandatangani: <span className="font-semibold text-red-600">
                  {reports.filter(r => !r.ttd_supervisor || r.ttd_supervisor === '').length}
                </span>
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">
                Sudah ditandatangani: <span className="font-semibold text-green-600">
                  {reports.filter(r => r.ttd_supervisor && r.ttd_supervisor !== '').length}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupervisorAllReports; 