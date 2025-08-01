import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './auth/useAuth';
import OfficerDashboard from './components/dashboard/OfficerDashboard';
import SupervisorDashboard from './components/dashboard/SupervisorDashboard';
import SupervisorAllReports from './components/dashboard/SupervisorAllReports';
import SupervisorUnsignedReports from './components/dashboard/SupervisorUnsignedReports';
import SuperAdminDashboard from './components/dashboard/SuperAdminDashboard';
import Login from './components/Login';
import LogbookHarianMasterTable from './forms/masters/LogbookHarianMasterTable';
import LogbookHarianMasterForm from './forms/masters/LogbookHarianMasterForm';

const ProtectedRoute = ({ children }) => {
  const { auth } = useAuth();
  if (!auth) return <Navigate to="/login" />;
  return children;
};

const RoleBasedRoute = ({ children, allowedRoles }) => {
  const { auth } = useAuth();
  if (!auth) return <Navigate to="/login" />;
  if (!allowedRoles.includes(auth.user.role)) return <Navigate to="/dashboard" />;
  return children;
};

const Router = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/dashboard/officer" />} />
        <Route
          path="/dashboard/officer"
          element={
            <RoleBasedRoute allowedRoles={['officer', 'supervisor', 'superadmin']}>
              <OfficerDashboard />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/dashboard/supervisor"
          element={
            <RoleBasedRoute allowedRoles={['supervisor', 'superadmin']}>
              <SupervisorDashboard />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/dashboard/superadmin"
          element={
            <RoleBasedRoute allowedRoles={['superadmin']}>
              <SuperAdminDashboard />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/forms/masters/logbook-harian"
          element={
            <ProtectedRoute>
              <LogbookHarianMasterTable />
            </ProtectedRoute>
          }
        />
        <Route
          path="/forms/masters/logbook-harian/create"
          element={
            <ProtectedRoute>
              <LogbookHarianMasterForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/forms/masters/logbook-harian/:id"
          element={
            <ProtectedRoute>
              <LogbookHarianMasterForm />
            </ProtectedRoute>
          }
        />

        {/* Supervisor Routes */}
        <Route
          path="/supervisor/laporan"
          element={
            <RoleBasedRoute allowedRoles={['supervisor', 'superadmin']}>
              <SupervisorAllReports />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/supervisor/belum-ditandatangani"
          element={
            <RoleBasedRoute allowedRoles={['supervisor', 'superadmin']}>
              <SupervisorUnsignedReports />
            </RoleBasedRoute>
          }
        />

        {/* Dummy fallback untuk route lain */}
        <Route path="*" element={<Navigate to="/dashboard/officer" />} />
      </Routes>
    </div>
  );
};

export default Router; 