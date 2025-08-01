import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useAuth } from '../auth/useAuth';

const PasswordResetModal = ({ user, onSuccess, onClose }) => {
  const { login } = useAuth();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Password tidak cocok');
      setLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setError('Password minimal 6 karakter');
      setLoading(false);
      return;
    }

    if (!user || !user.user_id) {
      setError('Data user tidak valid');
      setLoading(false);
      return;
    }

    try {
      // Update password and set first_login to false using updateUser endpoint
      const response = await axiosInstance.put(`/api/users/${user.user_id}`, {
        password: newPassword,
        first_login: false
      });
      
      // Update auth context by fetching updated user data
      const updatedUserResponse = await axiosInstance.get(`/api/users/${user.user_id}`);
      
      if (updatedUserResponse.data) {
        await login('dummy-token', updatedUserResponse.data);
      }
      
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.error || 'Gagal mengubah password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Reset Password</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="mb-4">
          <p className="text-gray-600 mb-2">
            Selamat datang, <span className="font-semibold">{user.nama_lengkap}</span>!
          </p>
          <p className="text-sm text-gray-500">
            Ini adalah login pertama Anda. Silakan buat password baru untuk akun Anda.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password Baru
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Masukkan password baru"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Konfirmasi Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Konfirmasi password baru"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
            >
              {loading ? 'Menyimpan...' : 'Simpan Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordResetModal; 