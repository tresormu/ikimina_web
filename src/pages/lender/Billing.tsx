import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '../../components/ui/Select';
import { 
  FileText, 
  Download, 
  Calendar, 
  DollarSign, 
  CreditCard,
  TrendingUp,
  Package,
  Receipt,
  AlertCircle,
  CheckCircle,
  Clock,
  Filter,
  User
} from 'lucide-react';

interface PurchasedReport {
  id: string;
  reportId: string;
  memberName: string;
  memberPhone: string;
  purchaseDate: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  invoiceNumber: string;
}

interface CreditPackage {
  id: string;
  name: string;
  reportsCount: number;
  price: number;
  discount: number;
  savings: number;
  popular?: boolean;
}

interface MonthlySummary {
  month: string;
  year: number;
  totalReports: number;
  totalSpent: number;
  averageCost: number;
}

const Billing: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'reports' | 'summary' | 'credits'>('reports');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [selectedUserRole, setSelectedUserRole] = useState<string>('all');

  // Mock data
  const purchasedReports: PurchasedReport[] = [
    {
      id: '1',
      reportId: 'CR-2024-001',
      memberName: 'Jean Mugisha',
      memberPhone: '+250788123456',
      purchaseDate: '2024-01-20T10:30:00Z',
      amount: 10000,
      status: 'completed',
      invoiceNumber: 'INV-2024-001234'
    },
    {
      id: '2',
      reportId: 'CR-2024-002',
      memberName: 'Alice Uwimana',
      memberPhone: '+250723456789',
      purchaseDate: '2024-01-19T14:15:00Z',
      amount: 10000,
      status: 'completed',
      invoiceNumber: 'INV-2024-001235'
    },
    {
      id: '3',
      reportId: 'CR-2024-003',
      memberName: 'Bob Niyonsaba',
      memberPhone: '+250734567890',
      purchaseDate: '2024-01-18T09:45:00Z',
      amount: 10000,
      status: 'completed',
      invoiceNumber: 'INV-2024-001236'
    },
    {
      id: '4',
      reportId: 'CR-2024-004',
      memberName: 'Claudine Mukamana',
      memberPhone: '+250745678901',
      purchaseDate: '2024-01-17T16:20:00Z',
      amount: 10000,
      status: 'pending',
      invoiceNumber: 'INV-2024-001237'
    }
  ];

  const creditPackages: CreditPackage[] = [
    {
      id: '1',
      name: 'Starter',
      reportsCount: 10,
      price: 90000,
      discount: 10,
      savings: 10000,
    },
    {
      id: '2',
      name: 'Professional',
      reportsCount: 25,
      price: 200000,
      discount: 20,
      savings: 50000,
      popular: true
    },
    {
      id: '3',
      name: 'Enterprise',
      reportsCount: 50,
      price: 350000,
      discount: 30,
      savings: 150000,
    },
    {
      id: '4',
      name: 'Unlimited',
      reportsCount: 100,
      price: 600000,
      discount: 40,
      savings: 400000,
    }
  ];

  const monthlySummaries: MonthlySummary[] = [
    {
      month: 'January',
      year: 2024,
      totalReports: 12,
      totalSpent: 120000,
      averageCost: 10000
    },
    {
      month: 'December',
      year: 2023,
      totalReports: 18,
      totalSpent: 180000,
      averageCost: 10000
    },
    {
      month: 'November',
      year: 2023,
      totalReports: 15,
      totalSpent: 150000,
      averageCost: 10000
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="success">Completed</Badge>;
      case 'pending':
        return <Badge variant="warning">Pending</Badge>;
      case 'failed':
        return <Badge variant="error">Failed</Badge>;
      default:
        return <Badge variant="default">Unknown</Badge>;
    }
  };

  const handleDownloadInvoice = (invoiceNumber: string) => {
    // Handle invoice download
    alert(`Downloading invoice ${invoiceNumber}`);
  };

  const handlePurchasePackage = (packageId: string) => {
    // Handle package purchase
    alert(`Purchasing package ${packageId}`);
  };

  const currentMonthSummary = monthlySummaries.find(
    summary => summary.month === 'January' && summary.year === 2024
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Billing & Reports</h1>
        <p className="mt-2 text-gray-600">
          Manage your credit report purchases, invoices, and billing history
        </p>
      </div>

      {/* Current Month Summary */}
      {currentMonthSummary && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-600">Reports This Month</p>
                  <p className="text-xl font-bold text-gray-900">{currentMonthSummary.totalReports}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-600">Total Spent</p>
                  <p className="text-xl font-bold text-gray-900">RWF {currentMonthSummary.totalSpent.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-600">Avg Cost/Report</p>
                  <p className="text-xl font-bold text-gray-900">RWF {currentMonthSummary.averageCost.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <CreditCard className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-600">Credits Available</p>
                  <p className="text-xl font-bold text-gray-900">8</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Role Selection Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Role Selection</CardTitle>
          <CardDescription>
            Filter reports and data by user roles and permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="h-4 w-4 inline mr-2" />
                Select Role
              </label>
              <Select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
                <option value="all">All Roles</option>
                <option value="lender">Lender</option>
                <option value="borrower">Borrower</option>
                <option value="admin">Administrator</option>
                <option value="agent">Credit Agent</option>
                <option value="analyst">Credit Analyst</option>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Filter className="h-4 w-4 inline mr-2" />
                User Access Level
              </label>
              <Select value={selectedUserRole} onChange={(e) => setSelectedUserRole(e.target.value)}>
                <option value="all">All Access Levels</option>
                <option value="full">Full Access</option>
                <option value="limited">Limited Access</option>
                <option value="readonly">Read Only</option>
                <option value="temp">Temporary Access</option>
              </Select>
            </div>
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <Button variant="secondary" onClick={() => {
              setSelectedRole('all');
              setSelectedUserRole('all');
            }}>
              Clear Filters
            </Button>
            <Button onClick={() => {
              alert(`Applying filters: Role: ${selectedRole}, Access Level: ${selectedUserRole}`);
            }}>
              Apply Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('reports')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'reports'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <FileText className="h-4 w-4 inline mr-2" />
            Purchased Reports
          </button>
          <button
            onClick={() => setActiveTab('summary')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'summary'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Calendar className="h-4 w-4 inline mr-2" />
            Monthly Summary
          </button>
          <button
            onClick={() => setActiveTab('credits')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'credits'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Package className="h-4 w-4 inline mr-2" />
            Buy Credits
          </button>
        </nav>
      </div>

      {/* Purchased Reports Tab */}
      {activeTab === 'reports' && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Purchased Credit Reports</CardTitle>
                <CardDescription>
                  View and download invoices for all purchased reports
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
                  <option>January 2024</option>
                  <option>December 2023</option>
                  <option>November 2023</option>
                </select>
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
                      Report ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Member
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Purchase Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Invoice
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {purchasedReports.map((report) => (
                    <tr key={report.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {report.reportId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{report.memberName}</div>
                          <div className="text-sm text-gray-500">{report.memberPhone}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(report.purchaseDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        RWF {report.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(report.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {report.invoiceNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDownloadInvoice(report.invoiceNumber)}
                          disabled={report.status !== 'completed'}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Invoice
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Monthly Summary Tab */}
      {activeTab === 'summary' && (
        <Card>
          <CardHeader>
            <CardTitle>Monthly Billing Summary</CardTitle>
            <CardDescription>
              Overview of your credit report purchases by month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlySummaries.map((summary, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{summary.month} {summary.year}</h3>
                      <div className="mt-2 grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Reports</p>
                          <p className="font-medium">{summary.totalReports}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Spent</p>
                          <p className="font-medium">RWF {summary.totalSpent.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Avg Cost</p>
                          <p className="font-medium">RWF {summary.averageCost.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => alert(`Downloading summary for ${summary.month} ${summary.year}`)}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Buy Credits Tab */}
      {activeTab === 'credits' && (
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Prepaid Credit Packages</CardTitle>
              <CardDescription>
                Purchase report bundles at discounted rates. Save more with larger packages.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {creditPackages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className={`relative border rounded-lg p-6 ${
                      pkg.popular
                        ? 'border-primary-500 ring-2 ring-primary-200'
                        : 'border-gray-200'
                    }`}
                  >
                    {pkg.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge variant="secondary">Most Popular</Badge>
                      </div>
                    )}
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{pkg.name}</h3>
                      <div className="mb-4">
                        <span className="text-3xl font-bold text-gray-900">{pkg.reportsCount}</span>
                        <span className="text-gray-600"> Reports</span>
                      </div>
                      <div className="mb-4">
                        <div className="text-2xl font-bold text-primary-600">
                          RWF {pkg.price.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          RWF {Math.round(pkg.price / pkg.reportsCount).toLocaleString()} per report
                        </div>
                      </div>
                      <div className="mb-6">
                        <div className="text-green-600 font-medium">
                          Save {pkg.discount}% (RWF {pkg.savings.toLocaleString()})
                        </div>
                        <div className="text-sm text-gray-500">
                          Regular price: RWF {(pkg.price + pkg.savings).toLocaleString()}
                        </div>
                      </div>
                      <Button
                        onClick={() => handlePurchasePackage(pkg.id)}
                        className="w-full"
                        variant={pkg.popular ? 'primary' : 'outline'}
                      >
                        <Package className="h-4 w-4 mr-2" />
                        Purchase Package
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Payment Information */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
              <CardDescription>
                Secure payment processing and instant credit activation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Accepted Payment Methods</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <CreditCard className="h-5 w-5 text-gray-600 mr-3" />
                      <span className="text-sm text-gray-700">Credit/Debit Cards</span>
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="h-5 w-5 text-gray-600 mr-3" />
                      <span className="text-sm text-gray-700">Mobile Money (MoMo, Airtel Money)</span>
                    </div>
                    <div className="flex items-center">
                      <Receipt className="h-5 w-5 text-gray-600 mr-3" />
                      <span className="text-sm text-gray-700">Bank Transfer</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Credit Activation</h4>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                      <div className="text-sm text-blue-800">
                        <p className="font-semibold mb-1">Instant Activation</p>
                        <ul className="list-disc list-inside space-y-1">
                          <li>Credits are added to your account immediately after payment</li>
                          <li>No expiration date on purchased credits</li>
                          <li>Automatic invoice generation for all purchases</li>
                          <li>24/7 payment processing support</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Billing;
