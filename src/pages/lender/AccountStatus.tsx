import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Building2, Search, Clock, CheckCircle, XCircle, AlertCircle, Mail } from 'lucide-react';

interface ApplicationStatus {
  id: string;
  institutionName: string;
  email: string;
  status: 'pending' | 'approved' | 'rejected' | 'needs_review';
  submittedAt: string;
  reviewedAt?: string;
  rejectionReason?: string;
  referenceNumber: string;
  estimatedReviewTime?: string;
}

const AccountStatus: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState<ApplicationStatus | null>(null);
  const [error, setError] = useState('');
  const [searchAttempted, setSearchAttempted] = useState(false);

  const mockApplications: ApplicationStatus[] = [
    {
      id: '1',
      institutionName: 'ABC Finance Ltd',
      email: 'contact@abcfinance.com',
      status: 'approved',
      submittedAt: '2024-01-15T10:30:00Z',
      reviewedAt: '2024-01-17T14:20:00Z',
      referenceNumber: 'LAPP-2024-001234'
    },
    {
      id: '2',
      institutionName: 'Rwanda Credit Union',
      email: 'info@rwandacu.rw',
      status: 'pending',
      submittedAt: '2024-01-20T09:15:00Z',
      referenceNumber: 'LAPP-2024-001567',
      estimatedReviewTime: '2024-01-23T17:00:00Z'
    },
    {
      id: '3',
      institutionName: 'Quick Loans Ltd',
      email: 'admin@quickloans.com',
      status: 'rejected',
      submittedAt: '2024-01-10T16:45:00Z',
      reviewedAt: '2024-01-12T11:30:00Z',
      rejectionReason: 'License number could not be verified with National Bank of Rwanda',
      referenceNumber: 'LAPP-2024-000987'
    },
    {
      id: '4',
      institutionName: 'MicroFinance Solutions',
      email: 'applications@microfinance.rw',
      status: 'needs_review',
      submittedAt: '2024-01-18T13:20:00Z',
      referenceNumber: 'LAPP-2024-001345',
      estimatedReviewTime: '2024-01-22T12:00:00Z'
    }
  ];

  const handleStatusCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Find application by email
      const application = mockApplications.find(app => 
        app.email.toLowerCase() === email.toLowerCase()
      );
      
      if (application) {
        setApplicationStatus(application);
      } else {
        setError('No application found for this email address');
      }
      
      setSearchAttempted(true);
    } catch (error) {
      setError('Unable to check status. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge variant="success">Approved</Badge>;
      case 'pending':
        return <Badge variant="warning">Pending Review</Badge>;
      case 'rejected':
        return <Badge variant="error">Rejected</Badge>;
      case 'needs_review':
        return <Badge variant="warning">Needs Review</Badge>;
      default:
        return <Badge variant="default">Unknown</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-6 w-6 text-green-600" />;
      case 'pending':
        return <Clock className="h-6 w-6 text-yellow-600" />;
      case 'rejected':
        return <XCircle className="h-6 w-6 text-red-600" />;
      case 'needs_review':
        return <AlertCircle className="h-6 w-6 text-orange-600" />;
      default:
        return <Clock className="h-6 w-6 text-gray-600" />;
    }
  };

  const getStatusMessage = (status: string) => {
    switch (status) {
      case 'approved':
        return {
          title: 'Congratulations! Your application has been approved.',
          description: 'You can now log in to the lender portal using your credentials.',
          action: 'Go to Login',
          actionUrl: '/lender/login'
        };
      case 'pending':
        return {
          title: 'Your application is under review.',
          description: 'Our compliance team is reviewing your application. This typically takes 2-3 business days.',
          action: 'Check Again Later',
          actionUrl: '#'
        };
      case 'rejected':
        return {
          title: 'Your application has been rejected.',
          description: 'Please review the rejection reason below and submit a new application if needed.',
          action: 'Submit New Application',
          actionUrl: '/lender/register'
        };
      case 'needs_review':
        return {
          title: 'Your application needs additional review.',
          description: 'Our team needs more information or clarification. Please check your email for details.',
          action: 'Contact Support',
          actionUrl: '#'
        };
      default:
        return {
          title: 'Status unknown.',
          description: 'Please contact support for assistance.',
          action: 'Contact Support',
          actionUrl: '#'
        };
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <Building2 className="mx-auto h-12 w-12 text-primary-600 mb-4" />
          <h1 className="text-3xl font-bold text-gray-900">Application Status Check</h1>
          <p className="mt-2 text-gray-600">
            Check the status of your lender registration application
          </p>
        </div>

        {/* Status Check Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Check Your Application Status</CardTitle>
            <CardDescription>
              Enter the email address you used during registration
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleStatusCheck} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="institution@company.com"
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
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? 'Checking...' : 'Check Status'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Application Status Result */}
        {applicationStatus && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  {getStatusIcon(applicationStatus.status)}
                  <span className="ml-3">Application Status</span>
                </CardTitle>
                {getStatusBadge(applicationStatus.status)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Status Message */}
                <div className={`p-4 rounded-lg ${
                  applicationStatus.status === 'approved' ? 'bg-green-50 border border-green-200' :
                  applicationStatus.status === 'rejected' ? 'bg-red-50 border border-red-200' :
                  'bg-yellow-50 border border-yellow-200'
                }`}>
                  <h3 className={`font-semibold mb-2 ${
                    applicationStatus.status === 'approved' ? 'text-green-800' :
                    applicationStatus.status === 'rejected' ? 'text-red-800' :
                    'text-yellow-800'
                  }`}>
                    {getStatusMessage(applicationStatus.status).title}
                  </h3>
                  <p className={`text-sm ${
                    applicationStatus.status === 'approved' ? 'text-green-700' :
                    applicationStatus.status === 'rejected' ? 'text-red-700' :
                    'text-yellow-700'
                  }`}>
                    {getStatusMessage(applicationStatus.status).description}
                  </p>
                </div>

                {/* Application Details */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Application Details</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Reference Number:</span>
                      <span className="text-sm font-medium">{applicationStatus.referenceNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Institution:</span>
                      <span className="text-sm font-medium">{applicationStatus.institutionName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Email:</span>
                      <span className="text-sm font-medium">{applicationStatus.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Submitted:</span>
                      <span className="text-sm font-medium">
                        {new Date(applicationStatus.submittedAt).toLocaleDateString()}
                      </span>
                    </div>
                    {applicationStatus.reviewedAt && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Reviewed:</span>
                        <span className="text-sm font-medium">
                          {new Date(applicationStatus.reviewedAt).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                    {applicationStatus.estimatedReviewTime && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Estimated Review:</span>
                        <span className="text-sm font-medium">
                          {new Date(applicationStatus.estimatedReviewTime).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Rejection Reason */}
                {applicationStatus.rejectionReason && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 className="font-semibold text-red-800 mb-2">Rejection Reason</h4>
                    <p className="text-sm text-red-700">{applicationStatus.rejectionReason}</p>
                  </div>
                )}

                {/* Action Button */}
                <div className="pt-4">
                  <Button
                    onClick={() => {
                      const action = getStatusMessage(applicationStatus.status);
                      if (action.actionUrl === '#') {
                        // Handle contact support or other actions
                        window.location.href = 'mailto:support@ikimina.rw';
                      } else {
                        window.location.href = action.actionUrl;
                      }
                    }}
                    className="w-full"
                    variant={applicationStatus.status === 'approved' ? 'primary' : 'outline'}
                  >
                    {getStatusMessage(applicationStatus.status).action}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* No Application Found */}
        {searchAttempted && !applicationStatus && !error && (
          <Card>
            <CardContent className="text-center py-8">
              <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No Application Found
              </h3>
              <p className="text-gray-600 mb-6">
                We couldn't find an application associated with this email address.
              </p>
              <div className="space-y-3">
                <Button
                  onClick={() => window.location.href = '/lender/register'}
                  className="w-full"
                >
                  Submit New Application
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchAttempted(false);
                    setApplicationStatus(null);
                    setError('');
                    setEmail('');
                  }}
                  className="w-full"
                >
                  Check Different Email
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Help Information */}
        <div className="mt-8">
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Need Help?</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">Email Support</p>
                  <p>support@ikimina.rw</p>
                </div>
              </div>
              <div className="flex items-start">
                <Clock className="h-5 w-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">Review Timeline</p>
                  <p>Most applications are reviewed within 2-3 business days</p>
                </div>
              </div>
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">Common Issues</p>
                  <ul className="list-disc list-inside space-y-1 mt-1">
                    <li>Ensure your license number is valid and active</li>
                    <li>Double-check your email address for typos</li>
                    <li>Make sure all required fields were completed</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountStatus;
