import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Search, Filter, PieChart } from 'lucide-react';
import { AdminStatsCard } from '../../components/admin/AdminStatsCard';
import { AdminTabNavigation } from '../../components/admin/AdminTabNavigation';
import { GroupRow } from '../../components/admin/GroupRow';
import { LenderRow } from '../../components/admin/LenderRow';
import { DisputeRow } from '../../components/admin/DisputeRow';

interface AdminStats {
  totalGroups: number;
  activeGroups: number;
  totalLenders: number;
  approvedLenders: number;
  pendingLenders: number;
  totalRevenue: number;
  monthlyRevenue: number;
  totalDisputes: number;
  escalatedDisputes: number;
  pendingApplications: number;
}

interface Group {
  id: string;
  name: string;
  members: number;
  status: 'active' | 'inactive' | 'suspended';
  createdDate: string;
  lastActivity: string;
  treasurer: string;
}

interface Lender {
  id: string;
  institutionName: string;
  status: 'approved' | 'pending' | 'rejected' | 'suspended';
  licenseNumber: string;
  applicationDate: string;
  approvedDate?: string;
  reportsPurchased: number;
  totalSpent: number;
}

interface Dispute {
  id: string;
  groupId: string;
  groupName: string;
  memberId: string;
  memberName: string;
  description: string;
  status: 'open' | 'resolved' | 'escalated';
  escalatedDate?: string;
  createdDate: string;
  priority: 'low' | 'medium' | 'high';
}

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'groups' | 'lenders' | 'disputes' | 'revenue'>('overview');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data
  const [stats] = useState<AdminStats>({
    totalGroups: 156,
    activeGroups: 142,
    totalLenders: 28,
    approvedLenders: 24,
    pendingLenders: 4,
    totalRevenue: 12500000,
    monthlyRevenue: 2100000,
    totalDisputes: 47,
    escalatedDisputes: 12,
    pendingApplications: 4
  });

  const [groups] = useState<Group[]>([
    {
      id: '1',
      name: 'Kigali Savings Group',
      members: 15,
      status: 'active',
      createdDate: '2022-03-15',
      lastActivity: '2024-01-20',
      treasurer: 'Jean Mugisha'
    },
    {
      id: '2',
      name: 'Nyabugogo Investment Club',
      members: 12,
      status: 'active',
      createdDate: '2022-06-20',
      lastActivity: '2024-01-19',
      treasurer: 'Alice Uwimana'
    },
    {
      id: '3',
      name: 'Remera Business Circle',
      members: 8,
      status: 'suspended',
      createdDate: '2023-01-10',
      lastActivity: '2024-01-15',
      treasurer: 'Bob Niyonsaba'
    }
  ]);

  const [lenders] = useState<Lender[]>([
    {
      id: '1',
      institutionName: 'ABC Finance Ltd',
      status: 'approved',
      licenseNumber: 'FL2024001234',
      applicationDate: '2024-01-15',
      approvedDate: '2024-01-17',
      reportsPurchased: 47,
      totalSpent: 470000
    },
    {
      id: '2',
      institutionName: 'Rwanda Credit Union',
      status: 'pending',
      licenseNumber: 'FL2024001567',
      applicationDate: '2024-01-20',
      reportsPurchased: 0,
      totalSpent: 0
    },
    {
      id: '3',
      institutionName: 'Quick Loans Ltd',
      status: 'rejected',
      licenseNumber: 'FL2024000987',
      applicationDate: '2024-01-10',
      reportsPurchased: 0,
      totalSpent: 0
    }
  ]);

  const [disputes] = useState<Dispute[]>([
    {
      id: '1',
      groupId: '1',
      groupName: 'Kigali Savings Group',
      memberId: '1',
      memberName: 'Jean Mugisha',
      description: 'Dispute over contribution payment for week 8',
      status: 'escalated',
      escalatedDate: '2024-01-19',
      createdDate: '2024-01-18',
      priority: 'high'
    },
    {
      id: '2',
      groupId: '2',
      groupName: 'Nyabugogo Investment Club',
      memberId: '2',
      memberName: 'Alice Uwimana',
      description: 'Missing rotation payment',
      status: 'open',
      createdDate: '2024-01-20',
      priority: 'medium'
    }
  ]);


  const handleSuspendGroup = (groupId: string) => {
    alert(`Suspending group ${groupId}`);
  };

  const handleApproveLender = (lenderId: string) => {
    alert(`Approving lender ${lenderId}`);
  };

  const handleRejectLender = (lenderId: string) => {
    alert(`Rejecting lender ${lenderId}`);
  };

  const handleResolveDispute = (disputeId: string) => {
    alert(`Resolving dispute ${disputeId}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Platform Admin Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Manage groups, lenders, disputes, and platform revenue
        </p>
      </div>

      {/* Overview Stats */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <AdminStatsCard
            type="groups"
            value={stats.totalGroups}
            subtitle={`${stats.activeGroups} active`}
          />
          <AdminStatsCard
            type="lenders"
            value={stats.totalLenders}
            subtitle={`${stats.approvedLenders} approved`}
          />
          <AdminStatsCard
            type="revenue"
            value={`RWF ${stats.totalRevenue.toLocaleString()}`}
            subtitle={`RWF ${stats.monthlyRevenue.toLocaleString()} this month`}
          />
          <AdminStatsCard
            type="disputes"
            value={stats.totalDisputes}
            subtitle={`${stats.escalatedDisputes} escalated`}
          />
        </div>
      )}

      {/* Navigation Tabs */}
      <AdminTabNavigation 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Groups Tab */}
      {activeTab === 'groups' && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Registered Groups</CardTitle>
                <CardDescription>
                  Manage all savings groups on the platform
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search groups..."
                    className="pl-10 border border-gray-300 rounded-md px-3 py-2 text-sm"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-1" />
                  Filter
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Group Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Members
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Treasurer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Activity
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {groups.map((group) => (
                    <GroupRow
                      key={group.id}
                      group={group}
                      onSuspend={handleSuspendGroup}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Lenders Tab */}
      {activeTab === 'lenders' && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Registered Lenders</CardTitle>
                <CardDescription>
                  Manage financial institution applications and approvals
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="warning">{stats.pendingApplications} pending</Badge>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-1" />
                  Filter
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Institution
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      License Number
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Applied
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Approved
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reports Purchased
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Spent
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {lenders.map((lender) => (
                    <LenderRow
                      key={lender.id}
                      lender={lender}
                      onApprove={handleApproveLender}
                      onReject={handleRejectLender}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Disputes Tab */}
      {activeTab === 'disputes' && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Escalated Disputes</CardTitle>
                <CardDescription>
                  Manage disputes escalated from group level
                </CardDescription>
              </div>
              <Badge variant="error">{stats.escalatedDisputes} escalated</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Group
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Member
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Priority
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Escalated
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {disputes.map((dispute) => (
                    <DisputeRow
                      key={dispute.id}
                      dispute={dispute}
                      onResolve={handleResolveDispute}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Revenue Tab */}
      {activeTab === 'revenue' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>
                Platform earnings from all sources
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Total Revenue</span>
                  <span className="text-lg font-bold text-gray-900">RWF {stats.totalRevenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm text-blue-700">Monthly Revenue</span>
                  <span className="text-lg font-bold text-blue-900">RWF {stats.monthlyRevenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-sm text-green-700">Credit Report Sales</span>
                  <span className="text-lg font-bold text-green-900">RWF {(stats.totalRevenue * 0.7).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="text-sm text-purple-700">Subscription Fees</span>
                  <span className="text-lg font-bold text-purple-900">RWF {(stats.totalRevenue * 0.3).toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Revenue Breakdown</CardTitle>
              <CardDescription>
                Monthly revenue trends and analytics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <PieChart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="font-medium text-gray-900">Revenue Sources</h4>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Credit Reports (70%)</span>
                      <span className="text-sm font-medium">RWF {(stats.monthlyRevenue * 0.7).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Subscriptions (30%)</span>
                      <span className="text-sm font-medium">RWF {(stats.monthlyRevenue * 0.3).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <div className="text-center p-4">
                  <Button variant="outline">
                    Download Full Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      {/* Render nested routes */}
      <Outlet />
    </div>
  );
};

export default AdminDashboard;
