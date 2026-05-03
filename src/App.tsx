import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';
import { Toaster } from 'react-hot-toast';

// Layout Components
import RoleBasedLayout from './components/layout/RoleBasedLayout';
import AuthLayout from './components/layout/AuthLayout';

// Page Components
import Login from './pages/auth/Login';
import Dashboard from './pages/dashboard/Dashboard';

// Treasurer Pages
import TreasurerDashboard from './pages/treasurer/TreasurerDashboard';
import MemberManagement from './pages/treasurer/MemberManagement';
import ContributionTracker from './pages/treasurer/ContributionTracker';
import RotationManagement from './pages/treasurer/RotationManagement';
import DisputeManagement from './pages/treasurer/DisputeManagement';
import Earnings from './pages/treasurer/Earnings';

// Lender Pages
import LenderDashboard from './pages/lender/LenderDashboard';
import LenderLogin from './pages/lender/LenderLogin';
import CreditReportSearch from './pages/lender/CreditReportSearch';
import Billing from './pages/lender/Billing';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLogin from './pages/admin/AdminLogin';
import GroupManagement from './pages/admin/GroupManagement';
import LenderManagement from './pages/admin/LenderManagement';
import DisputeResolution from './pages/admin/DisputeResolution';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode; allowedRoles?: string[] }> = ({ 
  children, 
  allowedRoles 
}) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
        <Route path="/lender/login" element={<AuthLayout><LenderLogin /></AuthLayout>} />
        <Route path="/admin/login" element={<AuthLayout><AdminLogin /></AuthLayout>} />
        
        {/* Protected Routes */}
        <Route path="/" element={<ProtectedRoute><RoleBasedLayout /></ProtectedRoute>}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            
            {/* Treasurer Routes */}
            <Route 
              path="treasurer" 
              element={
                <ProtectedRoute allowedRoles={['treasurer', 'admin']}>
                  <TreasurerDashboard />
                </ProtectedRoute>
              }
            />
            <Route 
              path="treasurer/members" 
              element={
                <ProtectedRoute allowedRoles={['treasurer', 'admin']}>
                  <MemberManagement />
                </ProtectedRoute>
              }
            />
            <Route 
              path="treasurer/contributions" 
              element={
                <ProtectedRoute allowedRoles={['treasurer', 'admin']}>
                  <ContributionTracker />
                </ProtectedRoute>
              }
            />
            <Route 
              path="treasurer/rotation" 
              element={
                <ProtectedRoute allowedRoles={['treasurer', 'admin']}>
                  <RotationManagement />
                </ProtectedRoute>
              }
            />
            <Route 
              path="treasurer/disputes" 
              element={
                <ProtectedRoute allowedRoles={['treasurer', 'admin']}>
                  <DisputeManagement />
                </ProtectedRoute>
              }
            />
            <Route 
              path="treasurer/earnings" 
              element={
                <ProtectedRoute allowedRoles={['treasurer', 'admin']}>
                  <Earnings />
                </ProtectedRoute>
              }
            />
            
            {/* Lender Routes */}
            <Route 
              path="lender" 
              element={
                <ProtectedRoute allowedRoles={['lender', 'admin']}>
                  <LenderDashboard />
                </ProtectedRoute>
              }
            />
            <Route 
              path="lender/credit-reports" 
              element={
                <ProtectedRoute allowedRoles={['lender', 'admin']}>
                  <CreditReportSearch />
                </ProtectedRoute>
              }
            />
            <Route 
              path="lender/billing" 
              element={
                <ProtectedRoute allowedRoles={['lender', 'admin']}>
                  <Billing />
                </ProtectedRoute>
              }
            />
            
            {/* Admin Routes */}
            <Route 
              path="admin" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route 
              path="admin/groups" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <GroupManagement />
                </ProtectedRoute>
              }
            />
            <Route 
              path="admin/lenders" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <LenderManagement />
                </ProtectedRoute>
              }
            />
            <Route 
              path="admin/disputes" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <DisputeResolution />
                </ProtectedRoute>
              }
            />
          </Route>
          
          {/* 404 Route */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
      
      {/* Global Toast Notifications */}
      <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#f97316',
                secondary: '#fff',
              },
            },
            error: {
              duration: 5000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
    </Router>
  );
}

export default App;
