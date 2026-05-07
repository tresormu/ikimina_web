import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './stores/authStore';

import LoadingScreen from './components/ui/LoadingScreen';
import RouteLoadingBar from './components/ui/RouteLoadingBar';
import RoleBasedLayout from './components/layout/RoleBasedLayout';
import AuthLayout from './components/layout/AuthLayout';
import PublicLayout from './components/layout/PublicLayout';

import HomePage from './pages/public/HomePage';
import HowItWorksPage from './pages/public/HowItWorksPage';
import ServicesPage from './pages/public/ServicesPage';
import AboutPage from './pages/public/AboutPage';
import PricingPage from './pages/public/PricingPage';
import ContactPage from './pages/public/ContactPage';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/dashboard/Dashboard';

import TreasurerDashboard from './pages/treasurer/TreasurerDashboard';
import MemberManagement from './pages/treasurer/MemberManagement';
import ContributionTracker from './pages/treasurer/ContributionTracker';
import RotationManagement from './pages/treasurer/RotationManagement';
import DisputeManagement from './pages/treasurer/DisputeManagement';
import Earnings from './pages/treasurer/Earnings';
import Profits from './pages/treasurer/Profits';
import TreasurerProfile from './pages/treasurer/TreasurerProfile';
import MemberDetail from './pages/treasurer/MemberDetail';
import MemberOnboarding from './pages/treasurer/MemberOnboarding';
import PenaltyManagement from './pages/treasurer/PenaltyManagement';
import LoanManagement from './pages/treasurer/LoanManagement';
import USSDSimulator from './pages/treasurer/USSDSimulator';
import MemberJoin from './pages/auth/MemberJoin';


import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLogin from './pages/admin/AdminLogin';
import GroupManagement from './pages/admin/GroupManagement';
import DisputeResolution from './pages/admin/DisputeResolution';
import AdminProfits from './pages/admin/AdminProfits';

const ProtectedRoute: React.FC<{ children: React.ReactNode; allowedRoles?: string[] }> = ({
  children,
  allowedRoles,
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

function AppContent() {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <LoadingScreen message="Loading IkiminaPass..." />;

  return (
    <>
      <RouteLoadingBar />
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="how-it-works" element={<HowItWorksPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="pricing" element={<PricingPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>

        <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
        <Route path="/register" element={<AuthLayout><Register /></AuthLayout>} />
        <Route path="/join" element={<MemberJoin />} />
        <Route path="/admin/login" element={<AuthLayout><AdminLogin /></AuthLayout>} />

        <Route path="/" element={<ProtectedRoute><RoleBasedLayout /></ProtectedRoute>}>
          <Route path="dashboard" element={<Dashboard />} />

          <Route path="treasurer" element={<ProtectedRoute allowedRoles={['treasurer', 'admin']}><TreasurerDashboard /></ProtectedRoute>} />
          <Route path="treasurer/profile" element={<ProtectedRoute allowedRoles={['treasurer', 'admin']}><TreasurerProfile /></ProtectedRoute>} />
          <Route path="treasurer/onboarding" element={<ProtectedRoute allowedRoles={['treasurer', 'admin']}><MemberOnboarding /></ProtectedRoute>} />
          <Route path="treasurer/members" element={<ProtectedRoute allowedRoles={['treasurer', 'admin']}><MemberManagement /></ProtectedRoute>} />
          <Route path="treasurer/members/:id" element={<ProtectedRoute allowedRoles={['treasurer', 'admin']}><MemberDetail /></ProtectedRoute>} />
          <Route path="treasurer/contributions" element={<ProtectedRoute allowedRoles={['treasurer', 'admin']}><ContributionTracker /></ProtectedRoute>} />
          <Route path="treasurer/rotation" element={<ProtectedRoute allowedRoles={['treasurer', 'admin']}><RotationManagement /></ProtectedRoute>} />
          <Route path="treasurer/disputes" element={<ProtectedRoute allowedRoles={['treasurer', 'admin']}><DisputeManagement /></ProtectedRoute>} />
          <Route path="treasurer/earnings" element={<ProtectedRoute allowedRoles={['treasurer', 'admin']}><Earnings /></ProtectedRoute>} />
          <Route path="treasurer/profits" element={<ProtectedRoute allowedRoles={['treasurer', 'admin']}><Profits /></ProtectedRoute>} />
          <Route path="treasurer/penalties" element={<ProtectedRoute allowedRoles={['treasurer', 'admin']}><PenaltyManagement /></ProtectedRoute>} />
          <Route path="treasurer/loans" element={<ProtectedRoute allowedRoles={['treasurer', 'admin']}><LoanManagement /></ProtectedRoute>} />
          <Route path="treasurer/ussd" element={<ProtectedRoute allowedRoles={['treasurer', 'admin']}><USSDSimulator /></ProtectedRoute>} />


          <Route path="admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
          <Route path="admin/groups" element={<ProtectedRoute allowedRoles={['admin']}><GroupManagement /></ProtectedRoute>} />
                    <Route path="admin/disputes" element={<ProtectedRoute allowedRoles={['admin']}><DisputeResolution /></ProtectedRoute>} />
          <Route path="admin/profits" element={<ProtectedRoute allowedRoles={['admin']}><AdminProfits /></ProtectedRoute>} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: { background: '#363636', color: '#fff' },
          success: { duration: 3000, iconTheme: { primary: '#f97316', secondary: '#fff' } },
          error: { duration: 5000, iconTheme: { primary: '#ef4444', secondary: '#fff' } },
        }}
      />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
