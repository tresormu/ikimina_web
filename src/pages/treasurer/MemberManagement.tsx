import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import {
  Users,
  Search,
  Plus,
  Phone,
  Mail,
  Calendar,
  Eye,
  UserX,
  UserCheck,
  Filter,
  Download,
} from 'lucide-react';

interface Member {
  id: string;
  name: string;
  phone: string;
  email?: string;
  joinDate: string;
  status: 'active' | 'inactive';
  contributionHistory: Array<{
    week: number;
    amount: number;
    status: 'paid' | 'missed';
    date: string;
  }>;
  reliability: number;
}

const MemberManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'joinDate' | 'reliability'>('joinDate');
  const [showAddMember, setShowAddMember] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  // Mock data
  const members: Member[] = [
    {
      id: '1',
      name: 'John Doe',
      phone: '+250712345678',
      email: 'john.doe@email.com',
      joinDate: '2023-01-15',
      status: 'active',
      reliability: 95,
      contributionHistory: [
        { week: 8, amount: 25000, status: 'paid', date: '2024-01-20' },
        { week: 7, amount: 25000, status: 'paid', date: '2024-01-13' },
        { week: 6, amount: 25000, status: 'paid', date: '2024-01-06' },
      ],
    },
    {
      id: '2',
      name: 'Jane Smith',
      phone: '+250723456789',
      email: 'jane.smith@email.com',
      joinDate: '2023-02-20',
      status: 'active',
      reliability: 88,
      contributionHistory: [
        { week: 8, amount: 25000, status: 'paid', date: '2024-01-20' },
        { week: 7, amount: 25000, status: 'missed', date: '2024-01-13' },
        { week: 6, amount: 25000, status: 'paid', date: '2024-01-06' },
      ],
    },
    {
      id: '3',
      name: 'Bob Wilson',
      phone: '+250734567890',
      email: 'bob.wilson@email.com',
      joinDate: '2023-03-10',
      status: 'inactive',
      reliability: 72,
      contributionHistory: [
        { week: 5, amount: 25000, status: 'paid', date: '2023-12-30' },
        { week: 4, amount: 25000, status: 'missed', date: '2023-12-23' },
      ],
    },
  ];

  const filteredMembers = members
    .filter(member => {
      const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           member.phone.includes(searchTerm) ||
                           (member.email && member.email.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesStatus = statusFilter === 'all' || member.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'joinDate':
          return new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime();
        case 'reliability':
          return b.reliability - a.reliability;
        default:
          return 0;
      }
    });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="success">Active</Badge>;
      case 'inactive':
        return <Badge variant="error">Inactive</Badge>;
      default:
        return <Badge variant="default">Unknown</Badge>;
    }
  };

  const getReliabilityColor = (reliability: number) => {
    if (reliability >= 90) return 'text-green-600';
    if (reliability >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleAddMember = () => {
    setShowAddMember(true);
  };

  const handleViewProfile = (member: Member) => {
    setSelectedMember(member);
  };

  const handleToggleStatus = (memberId: string) => {
    // TODO: API call to toggle member status
    console.log('Toggle status for member:', memberId);
  };

  const handleInviteMember = (phone: string) => {
    // TODO: API call to send invite
    console.log('Invite member:', phone);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Member Management</h1>
          <p className="text-gray-600 mt-2">Manage group members and view their profiles</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={handleAddMember}>
            <Plus className="h-4 w-4 mr-2" />
            Add Member
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search members by name, phone, or email..."
                  value={searchTerm}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <select
                value={statusFilter}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStatusFilter(e.target.value as any)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">All Members</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <select
                value={sortBy}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSortBy(e.target.value as any)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="joinDate">Sort by Join Date</option>
                <option value="name">Sort by Name</option>
                <option value="reliability">Sort by Reliability</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Members List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Members ({filteredMembers.length})
          </CardTitle>
          <CardDescription>
            View and manage all group members
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Member
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Join Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reliability
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-600">
                              {member.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{member.name}</div>
                          <div className="text-sm text-gray-500">ID: {member.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-1 text-gray-400" />
                          {member.phone}
                        </div>
                        {member.email && (
                          <div className="flex items-center mt-1">
                            <Mail className="h-4 w-4 mr-1 text-gray-400" />
                            {member.email}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                        {new Date(member.joinDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className={`text-sm font-medium ${getReliabilityColor(member.reliability)}`}>
                          {member.reliability}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(member.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewProfile(member)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleStatus(member.id)}
                        >
                          {member.status === 'active' ? (
                            <UserX className="h-4 w-4 text-red-500" />
                          ) : (
                            <UserCheck className="h-4 w-4 text-green-500" />
                          )}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredMembers.length === 0 && (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No members found matching your criteria</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Member Profile Modal */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Member Profile</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedMember(null)}
              >
                ×
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Personal Information</h3>
                <div className="space-y-2">
                  <div><strong>Name:</strong> {selectedMember.name}</div>
                  <div><strong>Phone:</strong> {selectedMember.phone}</div>
                  {selectedMember.email && <div><strong>Email:</strong> {selectedMember.email}</div>}
                  <div><strong>Join Date:</strong> {new Date(selectedMember.joinDate).toLocaleDateString()}</div>
                  <div><strong>Status:</strong> {getStatusBadge(selectedMember.status)}</div>
                  <div><strong>Reliability:</strong> <span className={getReliabilityColor(selectedMember.reliability)}>{selectedMember.reliability}%</span></div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Recent Contributions</h3>
                <div className="space-y-2">
                  {selectedMember.contributionHistory.map((contrib, index) => (
                    <div key={index} className="flex justify-between items-center p-2 border rounded">
                      <div>
                        <div className="text-sm font-medium">Week {contrib.week}</div>
                        <div className="text-xs text-gray-500">{contrib.date}</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">RWF {contrib.amount.toLocaleString()}</span>
                        {contrib.status === 'paid' ? (
                          <Badge variant="success">Paid</Badge>
                        ) : (
                          <Badge variant="error">Missed</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Member Modal */}
      {showAddMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Add New Member</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAddMember(false)}
              >
                ×
              </Button>
            </div>
            
            <div className="space-y-4">
              <Input
                label="Phone Number"
                placeholder="+250 7xx xxx xxx"
              />
              <Button 
                className="w-full"
                onClick={() => handleInviteMember('+250788123456')}
              >
                Send Invite
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberManagement;
