import React, { useState, useEffect } from 'react';
import { useAuth } from '../../auth/useAuth';
import { useNavigate } from 'react-router-dom';
import PasswordResetModal from '../PasswordResetModal';

const SupervisorDashboard = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [showPasswordReset, setShowPasswordReset] = useState(false);

  // Check if user needs to reset password
  useEffect(() => {
    if (auth?.user?.first_login === true) {
      setShowPasswordReset(true);
    }
  }, [auth?.user?.first_login]);

  const handlePasswordResetSuccess = () => {
    setShowPasswordReset(false);
    // The auth context is already updated by the modal
  };

  const handleLaporanClick = () => {
    // Navigate to reports page
    navigate('/supervisor/laporan');
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
            {/* Card Laporan */}
            <div 
              className="bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow duration-300"
              onClick={handleLaporanClick}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Laporan</h3>
                  <p className="text-gray-600">Lihat semua laporan yang tersedia</p>
                </div>
                <div className="text-blue-600">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
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
                  <p className="text-gray-600">Laporan yang menunggu tanda tangan Anda</p>
                </div>
                <div className="text-orange-600">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
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