import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import { useAuth } from '../../auth/useAuth';
import SignaturePad from '../../components/SignaturePad';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

// Searchable Dropdown Component
const SearchableDropdown = ({ 
  options, 
  value, 
  onChange, 
  placeholder, 
  required = false,
  className = "",
  disabled = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);

  useEffect(() => {
    const filtered = options.filter(option =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOptions(filtered);
  }, [searchTerm, options]);

  const handleSelect = (option) => {
    onChange(option.value);
    setSearchTerm('');
    setIsOpen(false);
  };

  const selectedOption = options.find(option => option.value === value);

  return (
    <div className={`relative ${className}`}>
      <div
        className={`w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 h-10 flex items-center ${
          disabled ? 'cursor-not-allowed bg-gray-100' : 'cursor-pointer bg-white'
        }`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <div className="flex justify-between items-center">
          <span className={selectedOption ? 'text-gray-900' : 'text-gray-500'}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7 7" />
          </svg>
        </div>
      </div>
      
      {isOpen && !disabled && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          <div className="p-2 border-b border-gray-200">
            <input
              type="text"
              placeholder="Cari..."
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div className="max-h-48 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                  onClick={() => handleSelect(option)}
                >
                  {option.label}
                </div>
              ))
            ) : (
              <div className="px-3 py-2 text-gray-500 text-sm">Tidak ada hasil</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const LogbookHarianMasterForm = ({ previewMode = false }) => {
  const navigate = useNavigate();
  const query = useQuery();
  const { id } = useParams(); // Get ID from URL for edit mode
  const lokasi = query.get('lokasi') || '';
  const { auth } = useAuth();
  const isEditMode = !!id;
  const isPreviewMode = previewMode;

  // Form state
  const [formData, setFormData] = useState({
    tanggal: '',
    shift: '',
    lokasi: lokasi,
    nama_yg_menyerahkan: '',
    ttd_yg_menyerahkan: '',
    nama_yg_menerima: '',
    ttd_yg_menerima: '',
    nama_supervisor: '',
    ttd_supervisor: '',
    status: 'draft'
  });

  const [uraianTugas, setUraianTugas] = useState([{ jam_mulai: '', jam_akhir: '', uraian_tugas: '', keterangan: '' }]);
  const [uraianInventaris, setUraianInventaris] = useState([{ nama_inventaris: '', jumlah: '' }]);
  const [existingTugasIds, setExistingTugasIds] = useState([]);
  const [existingInventarisIds, setExistingInventarisIds] = useState([]);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(isEditMode);
  const [error, setError] = useState(null);

  // Load users for dropdowns
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await axiosInstance.get('/api/users');
        setUsers(response.data.filter(user => user.role === 'officer' || user.role === 'supervisor'));
      } catch (err) {
        console.error('Failed to load users:', err);
      }
    };
    loadUsers();
  }, []);

  // Auto-fill supervisor based on officer's pos and shift
  useEffect(() => {
    if (auth?.user && users.length > 0) {
      const currentUser = auth.user;
      const matchingSupervisors = users.filter(user => 
        user.role === 'supervisor' && 
        user.pos === currentUser.pos && 
        user.shift === currentUser.shift
      );
      
      if (matchingSupervisors.length > 0 && !formData.nama_supervisor) {
        // Auto-fill with the first matching supervisor
        setFormData(prev => ({
          ...prev,
          nama_supervisor: matchingSupervisors[0].nama_lengkap
        }));
      }
    }
  }, [auth?.user, users, formData.nama_supervisor]);

  // Load existing data for edit mode
  useEffect(() => {
    if (isEditMode && id) {
      const loadLogbookData = async () => {
        try {
          setDataLoading(true);
          const response = await axiosInstance.get(`/api/logbook-harian-master/detail/${id}`);
          const logbookData = response.data;
          
          setFormData({
            tanggal: logbookData.tanggal || '',
            shift: logbookData.shift || '',
            lokasi: logbookData.lokasi || lokasi,
            nama_yg_menyerahkan: logbookData.nama_yg_menyerahkan || '',
            ttd_yg_menyerahkan: logbookData.ttd_yg_menyerahkan || '',
            nama_yg_menerima: logbookData.nama_yg_menerima || '',
            ttd_yg_menerima: logbookData.ttd_yg_menerima || '',
            nama_supervisor: logbookData.nama_supervisor || '',
            ttd_supervisor: logbookData.ttd_supervisor || '',
            status: logbookData.status || 'draft'
          });

          // Load uraian tugas from the detail response
          if (logbookData.uraian_tugas_list && logbookData.uraian_tugas_list.length > 0) {
            setUraianTugas(logbookData.uraian_tugas_list.map(tugas => ({
              id: tugas.id, // Assuming 'id' is available in the response
              jam_mulai: tugas.jam_mulai || '',
              jam_akhir: tugas.jam_akhir || '',
              uraian_tugas: tugas.uraian_tugas || '',
              keterangan: tugas.keterangan || ''
            })));
            setExistingTugasIds(logbookData.uraian_tugas_list.map(tugas => tugas.id));
          } else {
            setUraianTugas([{ jam_mulai: '', jam_akhir: '', uraian_tugas: '', keterangan: '' }]);
            setExistingTugasIds([]);
          }

          // Load uraian inventaris from the detail response
          if (logbookData.uraian_inventaris_list && logbookData.uraian_inventaris_list.length > 0) {
            setUraianInventaris(logbookData.uraian_inventaris_list.map(inv => ({
              id: inv.id, // Assuming 'id' is available in the response
              nama_inventaris: inv.nama_inventaris || '',
              jumlah: inv.jumlah || ''
            })));
            setExistingInventarisIds(logbookData.uraian_inventaris_list.map(inv => inv.id));
          } else {
            setUraianInventaris([{ nama_inventaris: '', jumlah: '' }]);
            setExistingInventarisIds([]);
          }
        } catch (err) {
          setError('Gagal memuat data logbook');
          console.error('Failed to load logbook data:', err);
        } finally {
          setDataLoading(false);
        }
      };
      loadLogbookData();
    } else {
      // Set nama_yg_menyerahkan from current user for create mode
    if (auth?.user?.nama_lengkap) {
        setFormData(prev => ({
          ...prev,
          nama_yg_menyerahkan: auth.user.nama_lengkap
        }));
      }
    }
  }, [id, isEditMode, auth, lokasi]);

  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddTugas = () => {
    setUraianTugas([...uraianTugas, { jam_mulai: '', jam_akhir: '', uraian_tugas: '', keterangan: '' }]);
  };

  const handleTugasChange = (idx, field, value) => {
    const newTugas = [...uraianTugas];
    newTugas[idx][field] = value;
    setUraianTugas(newTugas);
  };

  const handleRemoveTugas = async (idx) => {
    const removedTugas = uraianTugas[idx];
    if (removedTugas.id) {
      // If it's an existing record, delete it immediately from the backend
      try {
        await axiosInstance.delete(`/api/logbook-harian-master/uraian-tugas/${removedTugas.id}`);
        console.log(`Deleted tugas ID: ${removedTugas.id}`);
      } catch (err) {
        console.error('Failed to delete tugas:', err);
        setError('Gagal menghapus uraian tugas');
      }
    }
    setUraianTugas(uraianTugas.filter((_, i) => i !== idx));
  };

  const handleAddInventaris = () => {
    setUraianInventaris([...uraianInventaris, { nama_inventaris: '', jumlah: '' }]);
  };

  const handleInventarisChange = (idx, field, value) => {
    const newInv = [...uraianInventaris];
    newInv[idx][field] = value;
    setUraianInventaris(newInv);
  };

  const handleRemoveInventaris = async (idx) => {
    const removedInventaris = uraianInventaris[idx];
    if (removedInventaris.id) {
      // If it's an existing record, delete it immediately from the backend
      try {
        await axiosInstance.delete(`/api/logbook-harian-master/uraian-inventaris/${removedInventaris.id}`);
        console.log(`Deleted inventaris ID: ${removedInventaris.id}`);
      } catch (err) {
        console.error('Failed to delete inventaris:', err);
        setError('Gagal menghapus uraian inventaris');
      }
    }
    setUraianInventaris(uraianInventaris.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validate supervisor selection
    if (!formData.nama_supervisor) {
      setError('Supervisor harus dipilih sebelum menyimpan logbook');
      setLoading(false);
      return;
    }

    try {
      if (isEditMode) {
        console.log('Starting edit mode update...');
        
        // 1. Update existing logbook
        console.log('Updating main logbook...');
        const logbookResponse = await axiosInstance.put(`/api/logbook-harian-master/${id}`, formData);
        console.log('Logbook updated successfully:', logbookResponse.data);
        
        // 2. Handle uraian tugas: update existing, add new
        console.log('Processing uraian tugas...');
        
        // Update existing and create new uraian tugas
        for (const tugas of uraianTugas) {
          if (tugas.id) {
            // Update existing record
            console.log(`Updating existing tugas ID: ${tugas.id}`);
            await axiosInstance.put(`/api/logbook-harian-master/uraian-tugas/${tugas.id}`, {
              jam_mulai: tugas.jam_mulai,
              jam_akhir: tugas.jam_akhir,
              uraian_tugas: tugas.uraian_tugas,
              keterangan: tugas.keterangan
            });
          } else if (tugas.uraian_tugas.trim()) {
            // Create new record
            console.log('Creating new tugas record');
            await axiosInstance.post('/api/logbook-harian-master/uraian-tugas/', {
              jam_mulai: tugas.jam_mulai,
              jam_akhir: tugas.jam_akhir,
              uraian_tugas: tugas.uraian_tugas,
              keterangan: tugas.keterangan,
              logbook_harian_master_id: id,
            });
          }
        }

        // 3. Handle uraian inventaris: update existing, add new
        console.log('Processing uraian inventaris...');
        
        // Update existing and create new uraian inventaris
        for (const inv of uraianInventaris) {
          if (inv.id) {
            // Update existing record
            console.log(`Updating existing inventaris ID: ${inv.id}`);
            await axiosInstance.put(`/api/logbook-harian-master/uraian-inventaris/${inv.id}`, {
              nama_inventaris: inv.nama_inventaris,
              jumlah: inv.jumlah
            });
          } else if (inv.nama_inventaris.trim()) {
            // Create new record
            console.log('Creating new inventaris record');
            await axiosInstance.post('/api/logbook-harian-master/uraian-inventaris/', {
              nama_inventaris: inv.nama_inventaris,
              jumlah: inv.jumlah,
              logbook_harian_master_id: id,
            });
          }
        }
        
        console.log('All updates completed successfully');
      } else {
        console.log('Starting create mode...');
        // Create new logbook
        const res = await axiosInstance.post('/api/logbook-harian-master/', formData);
        const masterId = res.data.id;
        console.log('New logbook created with ID:', masterId);

        // Create uraian tugas
        for (const tugas of uraianTugas) {
          if (tugas.uraian_tugas.trim()) { // Only save if uraian_tugas is not empty
            await axiosInstance.post('/api/logbook-harian-master/uraian-tugas/', {
              ...tugas,
              logbook_harian_master_id: masterId,
            });
          }
        }

        // Create uraian inventaris
        for (const inv of uraianInventaris) {
          if (inv.nama_inventaris.trim()) { // Only save if nama_inventaris is not empty
            await axiosInstance.post('/api/logbook-harian-master/uraian-inventaris/', {
              ...inv,
              logbook_harian_master_id: masterId,
            });
          }
        }
      }

      navigate(`/forms/masters/logbook-harian?lokasi=${encodeURIComponent(formData.lokasi)}`);
    } catch (err) {
      console.error('Detailed error:', err);
      console.error('Error response:', err.response?.data);
      console.error('Error status:', err.response?.status);
      setError(`Gagal menyimpan data: ${err.response?.data?.error || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitToSupervisor = async () => {
    setLoading(true);
    setError(null);

    // Validate supervisor selection
    if (!formData.nama_supervisor) {
      setError('Supervisor harus dipilih sebelum mengirim ke supervisor');
      setLoading(false);
      return;
    }

    try {
      // Update status to submitted
      const updatedFormData = { ...formData, status: 'submitted' };
      
      if (isEditMode) {
        console.log('Starting edit mode submit to supervisor...');
        
        // 1. Update existing logbook
        console.log('Updating main logbook with submitted status...');
        const logbookResponse = await axiosInstance.put(`/api/logbook-harian-master/${id}`, updatedFormData);
        console.log('Logbook updated successfully:', logbookResponse.data);
        
        // 2. Handle uraian tugas: update existing, add new
        console.log('Processing uraian tugas...');
        
        // Update existing and create new uraian tugas
        for (const tugas of uraianTugas) {
          if (tugas.id) {
            // Update existing record
            console.log(`Updating existing tugas ID: ${tugas.id}`);
            await axiosInstance.put(`/api/logbook-harian-master/uraian-tugas/${tugas.id}`, {
              jam_mulai: tugas.jam_mulai,
              jam_akhir: tugas.jam_akhir,
              uraian_tugas: tugas.uraian_tugas,
              keterangan: tugas.keterangan
            });
          } else if (tugas.uraian_tugas.trim()) {
            // Create new record
            console.log('Creating new tugas record');
            await axiosInstance.post('/api/logbook-harian-master/uraian-tugas/', {
              jam_mulai: tugas.jam_mulai,
              jam_akhir: tugas.jam_akhir,
              uraian_tugas: tugas.uraian_tugas,
              keterangan: tugas.keterangan,
              logbook_harian_master_id: id,
            });
          }
        }

        // 3. Handle uraian inventaris: update existing, add new
        console.log('Processing uraian inventaris...');
        
        // Update existing and create new uraian inventaris
        for (const inv of uraianInventaris) {
          if (inv.id) {
            // Update existing record
            console.log(`Updating existing inventaris ID: ${inv.id}`);
            await axiosInstance.put(`/api/logbook-harian-master/uraian-inventaris/${inv.id}`, {
              nama_inventaris: inv.nama_inventaris,
              jumlah: inv.jumlah
            });
          } else if (inv.nama_inventaris.trim()) {
            // Create new record
            console.log('Creating new inventaris record');
            await axiosInstance.post('/api/logbook-harian-master/uraian-inventaris/', {
              nama_inventaris: inv.nama_inventaris,
              jumlah: inv.jumlah,
              logbook_harian_master_id: id,
            });
          }
        }
        
        console.log('All updates completed successfully');
      } else {
        console.log('Starting create mode with submitted status...');
        // Create new logbook with submitted status
        const res = await axiosInstance.post('/api/logbook-harian-master/', updatedFormData);
      const masterId = res.data.id;
        console.log('New logbook created with ID:', masterId);

        // Create uraian tugas
      for (const tugas of uraianTugas) {
          if (tugas.uraian_tugas.trim()) { // Only save if uraian_tugas is not empty
            await axiosInstance.post('/api/logbook-harian-master/uraian-tugas/', {
          ...tugas,
          logbook_harian_master_id: masterId,
        });
      }
        }

        // Create uraian inventaris
      for (const inv of uraianInventaris) {
          if (inv.nama_inventaris.trim()) { // Only save if nama_inventaris is not empty
            await axiosInstance.post('/api/logbook-harian-master/uraian-inventaris/', {
          ...inv,
          logbook_harian_master_id: masterId,
        });
      }
        }
      }

      navigate(`/forms/masters/logbook-harian?lokasi=${encodeURIComponent(formData.lokasi)}`);
    } catch (err) {
      console.error('Detailed error:', err);
      console.error('Error response:', err.response?.data);
      console.error('Error status:', err.response?.status);
      setError(`Gagal mengirim ke supervisor: ${err.response?.data?.error || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (dataLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="loader"></div>
          <p className="mt-4 text-gray-600">Memuat data logbook...</p>
        </div>
      </div>
    );
  }

  // Filter out current user from nama_yg_menerima dropdown and only show officers
  const availableOfficers = users.filter(user => 
    user.nama_lengkap !== auth?.user?.nama_lengkap && user.role === 'officer'
  );
  
  // Filter supervisors for supervisor dropdown - show all supervisors
  const availableSupervisors = users.filter(user => user.role === 'supervisor');

  // Convert to options format for SearchableDropdown
  const officerOptions = availableOfficers.map(user => ({
    value: user.nama_lengkap,
    label: user.nama_lengkap
  }));

  const supervisorOptions = availableSupervisors.map(user => ({
    value: user.nama_lengkap,
    label: user.nama_lengkap
  }));

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="w-full h-full">
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 h-full">
          <div className="flex items-center justify-between mb-6">
        <button
          type="button"
              className="text-blue-600 hover:underline flex items-center"
          onClick={() => navigate(`/forms/masters/logbook-harian?lokasi=${encodeURIComponent(formData.lokasi)}`)}
        >
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
          Kembali
        </button>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              {isPreviewMode ? 'Preview Logbook Harian' : isEditMode ? 'Edit Logbook Harian' : 'Buat Logbook Harian Baru'}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 h-full">
            {/* Basic Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal</label>
                <input 
                  type="date" 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  value={formData.tanggal} 
                  onChange={e => handleFormChange('tanggal', e.target.value)} 
                  required 
                  disabled={isPreviewMode}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Shift</label>
                <select 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  value={formData.shift} 
                  onChange={e => handleFormChange('shift', e.target.value)} 
                  required
                  disabled={isPreviewMode}
                >
                  <option value="">Pilih Shift</option>
                  <option value="Pagi">Pagi</option>
                  <option value="Siang">Siang</option>
                  <option value="Malam">Malam</option>
                </select>
              </div>
              <div className="sm:col-span-2 lg:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Lokasi</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100" 
                  value={formData.lokasi} 
                  readOnly 
                  disabled={isPreviewMode}
                />
              </div>
            </div>

            {/* Uraian Tugas */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">Uraian Tugas</label>
              <div className="space-y-3">
                {uraianTugas.map((row, idx) => (
                  <div key={idx} className="flex gap-3 items-start p-3 sm:p-4 border border-gray-200 rounded-lg">
                    <span className="w-6 sm:w-8 text-center text-gray-500 font-medium pt-2 text-sm">{idx + 1}</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-8 gap-2 sm:gap-3 flex-1">
                      <div className="sm:col-span-1 lg:col-span-1">
                        <label className="block text-xs text-gray-600 mb-1">Jam Mulai</label>
                        <input 
                          type="time" 
                          className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" 
                          value={row.jam_mulai} 
                          onChange={e => handleTugasChange(idx, 'jam_mulai', e.target.value)} 
                          required 
                          disabled={isPreviewMode}
                        />
                      </div>
                      <div className="sm:col-span-1 lg:col-span-1">
                        <label className="block text-xs text-gray-600 mb-1">Jam Selesai</label>
                        <input 
                          type="time" 
                          className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" 
                          value={row.jam_akhir} 
                          onChange={e => handleTugasChange(idx, 'jam_akhir', e.target.value)} 
                          required 
                          disabled={isPreviewMode}
                        />
                      </div>
                      <div className="sm:col-span-2 lg:col-span-4">
                        <label className="block text-xs text-gray-600 mb-1">Uraian Tugas</label>
                        <textarea 
                          className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none" 
                          style={{ height: '32px', minHeight: '32px' }}
                          value={row.uraian_tugas} 
                          onChange={e => handleTugasChange(idx, 'uraian_tugas', e.target.value)} 
                          required 
                          disabled={isPreviewMode}
                        />
                      </div>
                      <div className="sm:col-span-2 lg:col-span-2">
                        <label className="block text-xs text-gray-600 mb-1">Keterangan</label>
                        <input 
                          type="text" 
                          className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" 
                          value={row.keterangan} 
                          onChange={e => handleTugasChange(idx, 'keterangan', e.target.value)} 
                          disabled={isPreviewMode}
                        />
                      </div>
                    </div>
                    {uraianTugas.length > 1 && !isPreviewMode && (
                      <button 
                        type="button" 
                        className="text-red-500 hover:text-red-700 mt-2 sm:mt-6" 
                        onClick={() => handleRemoveTugas(idx)}
                      >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
                {!isPreviewMode && (
                  <button 
                    type="button" 
                    className="text-blue-600 font-medium hover:text-blue-700" 
                    onClick={handleAddTugas}
                  >
                    + Tambah Tugas
                  </button>
                )}
              </div>
            </div>

            {/* Uraian Inventaris */}
          <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">Uraian Inventaris</label>
              <div className="space-y-3">
              {uraianInventaris.map((row, idx) => (
                  <div key={idx} className="flex gap-3 items-center p-3 sm:p-4 border border-gray-200 rounded-lg">
                    <span className="w-6 sm:w-8 text-center text-gray-500 font-medium text-sm">{idx + 1}</span>
                    <div className="flex-1">
                      <label className="block text-xs text-gray-600 mb-1">Nama Inventaris</label>
                      <input 
                        type="text" 
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" 
                        value={row.nama_inventaris} 
                        onChange={e => handleInventarisChange(idx, 'nama_inventaris', e.target.value)}  
                        disabled={isPreviewMode}
                      />
                    </div>
                    <div className="w-20 sm:w-24">
                      <label className="block text-xs text-gray-600 mb-1">Jumlah</label>
                      <input 
                        type="number" 
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" 
                        value={row.jumlah} 
                        onChange={e => handleInventarisChange(idx, 'jumlah', e.target.value)} 
                        disabled={isPreviewMode}
                      />
                    </div>
                  {uraianInventaris.length > 1 && !isPreviewMode && (
                      <button 
                        type="button" 
                        className="text-red-500 hover:text-red-700" 
                        onClick={() => handleRemoveInventaris(idx)}
                      >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                  )}
                </div>
              ))}
                {!isPreviewMode && (
                  <button 
                    type="button" 
                    className="text-blue-600 font-medium hover:text-blue-700" 
                    onClick={handleAddInventaris}
                  >
                    + Tambah Inventaris
                  </button>
                )}
              </div>
            </div>

            {/* Signatures */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 items-stretch">
              {/* Menyerahkan */}
              <div className="flex flex-col h-full min-h-[200px]">
                <label className="block text-sm font-medium text-gray-700 mb-2">Yang Menyerahkan</label>
                <div className="flex-1 flex flex-col justify-start">
                  <input 
                    type="text" 
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 mb-3 h-10 flex items-center" 
                    value={formData.nama_yg_menyerahkan} 
                    readOnly 
                    disabled={isPreviewMode}
                  />
                  <div className="flex-1 min-h-[160px]">
                    <SignaturePad
                      onSignatureChange={(signature) => handleFormChange('ttd_yg_menyerahkan', signature)}
                      defaultValue={formData.ttd_yg_menyerahkan}
                      placeholder="Tanda tangan yang menyerahkan"
                      disabled={isPreviewMode}
                    />
                  </div>
                </div>
              </div>

              {/* Menerima */}
              <div className="flex flex-col h-full min-h-[200px]">
                <label className="block text-sm font-medium text-gray-700 mb-2">Yang Menerima</label>
                <div className="flex-1 flex flex-col justify-start">
                  <SearchableDropdown
                    options={officerOptions}
                    value={formData.nama_yg_menerima}
                    onChange={(value) => handleFormChange('nama_yg_menerima', value)}
                    placeholder="Pilih nama yang menerima"
                    required={true}
                    className="mb-3"
                    disabled={isPreviewMode}
                  />
                  <div className="flex-1 min-h-[160px]">
                    <SignaturePad
                      onSignatureChange={(signature) => handleFormChange('ttd_yg_menerima', signature)}
                      defaultValue={formData.ttd_yg_menerima}
                      placeholder="Tanda tangan yang menerima"
                      disabled={isPreviewMode}
                    />
                  </div>
                </div>
              </div>

              {/* Supervisor */}
              <div className="sm:col-span-2 lg:col-span-1 flex flex-col h-full min-h-[200px]">
                <label className="block text-sm font-medium text-gray-700 mb-2">Supervisor</label>
                <div className="flex-1 flex flex-col justify-start">
                  <SearchableDropdown
                    options={supervisorOptions}
                    value={formData.nama_supervisor}
                    onChange={(value) => handleFormChange('nama_supervisor', value)}
                    placeholder="Pilih supervisor"
                    required={true}
                    className="mb-3"
                    disabled={isPreviewMode}
                  />
                  <div className="flex-1 min-h-[160px]">
                    <SignaturePad
                      onSignatureChange={(signature) => handleFormChange('ttd_supervisor', signature)}
                      defaultValue={formData.ttd_supervisor}
                      placeholder="Tanda tangan supervisor"
                      disabled={isPreviewMode}
                    />
                  </div>
                  {formData.nama_supervisor && (
                    <div className="text-xs text-green-600 bg-green-50 border border-green-200 rounded px-2 py-1 mt-2 flex-shrink-0">
                      ✓ Supervisor dengan pos dan shift yang sama diprioritaskan
                    </div>
                  )}
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
          </div>
            )}

            {!isPreviewMode && (
              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-gray-200">
                <button 
                  type="submit" 
                  className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50" 
                  disabled={loading}
                >
                  {loading ? 'Menyimpan...' : (isEditMode ? 'Update Logbook' : 'Simpan Logbook')}
                </button>
                <button 
                  type="button"
                  onClick={handleSubmitToSupervisor}
                  className="w-full sm:w-auto bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-medium disabled:opacity-50" 
                  disabled={loading}
                >
                  {loading ? 'Mengirim...' : 'Kirim ke Supervisor'}
                </button>
              </div>
            )}
        </form>
        </div>
      </div>
    </div>
  );
};

export default LogbookHarianMasterForm; 