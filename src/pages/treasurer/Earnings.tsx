import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import {
  DollarSign,
  TrendingUp,
  Calendar,
  Download,
  Search,
  Filter,
  Eye,
  CreditCard,
  PieChart,
  BarChart3,
  Wallet,
  FileText,
  CheckCircle,
  Clock,
} from 'lucide-react';

interface EarningRecord {
  id: string;
  weekNumber: number;
  cycleNumber: number;
  totalCollected: number;
  totalExpected: number;
  feeAmount: number;
  disbursementStatus: 'pending' | 'processing' | 'completed' | 'failed';
  disbursementDate?: string | null;
  transactionId?: string | null;
}

interface EarningsSummary {
  totalEarnings: number;
  thisWeek: number;
  thisMonth: number;
  thisCycle: number;
  pendingDisbursement: number;
  lastDisbursement: string;
}

const Earnings: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'cycle' | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecord, setSelectedRecord] = useState<EarningRecord | null>(null);

  // Mock data
  const earnings: EarningRecord[] = [
    {
      id: '1',
      weekNumber: 8,
      cycleNumber: 3,
      totalCollected: 600000,
      totalExpected: 600000,
      feeAmount: 21000,
      disbursementStatus: 'completed',
      disbursementDate: '2024-01-21T10:00:00Z',
      transactionId: 'DISB001',
    },
    {
      id: '2',
      weekNumber: 7,
      cycleNumber: 3,
      totalCollected: 575000,
      totalExpected: 600000,
      feeAmount: 20125,
      disbursementStatus: 'completed',
      disbursementDate: '2024-01-14T10:00:00Z',
      transactionId: 'DISB002',
    },
    {
      id: '3',
      weekNumber: 6,
      cycleNumber: 3,
      totalCollected: 600000,
      totalExpected: 600000,
      feeAmount: 21000,
      disbursementStatus: 'processing',
      disbursementDate: null,
      transactionId: null,
    },
    {
      id: '4',
      weekNumber: 5,
      cycleNumber: 3,
      totalCollected: 550000,
      totalExpected: 600000,
      feeAmount: 19250,
      disbursementStatus: 'pending',
      disbursementDate: null,
      transactionId: null,
    },
  ];

  const summary: EarningsSummary = {
    totalEarnings: 84000,
    thisWeek: 21000,
    thisMonth: 84000,
    thisCycle: 252000,
    pendingDisbursement: 19250,
    lastDisbursement: '2024-01-21T10:00:00Z',
  };

  const filteredEarnings = earnings.filter(earning => {
    const matchesSearch = earning.transactionId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         earning.weekNumber.toString().includes(searchTerm);
    
    switch (selectedPeriod) {
      case 'week':
        return earning.weekNumber === 8;
      case 'month':
        return earning.cycleNumber === 3 && earning.weekNumber >= 5 && earning.weekNumber <= 8;
      case 'cycle':
        return earning.cycleNumber === 3;
      default:
        return matchesSearch;
    }
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="success">Completed</Badge>;
      case 'processing':
        return <Badge variant="warning">Processing</Badge>;
      case 'pending':
        return <Badge variant="default">Pending</Badge>;
      case 'failed':
        return <Badge variant="error">Failed</Badge>;
      default:
        return <Badge variant="default">Unknown</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'processing':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-gray-400" />;
      case 'failed':
        return <CreditCard className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const handleViewDetails = (record: EarningRecord) => {
    setSelectedRecord(record);
  };

  const handleExportEarnings = () => {
    // Generate PDF content
    const pdfContent = generateEarningsPDF();
    
    // Create blob and download
    const blob = new Blob([pdfContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `earnings_summary_${new Date().toISOString().split('T')[0]}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const generateEarningsPDF = () => {
    // Simple PDF generation using basic text formatting
    // In a real implementation, you'd use a PDF library like jsPDF
    let pdfContent = `%PDF-1.4
%âãÏÓ
1 0 obj
<<
/Title (Earnings Summary)
/Creator (Ikimina Treasurer Dashboard)
/Producer (Ikimina Platform)
>>
endobj

2 0 obj
<<
/Type /Catalog
/Pages 3 0 R
>>
endobj

3 0 obj
<<
/Type /Pages
/Kids [4 0 R]
/Count 1
>>
endobj

4 0 obj
<<
/Type /Page
/Parent 3 0 R
/MediaBox [0 0 612 792]
/Contents 5 0 R
/Resources <<
/Font <<
/F1 6 0 R
>>
>>
>>
endobj

5 0 obj
<<
/Length ${200 + (filteredEarnings.length * 100)}
>>
stream
BT
/F1 12 Tf
50 750 Td
(EARNINGS SUMMARY) Tj
0 -20 Td
(Generated: ${new Date().toLocaleDateString()}) Tj
0 -40 Td
(Total Earnings: RWF ${summary.totalEarnings.toLocaleString()}) Tj
0 -20 Td
(This Week: RWF ${summary.thisWeek.toLocaleString()}) Tj
0 -20 Td
(This Month: RWF ${summary.thisMonth.toLocaleString()}) Tj
0 -20 Td
(This Cycle: RWF ${summary.thisCycle.toLocaleString()}) Tj
0 -20 Td
(Pending Disbursement: RWF ${summary.pendingDisbursement.toLocaleString()}) Tj
0 -40 Td
(EARNINGS HISTORY) Tj
0 -20 Td
`;

    filteredEarnings.forEach((earning, index) => {
      pdfContent += `(Week ${earning.weekNumber}, Cycle ${earning.cycleNumber}: RWF ${earning.feeAmount.toLocaleString()} - ${earning.disbursementStatus}) Tj
0 -15 Td
`;
    });

    pdfContent += `ET
endstream
endobj

6 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
endobj

xref
0 7
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000174 00000 n 
0000000300 00000 n 
0000000${300 + (filteredEarnings.length * 100)} 00000 n 
trailer
<<
/Size 7
/Root 2 0 R
>>
startxref
${400 + (filteredEarnings.length * 100)}
%%EOF`;

    return pdfContent;
  };

  const handleRequestDisbursement = (recordId: string) => {
    // TODO: API call to request disbursement
    console.log('Requesting disbursement for record:', recordId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Earnings Dashboard</h1>
          <p className="text-gray-600 mt-2">Track your earnings and manage disbursements</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleExportEarnings}>
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-primary-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-primary-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-600">Total Earnings</p>
                <p className="text-2xl font-bold text-gray-900">RWF {summary.totalEarnings.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-600">This Week</p>
                <p className="text-2xl font-bold text-gray-900">RWF {summary.thisWeek.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">RWF {summary.thisMonth.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <PieChart className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-600">This Cycle</p>
                <p className="text-2xl font-bold text-gray-900">RWF {summary.thisCycle.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fee Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Fee Breakdown
            </CardTitle>
            <CardDescription>
              35% of member contributions as processing fees
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="text-sm text-gray-600">Weekly Revenue</span>
                <span className="text-lg font-bold text-gray-900">RWF 60,000</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="text-sm text-gray-600">Your Commission (35%)</span>
                <span className="text-lg font-bold text-green-600">RWF 21,000</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="text-sm text-gray-600">Platform Fee (65%)</span>
                <span className="text-lg font-bold text-gray-900">RWF 39,000</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Wallet className="h-5 w-5 mr-2" />
              Disbursement Status
            </CardTitle>
            <CardDescription>
              Track your earnings and disbursement payments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <span className="text-sm font-medium">Pending Disbursement</span>
                </div>
                <span className="text-lg font-bold text-gray-900">RWF {summary.pendingDisbursement.toLocaleString()}</span>
              </div>
              
              <div className="text-sm text-gray-600">
                <p className="mb-2"><strong>Last Disbursement:</strong> {new Date(summary.lastDisbursement).toLocaleDateString()}</p>
                <p><strong>Transaction ID:</strong> {earnings.find(e => e.disbursementStatus === 'completed')?.transactionId || 'N/A'}</p>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by transaction ID..."
                  value={searchTerm}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <select
                value={selectedPeriod}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedPeriod(e.target.value as any)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">All Time</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="cycle">This Cycle</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Earnings Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            Earnings History ({filteredEarnings.length})
          </CardTitle>
          <CardDescription>
            Detailed breakdown of your earnings and disbursements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Week
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cycle
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Collected
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Expected
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Your Fee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Disbursement
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEarnings.map((earning) => (
                  <tr key={earning.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      Week {earning.weekNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      Cycle {earning.cycleNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      RWF {earning.totalCollected.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      RWF {earning.totalExpected.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                      RWF {earning.feeAmount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(earning.disbursementStatus)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {earning.disbursementDate ? new Date(earning.disbursementDate).toLocaleDateString() : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewDetails(earning)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {earning.disbursementStatus === 'pending' && (
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleRequestDisbursement(earning.id)}
                          >
                            <Wallet className="h-4 w-4 mr-1" />
                            Request
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredEarnings.length === 0 && (
            <div className="text-center py-8">
              <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No earnings records found matching your criteria</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Earning Detail Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Earning Details</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedRecord(null)}
              >
                ×
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Period</label>
                  <p className="text-sm text-gray-900">Week {selectedRecord.weekNumber}, Cycle {selectedRecord.cycleNumber}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Collection Rate</label>
                  <p className="text-sm text-gray-900">
                    {Math.round((selectedRecord.totalCollected / selectedRecord.totalExpected) * 100)}%
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Total Collected</label>
                  <p className="text-sm text-gray-900">RWF {selectedRecord.totalCollected.toLocaleString()}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Expected Collection</label>
                  <p className="text-sm text-gray-900">RWF {selectedRecord.totalExpected.toLocaleString()}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Your Earnings</label>
                  <p className="text-sm text-green-600 font-bold">RWF {selectedRecord.feeAmount.toLocaleString()}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Platform Fee</label>
                  <p className="text-sm text-gray-900">RWF {(selectedRecord.feeAmount * 65 / 35).toLocaleString()}</p>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <label className="block text-sm font-medium text-gray-700 mb-2">Disbursement Status</label>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(selectedRecord.disbursementStatus)}
                  <span className="text-sm font-medium">{getStatusBadge(selectedRecord.disbursementStatus)}</span>
                </div>
              </div>
              
              {selectedRecord.transactionId && (
                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-700">Transaction ID</label>
                  <p className="text-sm text-gray-900">{selectedRecord.transactionId}</p>
                </div>
              )}
              
              {selectedRecord.disbursementDate && (
                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-700">Disbursement Date</label>
                  <p className="text-sm text-gray-900">{new Date(selectedRecord.disbursementDate).toLocaleString()}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Earnings;
