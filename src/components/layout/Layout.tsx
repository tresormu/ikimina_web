import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { Button } from '../ui/Button';
import {
  Home,
  Users,
  CreditCard,
  LogOut,
  Menu,
  X,
  TrendingUp,
  FileText,
  Shield,
  UserCheck,
  DollarSign,
  AlertTriangle,
} from 'lucide-react';

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getMenuItems = () => {
    const baseItems = [
      {
        name: 'Dashboard',
        href: '/dashboard',
        icon: Home,
      },
    ];

    if (user?.role === 'treasurer' || user?.role === 'admin') {
      baseItems.push(
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
          name: 'Earnings',
          href: '/treasurer/earnings',
          icon: CreditCard,
        }
      );
    }

    if (user?.role === 'lender' || user?.role === 'admin') {
      baseItems.push(
        {
          name: 'Credit Reports',
          href: '/lender/credit-reports',
          icon: FileText,
        },
        {
          name: 'Billing',
          href: '/lender/billing',
          icon: CreditCard,
        }
      );
    }

    if (user?.role === 'admin') {
      baseItems.push(
        {
          name: 'Groups',
          href: '/admin/groups',
          icon: Users,
        },
        {
          name: 'Lenders',
          href: '/admin/lenders',
          icon: UserCheck,
        },
        {
          name: 'Admin Disputes',
          href: '/admin/disputes',
          icon: Shield,
        }
      );
    }

    return baseItems;
  };

  const menuItems = getMenuItems();

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
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">I</span>
              </div>
              <h1 className="text-lg font-bold text-gray-900">IkiminaPass</h1>
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
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-600 font-medium">
                  {user?.fullName?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{user?.fullName}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
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
                      ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-500'
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

      {/* Main content */}
      <div className="flex-1 lg:mx-12">
        {/* Top bar */}
        <header className="bg-white shadow-sm border-b sticky top-0 z-10">
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

export default Layout;
