import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { 
  Search, 
  User, 
  Phone, 
  CreditCard, 
  Eye, 
  Download,
  AlertCircle,
  CheckCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  Calendar,
  Shield,
  Flag,
  DollarSign
} from 'lucide-react';

interface MemberPreview {
  id: string;
  name: string;
  phone: string;
  nationalId: string;
  score: number;
  scoreCategory: string;
  groupCount: number;
  joinDate: string;
  lastActivity: string;
  reportPrice: number;
}

interface FullReport extends MemberPreview {
  contributionHistory: ContributionRecord[];
  groupTenure: GroupTenureRecord[];
  missedPayments: MissedPaymentRecord[];
  loanHistory: LoanRecord[];
  scoringFactors: ScoringFactor[];
  reportGenerated: string;
  verificationStatus: 'verified' | 'pending' | 'flagged';
}

interface ContributionRecord {
  groupId: string;
  groupName: string;
  cycle: number;
  week: number;
  amount: number;
  status: 'paid' | 'missed' | 'pending';
  date: string;
}

interface GroupTenureRecord {
  groupId: string;
  groupName: string;
  joinDate: string;
  leaveDate?: string;
  status: 'active' | 'completed' | 'inactive';
  totalContributions: number;
  missedContributions: number;
}

interface MissedPaymentRecord {
  groupId: string;
  groupName: string;
  cycle: number;
  week: number;
  amount: number;
  reason: string;
  date: string;
}

interface LoanRecord {
  lender: string;
  amount: number;
  interestRate: number;
  term: number;
  status: 'active' | 'completed' | 'defaulted';
  startDate: string;
  endDate?: string;
}

interface ScoringFactor {
  category: string;
  weight: number;
  score: number;
  impact: 'positive' | 'negative' | 'neutral';
}

const CreditReportSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'phone' | 'nationalId'>('phone');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<MemberPreview[]>([]);
  const [selectedMember, setSelectedMember] = useState<MemberPreview | null>(null);
  const [fullReport, setFullReport] = useState<FullReport | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showFullReport, setShowFullReport] = useState(false);
  const [error, setError] = useState('');

  // Mock data
  const mockMembers: MemberPreview[] = [
    {
      id: '1',
      name: 'Jean Mugisha',
      phone: '+250788123456',
      nationalId: '1199080012345678',
      score: 750,
      scoreCategory: 'Excellent',
      groupCount: 3,
      joinDate: '2022-03-15',
      lastActivity: '2024-01-20',
      reportPrice: 10000
    },
    {
      id: '2',
      name: 'Alice Uwimana',
      phone: '+250723456789',
      nationalId: '1199050012345679',
      score: 680,
      scoreCategory: 'Good',
      groupCount: 2,
      joinDate: '2022-06-20',
      lastActivity: '2024-01-19',
      reportPrice: 10000
    },
    {
      id: '3',
      name: 'Bob Niyonsaba',
      phone: '+250734567890',
      nationalId: '1199070012345680',
      score: 520,
      scoreCategory: 'Fair',
      groupCount: 1,
      joinDate: '2023-01-10',
      lastActivity: '2024-01-18',
      reportPrice: 10000
    }
  ];

  const getScoreBadgeColor = (category: string) => {
    switch (category) {
      case 'Excellent':
        return 'bg-green-100 text-green-800';
      case 'Good':
        return 'bg-blue-100 text-blue-800';
      case 'Fair':
        return 'bg-yellow-100 text-yellow-800';
      case 'Poor':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreIcon = (score: number) => {
    if (score >= 700) return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (score >= 600) return <TrendingUp className="h-4 w-4 text-blue-600" />;
    if (score >= 500) return <TrendingDown className="h-4 w-4 text-yellow-600" />;
    return <TrendingDown className="h-4 w-4 text-red-600" />;
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      setError('Please enter a search query');
      return;
    }
    
    setIsSearching(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Filter mock data based on search type and query
      const filtered = mockMembers.filter(member => {
        if (searchType === 'phone') {
          return member.phone.includes(searchQuery.replace(/\s/g, ''));
        } else {
          return member.nationalId.includes(searchQuery);
        }
      });
      
      setSearchResults(filtered);
      setShowPreview(true);
    } catch (error) {
      setError('Search failed. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  const handlePreviewReport = (member: MemberPreview) => {
    setSelectedMember(member);
    setShowFullReport(false);
  };

  const handlePurchaseReport = async () => {
    if (!selectedMember) return;
    
    try {
      // Simulate purchase API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate mock full report
      const fullReportData: FullReport = {
        ...selectedMember,
        contributionHistory: [
          {
            groupId: 'G1',
            groupName: 'Kigali Savings Group',
            cycle: 3,
            week: 8,
            amount: 25000,
            status: 'paid',
            date: '2024-01-20'
          },
          {
            groupId: 'G1',
            groupName: 'Kigali Savings Group',
            cycle: 3,
            week: 7,
            amount: 25000,
            status: 'paid',
            date: '2024-01-13'
          }
        ],
        groupTenure: [
          {
            groupId: 'G1',
            groupName: 'Kigali Savings Group',
            joinDate: '2022-03-15',
            status: 'active',
            totalContributions: 78,
            missedContributions: 2
          }
        ],
        missedPayments: [
          {
            groupId: 'G1',
            groupName: 'Kigali Savings Group',
            cycle: 2,
            week: 12,
            amount: 25000,
            reason: 'Payment deadline exceeded',
            date: '2023-12-20'
          }
        ],
        loanHistory: [
          {
            lender: 'ABC Finance Ltd',
            amount: 500000,
            interestRate: 15,
            term: 6,
            status: 'completed',
            startDate: '2023-06-01',
            endDate: '2023-12-01'
          }
        ],
        scoringFactors: [
          {
            category: 'Payment History',
            weight: 35,
            score: 85,
            impact: 'positive'
          },
          {
            category: 'Group Participation',
            weight: 25,
            score: 90,
            impact: 'positive'
          },
          {
            category: 'Loan History',
            weight: 20,
            score: 80,
            impact: 'positive'
          },
          {
            category: 'Consistency',
            weight: 20,
            score: 70,
            impact: 'neutral'
          }
        ],
        reportGenerated: new Date().toISOString(),
        verificationStatus: 'verified'
      };
      
      setFullReport(fullReportData);
      setShowFullReport(true);
    } catch (error) {
      setError('Failed to generate report');
    }
  };

  const handleFlagReport = () => {
    // Handle flagging suspicious data
    alert('Report has been flagged for review');
  };

  const handleDownloadPDF = () => {
    // Handle PDF download
    alert('PDF download functionality would be implemented here');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Credit Report Search</h1>
        <p className="mt-2 text-gray-600">
          Search for member credit reports by phone number or national ID
        </p>
      </div>

      {/* Search Form */}
      <Card>
        <CardHeader>
          <CardTitle>Search Member</CardTitle>
          <CardDescription>
            Enter member details to preview and purchase credit reports
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="space-y-6">
            {/* Search Type Selection */}
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="phone"
                  checked={searchType === 'phone'}
                  onChange={(e) => setSearchType(e.target.value as 'phone' | 'nationalId')}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">Phone Number</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="nationalId"
                  checked={searchType === 'nationalId'}
                  onChange={(e) => setSearchType(e.target.value as 'phone' | 'nationalId')}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">National ID</span>
              </label>
            </div>

            {/* Search Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {searchType === 'phone' ? 'Phone Number' : 'National ID'}
              </label>
              <div className="relative">
                {searchType === 'phone' ? (
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                ) : (
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                )}
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={searchType === 'phone' ? '+250 7xx xxx xxx' : '19xxx-xxxx-xxxx-xxx'}
                  className="pl-10"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              </div>
            )}

            <Button
              type="submit"
              disabled={isSearching}
              className="w-full"
            >
              {isSearching ? 'Searching...' : 'Search Member'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Search Results */}
      {showPreview && searchResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Search Results</CardTitle>
            <CardDescription>
              {searchResults.length} member{searchResults.length !== 1 ? 's' : ''} found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {searchResults.map((member) => (
                <div
                  key={member.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <User className="h-6 w-6 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{member.name}</h3>
                        <p className="text-sm text-gray-600">{member.phone}</p>
                        <p className="text-sm text-gray-600">ID: {member.nationalId}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2 mb-2">
                        {getScoreIcon(member.score)}
                        <span className="text-lg font-bold text-gray-900">{member.score}</span>
                        <Badge className={getScoreBadgeColor(member.scoreCategory)}>
                          {member.scoreCategory}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        Report Price: RWF {member.reportPrice.toLocaleString()}
                      </p>
                      <Button
                        onClick={() => handlePreviewReport(member)}
                        size="sm"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Preview Report
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Member Preview */}
      {selectedMember && !showFullReport && (
        <Card>
          <CardHeader>
            <CardTitle>Report Preview</CardTitle>
            <CardDescription>
              Basic information for {selectedMember.name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Member Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Personal Information</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Name:</span>
                      <span className="text-sm font-medium">{selectedMember.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Phone:</span>
                      <span className="text-sm font-medium">{selectedMember.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">National ID:</span>
                      <span className="text-sm font-medium">{selectedMember.nationalId}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Credit Score</h4>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900 mb-2">{selectedMember.score}</div>
                    <Badge className={getScoreBadgeColor(selectedMember.scoreCategory)}>
                      {selectedMember.scoreCategory}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Group Activity */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Group Activity</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-gray-900">{selectedMember.groupCount}</p>
                    <p className="text-sm text-gray-600">Active Groups</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-gray-900">
                      {new Date(selectedMember.joinDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600">Member Since</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-gray-900">
                      {new Date(selectedMember.lastActivity).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600">Last Activity</p>
                  </div>
                </div>
              </div>

              {/* Purchase Action */}
              <div className="border-t pt-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-blue-900">Full Credit Report</h4>
                      <p className="text-sm text-blue-700">
                        Complete contribution history, loan records, and scoring analysis
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-blue-900">
                        RWF {selectedMember.reportPrice.toLocaleString()}
                      </p>
                      <Button
                        onClick={handlePurchaseReport}
                        className="mt-2"
                      >
                        Purchase Full Report
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Full Report */}
      {showFullReport && fullReport && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Full Credit Report</CardTitle>
                <CardDescription>
                  Complete credit analysis for {fullReport.name}
                </CardDescription>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={handleFlagReport}>
                  <Flag className="h-4 w-4 mr-1" />
                  Flag Report
                </Button>
                <Button variant="outline" size="sm" onClick={handleDownloadPDF}>
                  <Download className="h-4 w-4 mr-1" />
                  Download PDF
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {/* Verification Status */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-green-600 mr-2" />
                  <span className="font-medium">Verification Status:</span>
                </div>
                <Badge variant={fullReport.verificationStatus === 'verified' ? 'success' : 'warning'}>
                  {fullReport.verificationStatus}
                </Badge>
              </div>

              {/* Credit Score Breakdown */}
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Credit Score Analysis</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-center mb-4">
                      <div className="text-4xl font-bold text-gray-900 mb-2">{fullReport.score}</div>
                      <Badge className={getScoreBadgeColor(fullReport.scoreCategory)}>
                        {fullReport.scoreCategory}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 mb-3">Scoring Factors</h5>
                    <div className="space-y-2">
                      {fullReport.scoringFactors.map((factor, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm text-gray-700">{factor.category}</span>
                              <span className="text-sm font-medium">{factor.score}/100</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  factor.impact === 'positive' ? 'bg-green-500' :
                                  factor.impact === 'negative' ? 'bg-red-500' : 'bg-yellow-500'
                                }`}
                                style={{ width: `${factor.score}%` }}
                              />
                            </div>
                          </div>
                          <span className="ml-2 text-xs text-gray-500">({factor.weight}%)</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Contribution History */}
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Recent Contribution History</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Group</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cycle</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Week</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {fullReport.contributionHistory.map((contrib, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 text-sm text-gray-900">{contrib.groupName}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{contrib.cycle}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{contrib.week}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">RWF {contrib.amount.toLocaleString()}</td>
                          <td className="px-6 py-4">
                            <Badge variant={contrib.status === 'paid' ? 'success' : contrib.status === 'missed' ? 'error' : 'warning'}>
                              {contrib.status}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">{contrib.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Group Tenure */}
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Group Tenure History</h4>
                <div className="space-y-3">
                  {fullReport.groupTenure.map((tenure, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h5 className="font-medium text-gray-900">{tenure.groupName}</h5>
                          <p className="text-sm text-gray-600">Joined: {tenure.joinDate}</p>
                          {tenure.leaveDate && (
                            <p className="text-sm text-gray-600">Left: {tenure.leaveDate}</p>
                          )}
                        </div>
                        <div className="text-right">
                          <Badge variant={tenure.status === 'active' ? 'success' : 'default'}>
                            {tenure.status}
                          </Badge>
                          <div className="mt-2 text-sm text-gray-600">
                            <p>{tenure.totalContributions} contributions</p>
                            <p>{tenure.missedContributions} missed</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Report Metadata */}
              <div className="border-t pt-4">
                <div className="text-sm text-gray-600">
                  <p>Report Generated: {new Date(fullReport.reportGenerated).toLocaleString()}</p>
                  <p>Report ID: CR-{fullReport.id}-${Date.now()}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* No Results */}
      {showPreview && searchResults.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Members Found</h3>
            <p className="text-gray-600">
              No members match your search criteria. Please check the information and try again.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CreditReportSearch;
