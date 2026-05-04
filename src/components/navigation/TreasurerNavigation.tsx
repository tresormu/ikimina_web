import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { Button } from '../ui/Button';
import {
  Home,
  Users,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CreditCard,
  LogOut,
  Menu,
  X,
} from 'lucide-react';

interface TreasurerNavigationProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const TreasurerNavigation: React.FC<TreasurerNavigationProps> = ({
  sidebarOpen,
  setSidebarOpen,
}) => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    {
      name: 'Dashboard',
      href: '/treasurer',
      icon: Home,
    },
    {
      name: 'My Profile',
      href: '/treasurer/profile',
      icon: Users,
    },
    {
      name: 'Add Members',
      href: '/treasurer/onboarding',
      icon: Users,
    },
    {
      name: 'Members',
      href: '/treasurer/members',
      icon: Users,
    },
    {
      name: 'Contributions',
      href: '/treasurer/contributions',
      icon: DollarSign,
    },
    {
      name: 'Loans',
      href: '/treasurer/loans',
      icon: CreditCard,
    },
    {
      name: 'Penalties',
      href: '/treasurer/penalties',
      icon: AlertTriangle,
    },
    {
      name: 'Rotation',
      href: '/treasurer/rotation',
      icon: TrendingUp,
    },
    {
      name: 'Disputes',
      href: '/treasurer/disputes',
      icon: AlertTriangle,
    },
    {
      name: 'Profits',
      href: '/treasurer/profits',
      icon: CreditCard,
    },
    {
      name: 'USSD Simulator',
      href: '/treasurer/ussd',
      icon: Home,
    },
  ];

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="absolute inset-0 bg-gray-600 opacity-75" />
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <h1 className="text-lg font-bold text-gray-900">Treasurer Portal</h1>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* User info */}
          <div className="p-4 border-b">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-medium">
                  {user?.fullName?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{user?.fullName}</p>
                <p className="text-xs text-green-600 font-medium capitalize">Treasurer</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    navigate(item.href);
                    setSidebarOpen(false);
                  }}
                  className={`
                    w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                    ${isActive(item.href)
                      ? 'bg-green-50 text-green-700 border-r-2 border-green-500'
                      : 'text-gray-700 hover:bg-gray-100'
                    }
                  `}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t">
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="w-full justify-start text-gray-700 hover:text-red-600"
            >
              <LogOut className="h-4 w-4 mr-3" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreasurerNavigation;
