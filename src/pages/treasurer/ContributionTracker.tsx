import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import {
  Bell,
  Download,
  BarChart3,
  TrendingUp,
  Target,
  TrendingDown,
  Zap,
  Grid,
  List,
  Filter,
  Calendar,
  Search,
  Eye,
  FileSpreadsheet,
  DollarSign,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from 'lucide-react';
import { StatusBadge } from '../../components/contributions/StatusBadge';
import { PaymentMethodBadge } from '../../components/contributions/PaymentMethodBadge';
import { StatsCard } from '../../components/contributions/StatsCard';
import { ContributionRow } from '../../components/contributions/ContributionRow';
import { PaymentReminders } from '../../components/contributions/PaymentReminders';
import { ViewModeSelector } from '../../components/contributions/ViewModeSelector';

interface Contribution {
  id: string;
  memberId: string;
  memberName: string;
  memberPhone: string;
  weekNumber: number;
  cycleNumber: number;
  amount: number;
  paymentMethod: 'mobile_money' | 'bank_transfer' | 'cash';
  transactionId?: string;
  status: 'paid' | 'missed' | 'pending' | 'partial';
  submittedAt: string;
  confirmedAt?: string;
  failureReason?: string;
  lateFee?: number;
  momoConfirmationCode?: string;
  senderName?: string;
  senderPhone?: string;
}

interface WeeklyStats {
  weekNumber: number;
  cycleNumber: number;
  totalExpected: number;
  totalCollected: number;
  paidCount: number;
  missedCount: number;
  pendingCount: number;
  collectionRate: number;
  averagePaymentTime: number;
}

interface PaymentReminder {
  memberId: string;
  memberName: string;
  amount: number;
  daysOverdue: number;
  lastContactDate?: string;
}

// Grid cell data structure
interface GridCell {
  memberId: string;
  memberName: string;
  weekNumber: number;
  status: 'paid' | 'missed' | 'pending' | 'partial';
  amount: number;
  transactionId?: string;
  paymentMethod?: 'mobile_money' | 'bank_transfer' | 'cash';
  confirmedAt?: string;
}

interface TransactionDetail {
  id: string;
  memberId: string;
  memberName: string;
  memberPhone: string;
  weekNumber: number;
  cycleNumber: number;
  amount: number;
  paymentMethod: 'mobile_money' | 'bank_transfer' | 'cash';
  transactionId: string;
  status: 'paid' | 'missed' | 'pending' | 'partial';
  submittedAt: string;
  confirmedAt?: string;
  failureReason?: string;
  lateFee?: number;
  momoConfirmationCode?: string;
  senderName?: string;
  senderPhone?: string;
}

const ContributionTracker: React.FC = () => {
  const [selectedCycle, setSelectedCycle] = useState(3);
  const [selectedWeek, setSelectedWeek] = useState(8);
  const [viewMode, setViewMode] = useState<'grid' | 'overview' | 'detailed' | 'analytics'>('grid');
  const [showReminders, setShowReminders] = useState(false);
  const [selectedCell, setSelectedCell] = useState<GridCell | null>(null);
  const [showTransactionDetail, setShowTransactionDetail] = useState(false);
  const [filterCycle, setFilterCycle] = useState(3);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  const members = [
    { id: '1', name: 'John Doe', phone: '+250712345678' },
    { id: '2', name: 'Jane Smith', phone: '+250723456789' },
    { id: '3', name: 'Bob Wilson', phone: '+250734567890' },
    { id: '4', name: 'Alice Mugisha', phone: '+250788123456' },
    { id: '5', name: 'David Brown', phone: '+250745678901' },
    { id: '6', name: 'Grace Kimani', phone: '+250756789012' },
    { id: '7', name: 'Michael Tumusiime', phone: '+250767890123' },
    { id: '8', name: 'Sarah Nakato', phone: '+250778901234' }
  ];

  const contributions: Contribution[] = [
    // Week 8 contributions
    { id: '1', memberId: '1', memberName: 'John Doe', memberPhone: '+250712345678', weekNumber: 8, cycleNumber: 3, amount: 25000, paymentMethod: 'mobile_money', transactionId: 'MOMO123456', status: 'paid', submittedAt: '2024-01-20T09:15:00Z', confirmedAt: '2024-01-20T09:20:00Z', momoConfirmationCode: 'MM123456', senderName: 'John Doe', senderPhone: '+250712345678' },
    { id: '2', memberId: '2', memberName: 'Jane Smith', memberPhone: '+250723456789', weekNumber: 8, cycleNumber: 3, amount: 25000, paymentMethod: 'bank_transfer', transactionId: 'BANK789012', status: 'paid', submittedAt: '2024-01-19T14:30:00Z', confirmedAt: '2024-01-20T08:00:00Z' },
    { id: '3', memberId: '3', memberName: 'Bob Wilson', memberPhone: '+250734567890', weekNumber: 8, cycleNumber: 3, amount: 15000, paymentMethod: 'mobile_money', transactionId: 'MOMO345678', status: 'partial', submittedAt: '2024-01-20T16:45:00Z', confirmedAt: '2024-01-20T16:50:00Z', momoConfirmationCode: 'MM345678' },
    { id: '4', memberId: '4', memberName: 'Alice Mugisha', memberPhone: '+250788123456', weekNumber: 8, cycleNumber: 3, amount: 25000, status: 'pending', paymentMethod: 'mobile_money', submittedAt: '2024-01-18T11:00:00Z' },
    { id: '5', memberId: '5', memberName: 'David Brown', memberPhone: '+250745678901', weekNumber: 8, cycleNumber: 3, amount: 25000, status: 'missed', paymentMethod: 'mobile_money', failureReason: 'Insufficient funds', lateFee: 2500, submittedAt: '2024-01-17T10:00:00Z' },
    { id: '6', memberId: '6', memberName: 'Grace Kimani', memberPhone: '+250756789012', weekNumber: 8, cycleNumber: 3, amount: 25000, paymentMethod: 'mobile_money', transactionId: 'MOMO901234', status: 'paid', submittedAt: '2024-01-20T12:30:00Z', confirmedAt: '2024-01-20T12:35:00Z', momoConfirmationCode: 'MM901234' },
    { id: '7', memberId: '7', memberName: 'Michael Tumusiime', memberPhone: '+250767890123', weekNumber: 8, cycleNumber: 3, amount: 25000, paymentMethod: 'cash', status: 'paid', submittedAt: '2024-01-19T15:00:00Z', confirmedAt: '2024-01-19T15:05:00Z' },
    { id: '8', memberId: '8', memberName: 'Sarah Nakato', memberPhone: '+250778901234', weekNumber: 8, cycleNumber: 3, amount: 25000, status: 'pending', paymentMethod: 'mobile_money', submittedAt: '2024-01-20T18:00:00Z' },
    
    // Week 7 contributions
    { id: '9', memberId: '1', memberName: 'John Doe', memberPhone: '+250712345678', weekNumber: 7, cycleNumber: 3, amount: 25000, paymentMethod: 'mobile_money', transactionId: 'MOMO234567', status: 'paid', submittedAt: '2024-01-13T10:00:00Z', confirmedAt: '2024-01-13T10:05:00Z', momoConfirmationCode: 'MM234567' },
    { id: '10', memberId: '2', memberName: 'Jane Smith', memberPhone: '+250723456789', weekNumber: 7, cycleNumber: 3, amount: 25000, paymentMethod: 'mobile_money', transactionId: 'MOMO345678', status: 'paid', submittedAt: '2024-01-12T14:00:00Z', confirmedAt: '2024-01-12T14:05:00Z', momoConfirmationCode: 'MM345678' },
    { id: '11', memberId: '3', memberName: 'Bob Wilson', memberPhone: '+250734567890', weekNumber: 7, cycleNumber: 3, amount: 25000, paymentMethod: 'bank_transfer', transactionId: 'BANK456789', status: 'paid', submittedAt: '2024-01-14T09:00:00Z', confirmedAt: '2024-01-14T09:30:00Z' },
    { id: '12', memberId: '4', memberName: 'Alice Mugisha', memberPhone: '+250788123456', weekNumber: 7, cycleNumber: 3, amount: 25000, paymentMethod: 'mobile_money', transactionId: 'MOMO456789', status: 'paid', submittedAt: '2024-01-13T16:00:00Z', confirmedAt: '2024-01-13T16:05:00Z', momoConfirmationCode: 'MM456789' },
    { id: '13', memberId: '5', memberName: 'David Brown', memberPhone: '+250745678901', weekNumber: 7, cycleNumber: 3, amount: 25000, paymentMethod: 'mobile_money', transactionId: 'MOMO567890', status: 'paid', submittedAt: '2024-01-15T11:00:00Z', confirmedAt: '2024-01-15T11:05:00Z', momoConfirmationCode: 'MM567890' },
    { id: '14', memberId: '6', memberName: 'Grace Kimani', memberPhone: '+250756789012', weekNumber: 7, cycleNumber: 3, amount: 25000, paymentMethod: 'mobile_money', transactionId: 'MOMO678901', status: 'paid', submittedAt: '2024-01-14T13:00:00Z', confirmedAt: '2024-01-14T13:05:00Z', momoConfirmationCode: 'MM678901' },
    { id: '15', memberId: '7', memberName: 'Michael Tumusiime', memberPhone: '+250767890123', weekNumber: 7, cycleNumber: 3, amount: 25000, paymentMethod: 'cash', status: 'paid', submittedAt: '2024-01-13T15:00:00Z', confirmedAt: '2024-01-13T15:05:00Z' },
    { id: '16', memberId: '8', memberName: 'Sarah Nakato', memberPhone: '+250778901234', weekNumber: 7, cycleNumber: 3, amount: 25000, paymentMethod: 'mobile_money', transactionId: 'MOMO789012', status: 'paid', submittedAt: '2024-01-12T17:00:00Z', confirmedAt: '2024-01-12T17:05:00Z', momoConfirmationCode: 'MM789012' },
    
    // Week 6 contributions
    { id: '17', memberId: '1', memberName: 'John Doe', memberPhone: '+250712345678', weekNumber: 6, cycleNumber: 3, amount: 25000, paymentMethod: 'mobile_money', transactionId: 'MOMO890123', status: 'paid', submittedAt: '2024-01-06T09:00:00Z', confirmedAt: '2024-01-06T09:05:00Z', momoConfirmationCode: 'MM890123' },
    { id: '18', memberId: '2', memberName: 'Jane Smith', memberPhone: '+250723456789', weekNumber: 6, cycleNumber: 3, amount: 25000, paymentMethod: 'mobile_money', transactionId: 'MOMO901234', status: 'paid', submittedAt: '2024-01-07T14:00:00Z', confirmedAt: '2024-01-07T14:05:00Z', momoConfirmationCode: 'MM901234' },
    { id: '19', memberId: '3', memberName: 'Bob Wilson', memberPhone: '+250734567890', weekNumber: 6, cycleNumber: 3, amount: 20000, paymentMethod: 'mobile_money', transactionId: 'MOMO012345', status: 'partial', submittedAt: '2024-01-08T10:00:00Z', confirmedAt: '2024-01-08T10:05:00Z', momoConfirmationCode: 'MM012345' },
    { id: '20', memberId: '4', memberName: 'Alice Mugisha', memberPhone: '+250788123456', weekNumber: 6, cycleNumber: 3, amount: 25000, paymentMethod: 'bank_transfer', transactionId: 'BANK123456', status: 'paid', submittedAt: '2024-01-05T15:00:00Z', confirmedAt: '2024-01-05T15:30:00Z' },
    { id: '21', memberId: '5', memberName: 'David Brown', memberPhone: '+250745678901', weekNumber: 6, cycleNumber: 3, amount: 25000, paymentMethod: 'mobile_money', transactionId: 'MOMO123456', status: 'paid', submittedAt: '2024-01-06T11:00:00Z', confirmedAt: '2024-01-06T11:05:00Z', momoConfirmationCode: 'MM123456' },
    { id: '22', memberId: '6', memberName: 'Grace Kimani', memberPhone: '+250756789012', weekNumber: 6, cycleNumber: 3, amount: 25000, status: 'missed', paymentMethod: 'mobile_money', failureReason: 'Network error', lateFee: 2500, submittedAt: '2024-01-04T10:00:00Z' },
    { id: '23', memberId: '7', memberName: 'Michael Tumusiime', memberPhone: '+250767890123', weekNumber: 6, cycleNumber: 3, amount: 25000, paymentMethod: 'cash', status: 'paid', submittedAt: '2024-01-07T15:00:00Z', confirmedAt: '2024-01-07T15:05:00Z' },
    { id: '24', memberId: '8', memberName: 'Sarah Nakato', memberPhone: '+250778901234', weekNumber: 6, cycleNumber: 3, amount: 25000, paymentMethod: 'mobile_money', transactionId: 'MOMO234567', status: 'paid', submittedAt: '2024-01-08T16:00:00Z', confirmedAt: '2024-01-08T16:05:00Z', momoConfirmationCode: 'MM234567' }
  ];

  const weeklyStats: WeeklyStats[] = [
    {
      weekNumber: 8,
      cycleNumber: 3,
      totalExpected: 125000,
      totalCollected: 65000,
      paidCount: 2,
      missedCount: 1,
      pendingCount: 1,
      collectionRate: 52.0,
      averagePaymentTime: 12.5
    },
    {
      weekNumber: 7,
      cycleNumber: 3,
      totalExpected: 125000,
      totalCollected: 120000,
      paidCount: 4,
      missedCount: 0,
      pendingCount: 0,
      collectionRate: 96.0,
      averagePaymentTime: 8.2
    },
    {
      weekNumber: 6,
      cycleNumber: 3,
      totalExpected: 125000,
      totalCollected: 115000,
      paidCount: 4,
      missedCount: 1,
      pendingCount: 0,
      collectionRate: 92.0,
      averagePaymentTime: 10.1
    }
  ];

  const paymentReminders: PaymentReminder[] = [
    {
      memberId: '4',
      memberName: 'Alice Mugisha',
      amount: 25000,
      daysOverdue: 2,
      lastContactDate: '2024-01-18'
    },
    {
      memberId: '5',
      memberName: 'David Brown',
      amount: 27500,
      daysOverdue: 3,
      lastContactDate: '2024-01-17'
    }
  ];

  const currentWeekStats = weeklyStats.find(stat => 
    stat.weekNumber === selectedWeek && stat.cycleNumber === selectedCycle
  );

  const currentWeekContributions = contributions.filter(c => 
    c.weekNumber === selectedWeek && c.cycleNumber === selectedCycle
  );

  // Grid view helper functions
  const getWeeksInCycle = (cycleNumber: number) => {
    const weeks = [...new Set(contributions
      .filter(c => c.cycleNumber === cycleNumber)
      .map(c => c.weekNumber)
    )].sort((a, b) => b - a); // Sort descending (most recent first)
    return weeks.length > 0 ? weeks : [8, 7, 6, 5, 4, 3, 2, 1]; // Default weeks if no data
  };

  const getGridData = () => {
    const weeks = getWeeksInCycle(selectedCycle);
    const gridData: GridCell[] = [];
    
    weeks.forEach(week => {
      members.forEach(member => {
        const contribution = contributions.find(c => 
          c.memberId === member.id && 
          c.weekNumber === week && 
          c.cycleNumber === selectedCycle
        );
        
        gridData.push({
          memberId: member.id,
          memberName: member.name,
          weekNumber: week,
          status: contribution?.status || 'pending',
          amount: contribution?.amount || 25000,
          transactionId: contribution?.transactionId,
          paymentMethod: contribution?.paymentMethod,
          confirmedAt: contribution?.confirmedAt
        });
      });
    });
    
    return gridData;
  };

  const getWeeklyTotals = () => {
    const weeks = getWeeksInCycle(selectedCycle);
    const totals: { week: number; collected: number; expected: number }[] = [];
    
    weeks.forEach(week => {
      const weekContributions = contributions.filter(c => 
        c.weekNumber === week && c.cycleNumber === selectedCycle
      );
      const collected = weekContributions
        .filter(c => c.status === 'paid')
        .reduce((sum, c) => sum + c.amount, 0);
      const expected = members.length * 25000; // Assuming 25000 per member
      
      totals.push({ week, collected, expected });
    });
    
    return totals;
  };

  const handleCellClick = (cell: GridCell) => {
    setSelectedCell(cell);
    setShowTransactionDetail(true);
  };

  const handleSendReminder = (memberId: string) => {
    console.log('Sending reminder to member:', memberId);
  };

  const handleConfirmPayment = (contributionId: string) => {
    console.log('Confirming payment:', contributionId);
  };

  const handleExportReport = () => {
    // Create CSV content for spreadsheet export
    const weeks = getWeeksInCycle(selectedCycle);
    const gridData = getGridData();
    const weeklyTotals = getWeeklyTotals();
    
    // Create CSV header
    let csvContent = 'Member,';
    weeks.forEach(week => {
      csvContent += `Week ${week} Status,Week ${week} Amount,Week ${week} Transaction ID,Week ${week} Payment Method,`;
    });
    csvContent = csvContent.slice(0, -1) + '\n'; // Remove last comma and add newline
    
    // Add member rows
    members.forEach(member => {
      csvContent += `"${member.name}",`;
      weeks.forEach(week => {
        const cell = gridData.find(c => c.memberId === member.id && c.weekNumber === week);
        csvContent += `"${cell?.status || 'pending'}","${cell?.amount || 25000}","${cell?.transactionId || ''}","${cell?.paymentMethod || ''}",`;
      });
      csvContent = csvContent.slice(0, -1) + '\n'; // Remove last comma and add newline
    });
    
    // Add summary row
    csvContent += '"TOTAL COLLECTED",';
    weeklyTotals.forEach(({ collected, expected }) => {
      csvContent += `"${collected} of ${expected} (${((collected / expected) * 100).toFixed(1)}%)","","","",`;
    });
    csvContent = csvContent.slice(0, -1) + '\n';
    
    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `contribution_tracker_cycle_${selectedCycle}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (viewMode === 'grid') {
    const weeks = getWeeksInCycle(selectedCycle);
    const gridData = getGridData();
    const weeklyTotals = getWeeklyTotals();

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Contribution Tracker - Grid View</h1>
            <p className="text-gray-600 mt-2">Member contribution matrix by weeks</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleExportReport}>
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              Export Spreadsheet
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium">Cycle:</label>
                <select 
                  value={selectedCycle}
                  onChange={(e) => setSelectedCycle(Number(e.target.value))}
                  className="px-3 py-1 border rounded-md"
                >
                  <option value={3}>Cycle 3</option>
                  <option value={2}>Cycle 2</option>
                  <option value={1}>Cycle 1</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium">Date Range:</label>
                <Input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                  className="w-40"
                />
                <span>to</span>
                <Input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                  className="w-40"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Grid */}
        <Card>
          <CardHeader>
            <CardTitle>Contribution Matrix - Cycle {selectedCycle}</CardTitle>
            <CardDescription>
              Click any cell to view detailed transaction information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border border-gray-300 bg-gray-50 p-2 text-left font-medium sticky left-0 bg-gray-50">
                      Member
                    </th>
                    {weeks.map(week => (
                      <th key={week} className="border border-gray-300 bg-gray-50 p-2 text-center font-medium min-w-[100px]">
                        Week {week}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {members.map(member => (
                    <tr key={member.id}>
                      <td className="border border-gray-300 bg-gray-50 p-2 font-medium sticky left-0 bg-gray-50">
                        {member.name}
                      </td>
                      {weeks.map(week => {
                        const cell = gridData.find(c => 
                          c.memberId === member.id && c.weekNumber === week
                        );
                        return (
                          <td
                            key={week}
                            onClick={() => cell && handleCellClick(cell)}
                            className={`border border-gray-300 p-2 text-center cursor-pointer transition-colors ${
                              cell?.status === 'paid' 
                                ? 'bg-green-100 hover:bg-green-200 text-green-800' 
                                : cell?.status === 'missed'
                                ? 'bg-red-100 hover:bg-red-200 text-red-800'
                                : cell?.status === 'partial'
                                ? 'bg-yellow-100 hover:bg-yellow-200 text-yellow-800'
                                : 'bg-gray-50 hover:bg-gray-100 text-gray-600'
                            }`}
                          >
                            <div className="flex flex-col items-center">
                              {cell?.status === 'paid' && <CheckCircle className="h-4 w-4 mb-1" />}
                              {cell?.status === 'missed' && <XCircle className="h-4 w-4 mb-1" />}
                              {cell?.status === 'partial' && <AlertTriangle className="h-4 w-4 mb-1" />}
                              {cell?.status === 'pending' && <Clock className="h-4 w-4 mb-1" />}
                              <span className="text-xs">
                                {cell?.amount ? `${cell.amount.toLocaleString()}` : '25,000'}
                              </span>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                  {/* Summary Row */}
                  <tr className="font-semibold bg-blue-50">
                    <td className="border border-gray-300 bg-blue-100 p-2 sticky left-0 bg-blue-100">
                      Total Collected
                    </td>
                    {weeklyTotals.map(({ week, collected, expected }) => (
                      <td key={week} className="border border-gray-300 bg-blue-100 p-2 text-center">
                        <div className="flex flex-col">
                          <span className="text-green-700">{collected.toLocaleString()}</span>
                          <span className="text-xs text-gray-600">of {expected.toLocaleString()}</span>
                          <span className="text-xs text-blue-600">
                            {((collected / expected) * 100).toFixed(1)}%
                          </span>
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Transaction Detail Modal */}
        {showTransactionDetail && selectedCell && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Transaction Details</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowTransactionDetail(false)}
                >
                  ×
                </Button>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Member</p>
                  <p className="font-medium">{selectedCell.memberName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Week</p>
                  <p className="font-medium">Week {selectedCell.weekNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <StatusBadge status={selectedCell.status} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Amount</p>
                  <p className="font-medium">{selectedCell.amount?.toLocaleString()} RWF</p>
                </div>
                {selectedCell.transactionId && (
                  <div>
                    <p className="text-sm text-gray-600">Transaction ID</p>
                    <p className="font-medium">{selectedCell.transactionId}</p>
                  </div>
                )}
                {selectedCell.paymentMethod && (
                  <div>
                    <p className="text-sm text-gray-600">Payment Method</p>
                    <PaymentMethodBadge method={selectedCell.paymentMethod} />
                  </div>
                )}
                {selectedCell.confirmedAt && (
                  <div>
                    <p className="text-sm text-gray-600">Confirmed At</p>
                    <p className="font-medium">
                      {new Date(selectedCell.confirmedAt).toLocaleString()}
                    </p>
                  </div>
                )}
              </div>
              <div className="mt-6 flex space-x-2">
                <Button variant="outline" className="flex-1">
                  Edit
                </Button>
                <Button variant="primary" className="flex-1">
                  Mark as Paid
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (viewMode === 'overview') {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Contribution Tracker</h1>
            <p className="text-gray-600 mt-2">Monitor and manage member contributions in real-time</p>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              onClick={() => setShowReminders(!showReminders)}
              className={showReminders ? 'bg-orange-50 border-orange-200' : ''}
            >
              <Bell className="h-4 w-4 mr-2" />
              Reminders ({paymentReminders.length})
            </Button>
            <Button variant="outline" onClick={handleExportReport}>
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Payment Reminders Alert */}
        {showReminders && (
          <PaymentReminders 
            reminders={paymentReminders}
            onSendReminder={handleSendReminder}
          />
        )}

        {/* Week/Cycle Selector and View Mode */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
              <div className="flex space-x-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cycle</label>
                  <select
                    value={selectedCycle}
                    onChange={(e) => setSelectedCycle(Number(e.target.value))}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value={1}>Cycle 1</option>
                    <option value={2}>Cycle 2</option>
                    <option value={3}>Cycle 3</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Week</label>
                  <select
                    value={selectedWeek}
                    onChange={(e) => setSelectedWeek(Number(e.target.value))}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {Array.from({ length: 8 }, (_, i) => i + 1).map(week => (
                      <option key={week} value={week}>Week {week}</option>
                    ))}
                  </select>
                </div>
              </div>
              <ViewModeSelector 
                viewMode={viewMode}
                setViewMode={setViewMode}
              />
            </div>
          </CardContent>
        </Card>

        {/* Summary Cards */}
        {currentWeekStats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              type="collected"
              value={`RWF ${currentWeekStats.totalCollected.toLocaleString()}`}
              subtitle={`of RWF ${currentWeekStats.totalExpected.toLocaleString()}`}
            />
            <StatsCard
              type="rate"
              value={`${currentWeekStats.collectionRate.toFixed(1)}%`}
              subtitle={`${currentWeekStats.paidCount} of ${currentWeekStats.paidCount + currentWeekStats.missedCount + currentWeekStats.pendingCount} members`}
              rate={currentWeekStats.collectionRate}
            />
            <StatsCard
              type="time"
              value={`${currentWeekStats.averagePaymentTime.toFixed(1)}h`}
              subtitle="After deadline"
            />
            <StatsCard
              type="missed"
              value={currentWeekStats.missedCount.toString()}
              subtitle={`${currentWeekStats.pendingCount} pending`}
            />
          </div>
        )}

        {/* Current Week Contributions */}
        <Card>
          <CardHeader>
            <CardTitle>Week {selectedWeek} Contributions</CardTitle>
            <CardDescription>
              Real-time contribution status for cycle {selectedCycle}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {currentWeekContributions.map((contribution) => (
                <ContributionRow
                  key={contribution.id}
                  contribution={contribution}
                  onConfirm={handleConfirmPayment}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (viewMode === 'detailed') {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Detailed Contribution View</h1>
            <p className="text-gray-600 mt-2">Complete contribution history and management</p>
          </div>
          <Button variant="outline" onClick={() => setViewMode('overview')}>
            <BarChart3 className="h-4 w-4 mr-2" />
            Back to Overview
          </Button>
        </div>

        {/* Detailed contributions table */}
        <Card>
          <CardHeader>
            <CardTitle>All Contributions</CardTitle>
            <CardDescription>
              Complete history with detailed transaction information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Member</th>
                    <th className="text-left p-2">Week/Cycle</th>
                    <th className="text-left p-2">Amount</th>
                    <th className="text-left p-2">Method</th>
                    <th className="text-left p-2">Status</th>
                    <th className="text-left p-2">Transaction ID</th>
                    <th className="text-left p-2">Submitted</th>
                    <th className="text-left p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {contributions.map((contribution) => (
                    <ContributionRow
                      key={contribution.id}
                      contribution={contribution}
                      compact
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Analytics view
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contribution Analytics</h1>
          <p className="text-gray-600 mt-2">Trends and performance insights</p>
        </div>
        <Button variant="outline" onClick={() => setViewMode('overview')}>
          <BarChart3 className="h-4 w-4 mr-2" />
          Back to Overview
        </Button>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Collection Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weeklyStats.map((stat) => (
                <div key={`${stat.weekNumber}-${stat.cycleNumber}`} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Week {stat.weekNumber}</p>
                    <p className="text-sm text-gray-500">
                      RWF {stat.totalCollected.toLocaleString()} / RWF {stat.totalExpected.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${stat.collectionRate >= 90 ? 'text-green-600' : stat.collectionRate >= 70 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {stat.collectionRate.toFixed(1)}%
                    </p>
                    <p className="text-xs text-gray-500">
                      {stat.paidCount}/{stat.paidCount + stat.missedCount + stat.pendingCount} paid
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="h-5 w-5 mr-2" />
              Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="font-medium text-green-800">Best Week</p>
                  <p className="text-sm text-green-600">Week 7 - 96% collection</p>
                </div>
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div>
                  <p className="font-medium text-red-800">Needs Attention</p>
                  <p className="text-sm text-red-600">Week 8 - 52% collection</p>
                </div>
                <TrendingDown className="h-5 w-5 text-red-600" />
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium text-blue-800">Average Time</p>
                  <p className="text-sm text-blue-600">10.3 hours to payment</p>
                </div>
                <Zap className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  if (viewMode === 'analytics') {
    return (
      <div className="space-y-6">
        {/* Header */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Contribution Analytics
            </CardTitle>
            <CardDescription>
              Advanced analytics and insights for contribution patterns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">Cycle 3, Week 8</span>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Analytics
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Analytics Content */}
        <Card>
          <CardHeader>
            <CardTitle>Analytics Dashboard</CardTitle>
            <CardDescription>
              Comprehensive analysis of contribution patterns and trends
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Analytics features coming soon</p>
              <p className="text-sm text-gray-500 mt-2">
                Advanced charts, trends, and predictive analytics will be available here
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center py-8">
        <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">Unknown view mode</p>
      </div>
    </div>
  );
};

export default ContributionTracker;
