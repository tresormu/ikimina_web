import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { Button } from '../ui/Button';
import { Menu } from 'lucide-react';
import TreasurerNavigation from '../navigation/TreasurerNavigation';
import LenderNavigation from '../navigation/LenderNavigation';
import AdminNavigation from '../navigation/AdminNavigation';
import MemberNavigation from '../navigation/MemberNavigation';

const RoleBasedLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuthStore();

  const renderNavigation = () => {
    switch (user?.role) {
      case 'treasurer':
        return (
          <TreasurerNavigation
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        );
      case 'lender':
        return (
          <LenderNavigation
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        );
      case 'admin':
        return (
          <AdminNavigation
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        );
      case 'member':
      default:
        return (
          <MemberNavigation
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        );
    }
  };

  const getMainContentClass = () => {
    switch (user?.role) {
      case 'treasurer':
        return 'flex-1 lg:mx-12';
      case 'lender':
        return 'flex-1 lg:mx-12';
      case 'admin':
        return 'flex-1 lg:mx-12';
      case 'member':
      default:
        return 'flex-1 lg:mx-12';
    }
  };

  const getTopBarBackgroundColor = () => {
    switch (user?.role) {
      case 'treasurer':
        return 'bg-green-50';
      case 'lender':
        return 'bg-blue-50';
      case 'admin':
        return 'bg-red-50';
      case 'member':
      default:
        return 'bg-purple-50';
    }
  };

  const NavigationComponent = renderNavigation();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Navigation Component */}
      {NavigationComponent}

      {/* Main content */}
      <div className={getMainContentClass()}>
        {/* Top bar */}
        <header className={`bg-white shadow-sm border-b sticky top-0 z-10 ${getTopBarBackgroundColor()}`}>
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden"
              >
                <Menu className="h-4 w-4" />
              </Button>

              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">
                  Welcome back, {user?.fullName}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6 max-w-7xl mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default RoleBasedLayout;
