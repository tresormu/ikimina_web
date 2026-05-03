import React from 'react';
import { Button } from '../ui/Button';
import { CheckCircle, Eye } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { PaymentMethodBadge } from './PaymentMethodBadge';

interface Contribution {
  id: string;
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
}

interface ContributionRowProps {
  contribution: Contribution;
  onConfirm?: (id: string) => void;
  compact?: boolean;
}

export const ContributionRow: React.FC<ContributionRowProps> = ({ 
  contribution, 
  onConfirm, 
  compact = false 
}) => {
  if (compact) {
    return (
      <tr className="border-b hover:bg-gray-50">
        <td className="p-2">
          <div>
            <p className="font-medium">{contribution.memberName}</p>
            <p className="text-xs text-gray-500">{contribution.memberPhone}</p>
          </div>
        </td>
        <td className="p-2">W{contribution.weekNumber}/C{contribution.cycleNumber}</td>
        <td className="p-2">RWF {contribution.amount.toLocaleString()}</td>
        <td className="p-2"><PaymentMethodBadge method={contribution.paymentMethod} /></td>
        <td className="p-2"><StatusBadge status={contribution.status} /></td>
        <td className="p-2 text-xs">{contribution.transactionId || '-'}</td>
        <td className="p-2 text-xs">
          {new Date(contribution.submittedAt).toLocaleDateString()}
        </td>
        <td className="p-2">
          <Button size="sm" variant="outline">
            <Eye className="h-4 w-4" />
          </Button>
        </td>
      </tr>
    );
  }

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
      <div className="flex-1">
        <div className="flex items-center space-x-3">
          <div>
            <p className="font-medium text-gray-900">{contribution.memberName}</p>
            <p className="text-sm text-gray-500">{contribution.memberPhone}</p>
          </div>
          <div className="flex space-x-2">
            <PaymentMethodBadge method={contribution.paymentMethod} />
            <StatusBadge status={contribution.status} />
          </div>
        </div>
        {contribution.transactionId && (
          <p className="text-xs text-gray-400 mt-1">ID: {contribution.transactionId}</p>
        )}
        {contribution.failureReason && (
          <p className="text-xs text-red-600 mt-1">Reason: {contribution.failureReason}</p>
        )}
      </div>
      <div className="text-right">
        <p className="font-medium text-gray-900">
          RWF {contribution.amount.toLocaleString()}
        </p>
        {contribution.lateFee && (
          <p className="text-xs text-red-600">+ RWF {contribution.lateFee} late fee</p>
        )}
        {contribution.status === 'pending' && onConfirm && (
          <Button 
            size="sm" 
            variant="outline" 
            className="mt-2"
            onClick={() => onConfirm(contribution.id)}
          >
            <CheckCircle className="h-4 w-4 mr-1" />
            Confirm
          </Button>
        )}
      </div>
    </div>
  );
};
