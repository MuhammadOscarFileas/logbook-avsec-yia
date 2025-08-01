import React, { useState, useEffect } from 'react';
import { useAuth } from '../../auth/useAuth';
import { useNavigate } from 'react-router-dom';
import PasswordResetModal from '../PasswordResetModal';

// Mapping lokasi ke jenis logbook sesuai instruksi user
const POS_LOGBOOK_MAP = {
  'Screening': {
    'PSCP': [
      'Logbook Harian',
      'Logbook Rotasi Personel',
      'Pemeriksaan Manual',
      'Penitipan Senjata Api Selain Penumpang',
      'Logbook Explosive Detector',
    ],
    'Level 4': [
      'Logbook Harian',
      'Logbook Rotasi Personel',
    ],
    'HBS': [
      'Logbook Harian',
    ],
    'SCP LAGs': [
      'Logbook Harian',
    ],
    'SCP Transit': [
      'Logbook Harian',
      'Logbook Rotasi Personel',
    ],
    'SSCP': [
      'Logbook Harian',
      'Logbook Rotasi Personel',
      'Logbook Explosive Detector',
      'Form PI',
      'Penitipan Senjata Api Selain Penumpang',
    ],
    'OOG': [
      'Logbook Harian',
      'Logbook Rotasi Personel',
      'Form PI',
      'rekonsiliasi',
      'penitipan senjata api selain penumpang',
  ],
  },
  'Terminal Protection': {
    'Chief Terminal Protection': [
      'Logbook Harian',
      'Kemajuan Personel',
    ],
    'Ruang Tunggu': [
      'Logbook Harian',
      'Logbook Sterilisasi Ruang Tunggu',
  ],
    'Walking Patrol': [
      'Logbook Harian',
      'Walking Patrol Terminal',
    ],
    'Mezzanine Domestik': [
      'Logbook Harian',
    ],
    'Kedatangan Domestik': [
      'Logbook Harian',
  ],
    'Akses Karyawan': [
      'Logbook Harian',
    ],
    'Building Protection': [
      'Logbook Harian',
    ],
    'CCTV': [
      'Logbook Harian',
      'Logbook Penggunaan Smart Door Gate',
      'Daily Check Panic Button',
      'Unattended Baggage',
      'Behavior Form',
      'Suspicious Form',
      'Data Tracking CCTV',
      'Buku Pengunjung CCTV',
    ],
  },
  'Non-Terminal Protection': {
    'Main Gate': [
      'Logbook Harian',
      'Logbook Rotasi Personel',
      'Check List Pemeriksaan Random & Unpredictable',
    ],
    'Chief Non-Terminal': [
      'Logbook Harian',
      'Kemajuan Personel',
    ],
    'Patroli': [
      'Logbook Harian Airside',
      'Logbook Harian Landside',
      'Check List Patroli Airside',
      'Check List Patroli Landside',
      'Logbook Random',
    ],
    'Kargo': [
      'Logbook Harian Kargo Domestik',
      'Logbook Harian Kargo International',
      'Logbook RA',
    ],
    'Walking Patrol': [
      'Logbook Harian',
      'Walking Patrol Landside',
    ],
    'Pos Congot': [
      'Logbook Harian',
    ],
  },
};

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, '-');
}

const OfficerDashboard = () => {
  const { auth } = useAuth();
  const userPos = auth?.user?.pos;
  const lokasiMap = POS_LOGBOOK_MAP[userPos] || {};
  const lokasiList = Object.keys(lokasiMap);
  const [openIndex, setOpenIndex] = useState(null);
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const navigate = useNavigate();

  // Check if user needs to reset password
  useEffect(() => {
    if (auth?.user?.first_login === true) {
      setShowPasswordReset(true);
    }
  }, [auth?.user?.first_login]);

  const handleAccordion = idx => {
    setOpenIndex(idx === openIndex ? null : idx);
  };

  const handlePasswordResetSuccess = () => {
    setShowPasswordReset(false);
    // The auth context is already updated by the modal
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
      <div className="min-h-screen bg-gray-50 fade-in px-2 sm:px-6 py-8">
      <div className="w-full mb-4">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-blue-900">Officer Dashboard</h2>
        <h3 className="text-base sm:text-lg font-medium mb-6 text-gray-600">Pos: <span className="font-semibold text-blue-700">{userPos || '-'}</span></h3>
      </div>
      <div className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {lokasiList.length === 0 && <div className="col-span-full text-gray-400">Tidak ada lokasi untuk pos ini.</div>}
          {lokasiList.map((lokasi, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={lokasi} className="col-span-1">
                <div
                  className={`bg-white shadow-lg border border-gray-200 transition-all duration-300 cursor-pointer ${isOpen ? 'ring-2 ring-blue-300 rounded-xl' : 'rounded-xl'}`}
                  onClick={() => handleAccordion(idx)}
                  style={{ minHeight: 80, borderRadius: '0.75rem' }}
                >
                  <div className="flex items-center justify-between px-6 py-5 rounded-t-xl">
                    <span className={`text-lg sm:text-xl font-semibold text-gray-800 ${isOpen ? 'text-blue-700' : ''}`}>{lokasi}</span>
                    <svg
                      className={`w-6 h-6 text-gray-400 transform transition-transform duration-300 ${isOpen ? 'rotate-90' : 'rotate-0'}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-300 bg-gray-50 ${isOpen ? 'max-h-96 py-2 px-4 rounded-b-xl' : 'max-h-0 py-0 px-4 rounded-b-xl'}`}
                    style={{
                      borderTop: isOpen ? '1px solid #e5e7eb' : 'none',
                      borderBottomLeftRadius: isOpen ? '0.75rem' : '',
                      borderBottomRightRadius: isOpen ? '0.75rem' : '',
                    }}
                  >
                    {isOpen && (
                      <div className="flex flex-col gap-2 mt-2">
                        {lokasiMap[lokasi].map(jenis => (
                          <button
                            key={jenis}
                            onClick={e => {
                              e.stopPropagation();
                              if (jenis === 'Logbook Harian') {
                                navigate(`/forms/masters/logbook-harian?lokasi=${encodeURIComponent(lokasi)}`);
                              } else {
                                navigate(`/form/${slugify(jenis)}`);
                              }
                            }}
                            className="w-full text-left bg-white border border-blue-200 rounded-lg px-4 py-3 font-medium text-gray-700 hover:bg-blue-50 hover:border-blue-400 transition"
                          >
                            {jenis}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
    </>
  );
};

export default OfficerDashboard; 