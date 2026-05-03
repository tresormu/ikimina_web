import React from 'react';
import { Button } from '../ui/Button';
import { Eye, CheckCircle } from 'lucide-react';
import { AdminStatusBadge } from './AdminStatusBadge';
import { PriorityBadge } from './PriorityBadge';

interface Dispute {
  id: string;
  groupId: string;
  groupName: string;
  memberId: string;
  memberName: string;
  description: string;
  status: 'open' | 'resolved' | 'escalated';
  escalatedDate?: string;
  createdDate: string;
  priority: 'low' | 'medium' | 'high';
}

interface DisputeRowProps {
  dispute: Dispute;
  onResolve?: (disputeId: string) => void;
}

export const DisputeRow: React.FC<DisputeRowProps> = ({ dispute, onResolve }) => {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {dispute.groupName}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {dispute.memberName}
      </td>
      <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
        {dispute.description}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <PriorityBadge priority={dispute.priority} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <AdminStatusBadge status={dispute.status} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {new Date(dispute.createdDate).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {dispute.escalatedDate ? new Date(dispute.escalatedDate).toLocaleDateString() : '-'}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <Button variant="ghost" size="sm">
          <Eye className="h-4 w-4 mr-1" />
          View
        </Button>
        {dispute.status === 'escalated' && onResolve && (
          <Button variant="ghost" size="sm" onClick={() => onResolve(dispute.id)}>
            <CheckCircle className="h-4 w-4 mr-1" />
            Resolve
          </Button>
        )}
      </td>
    </tr>
  );
};
