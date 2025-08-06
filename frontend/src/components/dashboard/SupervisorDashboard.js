import React, { useState, useEffect } from 'react';
import { useAuth } from '../../auth/useAuth';
import { useNavigate } from 'react-router-dom';
import PasswordResetModal from '../PasswordResetModal';
import axiosInstance from '../../api/axiosInstance';

const SupervisorDashboard = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [unsignedCount, setUnsignedCount] = useState(0);
  const [signedCount, setSignedCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Check if user needs to reset password
  useEffect(() => {
    if (auth?.user?.first_login === true) {
      setShowPasswordReset(true);
    }
  }, [auth?.user?.first_login]);

  // Fetch counts for dashboard
  useEffect(() => {
    const fetchCounts = async () => {
      if (!auth?.user?.nama_lengkap) return;
      
      try {
        setLoading(true);
        const supervisorName = encodeURIComponent(auth.user.nama_lengkap);
        
        // Fetch unsigned reports count
        const unsignedResponse = await axiosInstance.get(`/api/logbook-harian-master/count-belum-ttd-supervisor/${supervisorName}`);
        setUnsignedCount(unsignedResponse.data.total || 0);
        
        // Fetch signed reports count
        const signedResponse = await axiosInstance.get(`/api/logbook-harian-master/sudah-ttd-supervisor/${supervisorName}`);
        setSignedCount(signedResponse.data.total || 0);
      } catch (err) {
        console.error('Error fetching counts:', err);
        // Set default values on error
        setUnsignedCount(0);
        setSignedCount(0);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, [auth?.user?.nama_lengkap]);

  const handlePasswordResetSuccess = () => {
    setShowPasswordReset(false);
    // The auth context is already updated by the modal
  };

  const handleLaporanClick = () => {
    // Navigate to signed reports page
    navigate('/supervisor/laporan-sudah-ditandatangani');
  };

  const handleBelumDitandatanganiClick = () => {
    // Navigate to unsigned reports page
    navigate('/supervisor/belum-ditandatangani');
  };

  return (
    <>
      {showPasswordReset && auth?.user && (
        <PasswordResetModal
          user={auth.user}
          onSuccess={handlePasswordResetSuccess}
          onClose={() => setShowPasswordReset(false)}
        />
      )}
      <div className="min-h-screen bg-gray-50 fade-in p-6">
        <div className="w-full">
          {/* Baris 1: Selamat Datang */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Selamat Datang, {auth?.user?.nama_lengkap || 'Supervisor'}!
            </h1>
            <p className="text-gray-600">Kelola laporan dan tanda tangan sebagai supervisor</p>
          </div>

          {/* Baris 2: 2 Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card Laporan Sudah Ditandatangani */}
            <div 
              className="bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow duration-300"
              onClick={handleLaporanClick}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Laporan Sudah Ditandatangani</h3>
                  <p className="text-gray-600">
                    {loading ? 'Memuat...' : `${signedCount} laporan telah ditandatangani`}
                  </p>
                </div>
                <div className="text-green-600 relative">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Card Belum Ditandatangani */}
            <div 
              className="bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow duration-300"
              onClick={handleBelumDitandatanganiClick}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Belum Ditandatangani</h3>
                  <p className="text-gray-600">
                    {loading ? 'Memuat...' : `${unsignedCount} laporan menunggu tanda tangan`}
                  </p>
                </div>
                <div className="text-orange-600 relative">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  {/* Notification Badge */}
                  {unsignedCount > 0 && (
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold">
                      {unsignedCount > 99 ? '99+' : unsignedCount}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SupervisorDashboard; 