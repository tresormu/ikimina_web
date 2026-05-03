import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import {
  Users,
  DollarSign,
  TrendingUp,
  CreditCard,
  Search,
  Plus,
  Bell,
  Megaphone,
} from 'lucide-react';

const TreasurerDashboard: React.FC = () => {
  const [announcement, setAnnouncement] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  const groupOverview = {
    totalMembers: 24,
    currentCycle: 3,
    currentWeek: 8,
    potAmount: 600000,
    thisWeekRecipient: {
      name: 'Alice Mugisha',
      phone: '+250788123456',
    },
  };

  const memberStatuses = [
    { id: 1, name: 'John Doe', phone: '+250712345678', status: 'paid', amount: 25000 },
    { id: 2, name: 'Jane Smith', phone: '+250723456789', status: 'paid', amount: 25000 },
    { id: 3, name: 'Bob Wilson', phone: '+250734567890', status: 'pending', amount: 25000 },
    { id: 4, name: 'Alice Mugisha', phone: '+250788123456', status: 'paid', amount: 25000 },
    { id: 5, name: 'David Brown', phone: '+250745678901', status: 'missed', amount: 25000 },
  ].filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.phone.includes(searchTerm)
  );

  const totalCollected = memberStatuses
    .filter(m => m.status === 'paid')
    .reduce((sum, m) => sum + m.amount, 0);

  const totalExpected = memberStatuses.length * 25000;

  const recentActivity = [
    { id: 1, type: 'payment', member: 'John Doe', description: 'Paid contribution for week 8', time: '2 hours ago' },
    { id: 2, type: 'member', member: 'Sarah Johnson', description: 'Joined the group', time: '5 hours ago' },
    { id: 3, type: 'loan', member: 'Mike Davis', description: 'Requested emergency loan', time: '1 day ago' },
    { id: 4, type: 'payment', member: 'Jane Smith', description: 'Paid contribution for week 8', time: '1 day ago' },
    { id: 5, type: 'dispute', member: 'David Brown', description: 'Reported payment issue', time: '2 days ago' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge variant="success">Paid</Badge>;
      case 'pending':
        return <Badge variant="warning">Pending</Badge>;
      case 'missed':
        return <Badge variant="error">Missed</Badge>;
      default:
        return <Badge variant="default">Unknown</Badge>;
    }
  };

  const handlePostAnnouncement = () => {
    if (announcement.trim()) {
      // TODO: API call to post announcement
      console.log('Posting announcement:', announcement);
      setAnnouncement('');
      // Show success message
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Treasurer Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your group and track contributions</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Member
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Members</p>
                <p className="text-2xl font-bold text-gray-900">{groupOverview.totalMembers}</p>
              </div>
              <Users className="h-8 w-8 text-primary-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Current Cycle</p>
                <p className="text-2xl font-bold text-gray-900">{groupOverview.currentCycle}</p>
                <p className="text-xs text-gray-500">Week {groupOverview.currentWeek}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-primary-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">This Week's Pot</p>
                <p className="text-2xl font-bold text-gray-900">RWF {groupOverview.potAmount.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-primary-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">This Week's Recipient</p>
                <p className="text-lg font-bold text-gray-900">{groupOverview.thisWeekRecipient.name}</p>
                <p className="text-xs text-gray-500">{groupOverview.thisWeekRecipient.phone}</p>
              </div>
              <CreditCard className="h-8 w-8 text-primary-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Announcement Bar */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Megaphone className="h-5 w-5 mr-2" />
            Group Announcement
          </CardTitle>
          <CardDescription>
            Post a message visible to all group members
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input
              placeholder="Enter your announcement here..."
              value={announcement}
              onChange={(e) => setAnnouncement(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handlePostAnnouncement}>
              Post Announcement
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Member Status */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Member Status</CardTitle>
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Search members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-48"
                />
                <Search className="h-4 w-4 text-gray-400" />
              </div>
            </div>
            <CardDescription>
              Contribution status for this week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {memberStatuses.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{member.name}</p>
                    <p className="text-sm text-gray-500">{member.phone}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">RWF {member.amount.toLocaleString()}</span>
                    {getStatusBadge(member.status)}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total Collected:</span>
                <span className="font-medium text-green-600">RWF {totalCollected.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total Expected:</span>
                <span className="font-medium text-gray-900">RWF {totalExpected.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="h-5 w-5 mr-2" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Latest events in your group
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                  <div className="flex-shrink-0">
                    {activity.type === 'payment' && <DollarSign className="h-4 w-4 text-green-500" />}
                    {activity.type === 'member' && <Users className="h-4 w-4 text-blue-500" />}
                    {activity.type === 'loan' && <CreditCard className="h-4 w-4 text-yellow-500" />}
                    {activity.type === 'dispute' && <Bell className="h-4 w-4 text-red-500" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.member}</p>
                    <p className="text-xs text-gray-600">{activity.description}</p>
                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TreasurerDashboard;
