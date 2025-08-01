import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { useAuth } from '../../auth/useAuth';
import PasswordResetModal from '../PasswordResetModal';

const POS_OPTIONS = [
  { value: 'Terminal Protection', label: 'Terminal Protection' },
  { value: 'Non-Terminal Protection', label: 'Non-Terminal Protection' },
  { value: 'Screening', label: 'Screening' },
];

// Function to generate random 8-character password
const generatePassword = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let password = '';
  for (let i = 0; i < 8; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

const PegawaiList = ({ onRegister, refresh }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [notif, setNotif] = useState(null);
  const [resetPasswords, setResetPasswords] = useState({});

  useEffect(() => {
    setLoading(true);
    axiosInstance.get('/api/users')
      .then(res => {
        setUsers(res.data.filter(u => u.role === 'officer' || u.role === 'supervisor'));
        setError(null);
      })
      .catch(err => setError('Gagal mengambil data user'))
      .finally(() => setLoading(false));
  }, [refresh, notif]);

  const handleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
    setEditUser(null);
    setNotif(null);
  };

  const handleEdit = (user) => {
    setEditUser({ ...user });
    setNotif(null);
  };

  const handleEditChange = (e) => {
    setEditUser({ ...editUser, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await axiosInstance.put(`/api/users/${editUser.user_id}`, editUser);
      setNotif({ type: 'success', msg: 'Data user berhasil diupdate' });
      setEditUser(null);
    } catch (err) {
      setNotif({ type: 'error', msg: err.response?.data?.error || 'Gagal update user' });
    }
  };

  const handleDelete = async (user_id) => {
    if (!window.confirm('Yakin hapus user ini?')) return;
    try {
      await axiosInstance.delete(`/api/users/${user_id}`);
      setNotif({ type: 'success', msg: 'User dihapus' });
      setExpanded(null);
      // Refresh the user list
      setUsers(users.filter(user => user.user_id !== user_id));
    } catch (err) {
      setNotif({ type: 'error', msg: err.response?.data?.error || 'Gagal hapus user' });
    }
  };

  const handleResetPassword = async (user_id) => {
    try {
      const newPassword = generatePassword();
      const res = await axiosInstance.put(`/api/users/${user_id}`, {
        password: newPassword,
        first_login: true
      });
      setNotif({ type: 'success', msg: `Password baru: ${newPassword}` });
      setResetPasswords(prev => ({ ...prev, [user_id]: newPassword }));
    } catch (err) {
      setNotif({ type: 'error', msg: err.response?.data?.error || 'Gagal reset password' });
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'supervisor':
        return 'bg-purple-100 text-purple-800';
      case 'officer':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="mx-auto bg-white rounded-lg shadow-lg p-6 fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Daftar Pegawai</h2>
        <button 
          onClick={onRegister} 
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium shadow-sm"
        >
          + Register User
        </button>
      </div>
      
      {notif && (
        <div className={`mb-4 p-4 rounded-lg text-sm font-medium ${
          notif.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {notif.msg}
        </div>
      )}
      
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="loader"></div>
          <span className="ml-3 text-gray-500">Memuat data...</span>
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map(user => (
          <div key={user.user_id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 relative">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {user.nama_lengkap}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {user.email}
                  </p>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                    {user.pos && (
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {user.pos}
                      </span>
                    )}
                  </div>
                  {user.lokasi && (
                    <p className="text-xs text-gray-500">
                      Lokasi: {user.lokasi}
                    </p>
                  )}
                </div>
                <button 
                  onClick={() => handleExpand(user.user_id)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className={`w-5 h-5 transition-transform ${expanded === user.user_id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
              
              {expanded === user.user_id && (
                <div className="absolute top-full left-0 right-0 z-50 bg-white border border-gray-200 rounded-lg shadow-lg mt-2 p-4">
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Role</label>
                      <select 
                        name="role" 
                        value={(editUser && editUser.user_id === user.user_id ? editUser.role : user.role)} 
                        onChange={e => setEditUser({ ...(editUser && editUser.user_id === user.user_id ? editUser : user), role: e.target.value, user_id: user.user_id })} 
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="officer">Officer</option>
                        <option value="supervisor">Supervisor</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Pos</label>
                      <select 
                        name="pos" 
                        value={(editUser && editUser.user_id === user.user_id ? editUser.pos : user.pos)} 
                        onChange={e => setEditUser({ ...(editUser && editUser.user_id === user.user_id ? editUser : user), pos: e.target.value, user_id: user.user_id })} 
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {POS_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Password</label>
                      <input 
                        name="password" 
                        value={
                          resetPasswords[user.user_id] 
                            ? resetPasswords[user.user_id] 
                            : user.first_login === true 
                              ? user.password 
                              : '••••••••'
                        } 
                        readOnly 
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-600" 
                      />
                    </div>
                    <div className="flex gap-2 pt-2">
                      <button 
                        onClick={() => handleSave()} 
                        className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                      >
                        Simpan
                      </button>
                      <button 
                        onClick={() => handleResetPassword(user.user_id)} 
                        className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                      >
                        Reset Password
                      </button>
                      <button 
                        onClick={() => { if(window.confirm('Yakin hapus user ini?')) handleDelete(user.user_id); }} 
                        className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const RegisterUserForm = ({ onBack, onSuccess }) => {
  const [form, setForm] = useState({
    nama_lengkap: '',
    email: '',
    role: 'officer',
    pos: 'Terminal Protection',
    lokasi: '',
  });
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notif, setNotif] = useState(null);

  // Generate password on component mount
  useEffect(() => {
    setGeneratedPassword(generatePassword());
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setNotif(null);
    try {
      const formWithPassword = { ...form, password: generatedPassword, first_login: true };
      
      const res = await axiosInstance.post('/api/users/register', formWithPassword);
      setNotif({ type: 'success', msg: `User berhasil dibuat. Password: ${generatedPassword}` });
      setForm({ nama_lengkap: '', email: '', role: 'officer', pos: 'Terminal Protection', lokasi: '' });
      setGeneratedPassword(generatePassword());
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.error || 'Gagal register user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 fade-in">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Register User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
          <input 
            name="nama_lengkap" 
            placeholder="Nama Lengkap" 
            value={form.nama_lengkap} 
            onChange={handleChange} 
            required 
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input 
            name="email" 
            placeholder="Email" 
            value={form.email} 
            onChange={handleChange} 
            required 
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
          <select 
            name="role" 
            value={form.role} 
            onChange={handleChange} 
            required 
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="officer">Officer</option>
            <option value="supervisor">Supervisor</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Pos</label>
          <select 
            name="pos" 
            value={form.pos} 
            onChange={handleChange} 
            required 
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {POS_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password (Otomatis Generate)</label>
          <input 
            type="text"
            value={generatedPassword}
            readOnly
            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
          <p className="text-xs text-gray-500 mt-1">Password 8 karakter acak akan dibuat otomatis</p>
        </div>
        <div className="flex gap-3 pt-4">
          <button 
            type="submit" 
            disabled={loading} 
            className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
          <button 
            type="button" 
            onClick={onBack} 
            className="flex-1 bg-gray-200 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            Kembali
          </button>
        </div>
      </form>
      {notif && (
        <div className="mt-4 p-4 rounded-lg bg-green-50 text-green-800 border border-green-200">
          {notif.msg}
        </div>
      )}
      {error && (
        <div className="mt-4 p-4 rounded-lg bg-red-50 text-red-800 border border-red-200">
          {error}
        </div>
      )}
    </div>
  );
};

const SuperAdminDashboard = () => {
  const { auth } = useAuth();
  const [page, setPage] = useState('main');
  const [refreshPegawai, setRefreshPegawai] = useState(0);
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

  if (page === 'pegawai') return (
    <>
      {showPasswordReset && auth?.user && (
        <PasswordResetModal
          user={auth.user}
          onSuccess={handlePasswordResetSuccess}
          onClose={() => setShowPasswordReset(false)}
        />
      )}
      <div className="p-4 fade-in">
        <button onClick={() => setPage('main')} className="mb-4 button bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300">Kembali</button>
        <PegawaiList onRegister={() => setPage('register')} refresh={refreshPegawai} />
      </div>
    </>
  );
  
  if (page === 'register') return (
    <>
      {showPasswordReset && auth?.user && (
        <PasswordResetModal
          user={auth.user}
          onSuccess={handlePasswordResetSuccess}
          onClose={() => setShowPasswordReset(false)}
        />
      )}
      <RegisterUserForm onBack={() => setPage('pegawai')} onSuccess={() => { setPage('pegawai'); setRefreshPegawai(r => r+1); }} />
    </>
  );

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        <div className="card bg-white rounded-lg shadow p-8 flex flex-col items-center cursor-pointer hover:shadow-lg transition" onClick={() => setPage('logbook')}>
          <div className="w-12 h-12 mb-4 flex items-center justify-center bg-blue-100 rounded-full">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 20h9" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m0 0H3m9 0a9 9 0 100-18 9 9 0 000 18z" /></svg>
          </div>
          <h2 className="text-lg font-semibold mb-2">Log Book</h2>
          <p className="text-gray-500 text-center">Lihat semua log book/laporan</p>
        </div>
        <div className="card bg-white rounded-lg shadow p-8 flex flex-col items-center cursor-pointer hover:shadow-lg transition" onClick={() => setPage('pegawai')}>
          <div className="w-12 h-12 mb-4 flex items-center justify-center bg-green-100 rounded-full">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M16 3.13a4 4 0 010 7.75M8 3.13a4 4 0 000 7.75" /></svg>
          </div>
          <h2 className="text-lg font-semibold mb-2">Pegawai</h2>
          <p className="text-gray-500 text-center">Lihat dan kelola data pegawai</p>
        </div>
      </div>
    </div>
    </>
  );
};

export default SuperAdminDashboard; 