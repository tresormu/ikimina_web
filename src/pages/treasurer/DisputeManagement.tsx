import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import {
  AlertTriangle,
  Search,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  MessageSquare,
  User,
  Calendar,
  ArrowUpRight,
  Download,
  Scale,
} from 'lucide-react';

interface Dispute {
  id: string;
  memberId: string;
  memberName: string;
  memberPhone: string;
  weekNumber: number;
  cycleNumber: number;
  description: string;
  status: 'open' | 'resolved' | 'escalated';
  resolutionNote?: string;
  createdAt: string;
  resolvedAt?: string;
  escalatedAt?: string;
  attachedMoMoRecord?: string;
}

interface Resolution {
  id: string;
  disputeId: string;
  note: string;
  resolvedBy: string;
  resolvedAt: string;
}

const DisputeManagement: React.FC = () => {
  const [disputes, setDisputes] = useState<Dispute[]>([
    {
      id: '1',
      memberId: '5',
      memberName: 'David Brown',
      memberPhone: '+250745678901',
      weekNumber: 8,
      cycleNumber: 3,
      description: 'I made payment but it\'s not showing as confirmed in the system. My transaction ID is TXN009 and money was deducted from my account.',
      status: 'open',
      createdAt: '2024-01-20T14:30:00Z',
      attachedMoMoRecord: 'TXN009',
    },
    {
      id: '2',
      memberId: '3',
      memberName: 'Bob Wilson',
      memberPhone: '+250734567890',
      weekNumber: 7,
      cycleNumber: 3,
      description: 'System shows I missed week 7 payment, but I paid on time. I have MoMo confirmation message.',
      status: 'resolved',
      resolutionNote: 'Verified payment with MTN MoMo API. Transaction confirmed. Updated system records.',
      createdAt: '2024-01-15T10:20:00Z',
      resolvedAt: '2024-01-15T16:45:00Z',
    },
    {
      id: '3',
      memberId: '2',
      memberName: 'Jane Smith',
      memberPhone: '+250723456789',
      weekNumber: 6,
      cycleNumber: 3,
      description: 'Incorrect amount showing for my contribution. I paid RWF 25,000 but system shows RWF 20,000.',
      status: 'escalated',
      createdAt: '2024-01-10T09:15:00Z',
      escalatedAt: '2024-01-12T11:30:00Z',
    },
    {
      id: '4',
      memberId: '1',
      memberName: 'John Doe',
      memberPhone: '+250712345678',
      weekNumber: 5,
      cycleNumber: 3,
      description: 'Unable to reach recipient for week 5 collection. Phone number seems to be incorrect.',
      status: 'resolved',
      resolutionNote: 'Updated recipient phone number. Member was contacted and payment rescheduled.',
      createdAt: '2024-01-08T16:45:00Z',
      resolvedAt: '2024-01-09T10:20:00Z',
    },
  ]);

  const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'open' | 'resolved' | 'escalated'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showResolveModal, setShowResolveModal] = useState(false);
  const [showEscalateModal, setShowEscalateModal] = useState(false);
  const [resolutionNote, setResolutionNote] = useState('');
  const [escalationReason, setEscalationReason] = useState('');

  const filteredDisputes = disputes.filter(dispute => {
    const matchesSearch = dispute.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dispute.memberPhone.includes(searchTerm) ||
                         dispute.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || dispute.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <Badge variant="warning">Open</Badge>;
      case 'resolved':
        return <Badge variant="success">Resolved</Badge>;
      case 'escalated':
        return <Badge variant="error">Escalated</Badge>;
      default:
        return <Badge variant="default">Unknown</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'resolved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'escalated':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const handleViewDetails = (dispute: Dispute) => {
    setSelectedDispute(dispute);
  };

  const handleResolveDispute = (dispute: Dispute) => {
    setSelectedDispute(dispute);
    setShowResolveModal(true);
  };

  const handleEscalateDispute = (dispute: Dispute) => {
    setSelectedDispute(dispute);
    setShowEscalateModal(true);
  };

  const submitResolution = () => {
    if (selectedDispute && resolutionNote.trim()) {
      // TODO: API call to resolve dispute
      const updatedDisputes = disputes.map(d =>
        d.id === selectedDispute.id
          ? { ...d, status: 'resolved' as const, resolutionNote, resolvedAt: new Date().toISOString() }
          : d
      );
      setDisputes(updatedDisputes);
      
      setShowResolveModal(false);
      setResolutionNote('');
      setSelectedDispute(null);
      
      console.log('Resolved dispute:', selectedDispute.id, 'with note:', resolutionNote);
    }
  };

  const submitEscalation = () => {
    if (selectedDispute && escalationReason.trim()) {
      // TODO: API call to escalate dispute
      const updatedDisputes = disputes.map(d =>
        d.id === selectedDispute.id
          ? { ...d, status: 'escalated' as const, escalatedAt: new Date().toISOString() }
          : d
      );
      setDisputes(updatedDisputes);
      
      setShowEscalateModal(false);
      setEscalationReason('');
      setSelectedDispute(null);
      
      console.log('Escalated dispute:', selectedDispute.id, 'with reason:', escalationReason);
    }
  };

  const handleExportDisputes = () => {
    // TODO: Export disputes as spreadsheet
    console.log('Exporting disputes...');
  };

  const getDisputeStats = () => {
    const open = disputes.filter(d => d.status === 'open').length;
    const resolved = disputes.filter(d => d.status === 'resolved').length;
    const escalated = disputes.filter(d => d.status === 'escalated').length;
    
    return { open, resolved, escalated };
  };

  const stats = getDisputeStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dispute Management</h1>
          <p className="text-gray-600 mt-2">Handle member disputes and resolution workflow</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleExportDisputes}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-600">Open Disputes</p>
                <p className="text-xl font-bold text-gray-900">{stats.open}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-600">Resolved</p>
                <p className="text-xl font-bold text-gray-900">{stats.resolved}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-600">Escalated</p>
                <p className="text-xl font-bold text-gray-900">{stats.escalated}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="p-2 bg-primary-100 rounded-lg">
                <Scale className="h-6 w-6 text-primary-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-xl font-bold text-gray-900">{disputes.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Search Disputes</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by member name, phone, or description..."
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
                <option value="all">All Status</option>
                <option value="open">Open</option>
                <option value="resolved">Resolved</option>
                <option value="escalated">Escalated</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Disputes List */}
      <Card>
        <CardHeader>
          <CardTitle>
            Disputes ({filteredDisputes.length})
          </CardTitle>
          <CardDescription>
            Review and manage member payment disputes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredDisputes.map((dispute) => (
              <div key={dispute.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(dispute.status)}
                    <div>
                      <div className="font-medium text-gray-900">{dispute.memberName}</div>
                      <div className="text-sm text-gray-500">{dispute.memberPhone}</div>
                    </div>
                    {getStatusBadge(dispute.status)}
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(dispute.createdAt).toLocaleDateString()}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>Week {dispute.weekNumber}, Cycle {dispute.cycleNumber}</span>
                  </div>
                  
                  <div className="text-sm text-gray-900">
                    <MessageSquare className="h-4 w-4 inline mr-2 text-gray-400" />
                    <strong>Issue:</strong> {dispute.description}
                  </div>
                  
                  {dispute.attachedMoMoRecord && (
                    <div className="text-sm text-gray-600">
                      <strong>MoMo Record:</strong> {dispute.attachedMoMoRecord}
                    </div>
                  )}
                  
                  {dispute.resolutionNote && (
                    <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded">
                      <div className="text-sm">
                        <strong>Resolution:</strong> {dispute.resolutionNote}
                      </div>
                    </div>
                  )}
                  
                  {dispute.escalatedAt && (
                    <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded">
                      <div className="text-sm text-red-600">
                        <AlertTriangle className="h-4 w-4 inline mr-1" />
                        <strong>Escalated to admin on:</strong> {new Date(dispute.escalatedAt).toLocaleDateString()}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-end space-x-2 mt-3 pt-3 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewDetails(dispute)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                  
                  {dispute.status === 'open' && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleResolveDispute(dispute)}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Resolve
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEscalateDispute(dispute)}
                      >
                        <ArrowUpRight className="h-4 w-4 mr-1" />
                        Escalate
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredDisputes.length === 0 && (
            <div className="text-center py-8">
              <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No disputes found matching your criteria</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dispute Detail Modal */}
      {selectedDispute && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Dispute Details</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedDispute(null)}
              >
                ×
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Member Information</h3>
                <div className="space-y-2">
                  <div><strong>Name:</strong> {selectedDispute.memberName}</div>
                  <div><strong>Phone:</strong> {selectedDispute.memberPhone}</div>
                  <div><strong>Week:</strong> Week {selectedDispute.weekNumber}, Cycle {selectedDispute.cycleNumber}</div>
                  <div><strong>Status:</strong> {getStatusBadge(selectedDispute.status)}</div>
                  <div><strong>Reported:</strong> {new Date(selectedDispute.createdAt).toLocaleString()}</div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Dispute Details</h3>
                <div className="space-y-2">
                  <div><strong>Description:</strong></div>
                  <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded">{selectedDispute.description}</p>
                  
                  {selectedDispute.attachedMoMoRecord && (
                    <div>
                      <strong>MoMo Record:</strong> {selectedDispute.attachedMoMoRecord}
                    </div>
                  )}
                  
                  {selectedDispute.resolutionNote && (
                    <div>
                      <strong>Resolution:</strong>
                      <div className="text-sm text-green-700 bg-green-50 p-3 rounded mt-2">
                        {selectedDispute.resolutionNote}
                      </div>
                    </div>
                  )}
                  
                  {selectedDispute.resolvedAt && (
                    <div><strong>Resolved:</strong> {new Date(selectedDispute.resolvedAt).toLocaleString()}</div>
                  )}
                  
                  {selectedDispute.escalatedAt && (
                    <div><strong>Escalated:</strong> {new Date(selectedDispute.escalatedAt).toLocaleString()}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Resolve Modal */}
      {showResolveModal && selectedDispute && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Resolve Dispute</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowResolveModal(false)}
              >
                ×
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="text-sm text-gray-600 mb-2">
                <p><strong>Member:</strong> {selectedDispute.memberName}</p>
                <p><strong>Issue:</strong> {selectedDispute.description}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Resolution Note</label>
                <textarea
                  rows={4}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Describe how this dispute was resolved..."
                  value={resolutionNote}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setResolutionNote(e.target.value)}
                />
              </div>
              
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setShowResolveModal(false)}
                >
                  Cancel
                </Button>
                <Button onClick={submitResolution}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark Resolved
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Escalate Modal */}
      {showEscalateModal && selectedDispute && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Escalate Dispute</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowEscalateModal(false)}
              >
                ×
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="text-sm text-gray-600 mb-2">
                <p><strong>Member:</strong> {selectedDispute.memberName}</p>
                <p><strong>Issue:</strong> {selectedDispute.description}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Escalation Reason</label>
                <textarea
                  rows={4}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Explain why this dispute needs admin intervention..."
                  value={escalationReason}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setEscalationReason(e.target.value)}
                />
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                <p className="text-sm text-yellow-800">
                  <strong>⚠️ This will escalate dispute to platform administrators for review.</strong>
                </p>
              </div>
              
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setShowEscalateModal(false)}
                >
                  Cancel
                </Button>
                <Button onClick={submitEscalation}>
                  <ArrowUpRight className="h-4 w-4 mr-2" />
                  Escalate to Admin
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisputeManagement;
