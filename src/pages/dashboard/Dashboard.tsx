import React from 'react';
import { useAuthStore } from '../../stores/authStore';
import { Button } from '../../components/ui/Button';
import {
  Users,
  DollarSign,
  TrendingUp,
  CreditCard,
  ArrowRight,
  Calendar,
  Bell,
  FileText,
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuthStore();

  const getWelcomeMessage = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getRoleDashboard = () => {
    switch (user?.role) {
      case 'treasurer':
        return <TreasurerDashboard />;
      case 'lender':
        return <LenderDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <MemberDashboard />;
    }
  };

  const TreasurerDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Members</p>
              <p className="text-2xl font-bold text-gray-900">24</p>
            </div>
            <Users className="h-8 w-8 text-primary-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Current Cycle</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
            <TrendingUp className="h-8 w-8 text-primary-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">This Week's Pot</p>
              <p className="text-2xl font-bold text-gray-900">RWF 600,000</p>
            </div>
            <DollarSign className="h-8 w-8 text-primary-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">This Week's Recipient</p>
              <p className="text-lg font-bold text-gray-900">Alice Mugisha</p>
            </div>
            <CreditCard className="h-8 w-8 text-primary-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {[
              { name: 'John Doe', action: 'Paid contribution', time: '2 hours ago' },
              { name: 'Jane Smith', action: 'Joined group', time: '5 hours ago' },
              { name: 'Bob Wilson', action: 'Requested loan', time: '1 day ago' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-900">{activity.name}</p>
                  <p className="text-xs text-gray-500">{activity.action}</p>
                </div>
                <span className="text-xs text-gray-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Button className="w-full justify-start">
              <Users className="h-4 w-4 mr-2" />
              Add New Member
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <DollarSign className="h-4 w-4 mr-2" />
              Record Contribution
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Calendar className="h-4 w-4 mr-2" />
              Manage Rotation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const LenderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Reports Purchased</p>
              <p className="text-2xl font-bold text-gray-900">156</p>
            </div>
            <FileText className="h-8 w-8 text-primary-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Spent</p>
              <p className="text-2xl font-bold text-gray-900">RWF 780,000</p>
            </div>
            <DollarSign className="h-8 w-8 text-primary-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Prepaid Balance</p>
              <p className="text-2xl font-bold text-gray-900">RWF 100,000</p>
            </div>
            <CreditCard className="h-8 w-8 text-primary-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-gray-900">23</p>
            </div>
            <TrendingUp className="h-8 w-8 text-primary-500" />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Purchases</h3>
          <Button variant="outline" size="sm">
            View All <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        <div className="space-y-3">
          {[
            { name: 'Alice Mugisha', score: 750, amount: 'RWF 5,000', date: '2024-01-15' },
            { name: 'John Doe', score: 680, amount: 'RWF 5,000', date: '2024-01-14' },
            { name: 'Jane Smith', score: 720, amount: 'RWF 5,000', date: '2024-01-13' },
          ].map((purchase, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b last:border-0">
              <div>
                <p className="text-sm font-medium text-gray-900">{purchase.name}</p>
                <p className="text-xs text-gray-500">Credit Score: {purchase.score}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{purchase.amount}</p>
                <p className="text-xs text-gray-500">{purchase.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const AdminDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Groups</p>
              <p className="text-2xl font-bold text-gray-900">142</p>
            </div>
            <Users className="h-8 w-8 text-primary-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Lenders</p>
              <p className="text-2xl font-bold text-gray-900">28</p>
            </div>
            <CreditCard className="h-8 w-8 text-primary-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Platform Revenue</p>
              <p className="text-2xl font-bold text-gray-900">RWF 2.4M</p>
            </div>
            <DollarSign className="h-8 w-8 text-primary-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Open Disputes</p>
              <p className="text-2xl font-bold text-gray-900">7</p>
            </div>
            <Bell className="h-8 w-8 text-primary-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {[
              { action: 'New group registered', detail: 'Kigali Savings Group', time: '1 hour ago' },
              { action: 'Lender application', detail: 'MicroFinance Ltd', time: '3 hours ago' },
              { action: 'Dispute escalated', detail: 'Group #45 - Payment Issue', time: '5 hours ago' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.detail}</p>
                </div>
                <span className="text-xs text-gray-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">API Response Time</span>
                <span className="text-green-600">Good</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Database Performance</span>
                <span className="text-green-600">Excellent</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">SMS Gateway</span>
                <span className="text-yellow-600">Moderate</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '70%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const MemberDashboard = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Welcome to IkiminaPass</h3>
        <p className="text-gray-600 mb-4">
          Your mobile app provides the best experience for managing your contributions and group activities.
          Please use the mobile app for all member features.
        </p>
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
          <p className="text-sm text-primary-800">
            <strong>Note:</strong> Member features are optimized for mobile. Download the IkiminaPass mobile app
            for the full experience including contributions, credit score, loans, and group management.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {getWelcomeMessage()}, {user?.fullName}
        </h1>
        <p className="text-gray-600 mt-2">
          Here's what's happening with your {user?.role} dashboard today.
        </p>
      </div>

      {getRoleDashboard()}
    </div>
  );
};

export default Dashboard;
