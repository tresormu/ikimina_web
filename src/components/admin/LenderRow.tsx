import React from 'react';
import { Button } from '../ui/Button';
import { Eye, CheckCircle, XCircle } from 'lucide-react';
import { AdminStatusBadge } from './AdminStatusBadge';

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

interface LenderRowProps {
  lender: Lender;
  onApprove?: (lenderId: string) => void;
  onReject?: (lenderId: string) => void;
}

export const LenderRow: React.FC<LenderRowProps> = ({ 
  lender, 
  onApprove, 
  onReject 
}) => {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {lender.institutionName}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {lender.licenseNumber}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <AdminStatusBadge status={lender.status} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {new Date(lender.applicationDate).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {lender.approvedDate ? new Date(lender.approvedDate).toLocaleDateString() : '-'}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {lender.reportsPurchased}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        RWF {lender.totalSpent.toLocaleString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <Button variant="ghost" size="sm">
          <Eye className="h-4 w-4 mr-1" />
          View
        </Button>
        {lender.status === 'pending' && (
          <>
            <Button variant="ghost" size="sm" onClick={() => onApprove?.(lender.id)}>
              <CheckCircle className="h-4 w-4 mr-1" />
              Approve
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onReject?.(lender.id)}>
              <XCircle className="h-4 w-4 mr-1" />
              Reject
            </Button>
          </>
        )}
      </td>
    </tr>
  );
};
