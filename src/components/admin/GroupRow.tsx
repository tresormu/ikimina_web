import React from 'react';
import { Button } from '../ui/Button';
import { Eye, XCircle } from 'lucide-react';
import { AdminStatusBadge } from './AdminStatusBadge';

interface Group {
  id: string;
  name: string;
  members: number;
  status: 'active' | 'inactive' | 'suspended';
  createdDate: string;
  lastActivity: string;
  treasurer: string;
}

interface GroupRowProps {
  group: Group;
  onSuspend?: (groupId: string) => void;
}

export const GroupRow: React.FC<GroupRowProps> = ({ group, onSuspend }) => {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {group.name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {group.members}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {group.treasurer}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <AdminStatusBadge status={group.status} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {new Date(group.createdDate).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {new Date(group.lastActivity).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <Button variant="ghost" size="sm">
          <Eye className="h-4 w-4 mr-1" />
          View
        </Button>
        {group.status === 'active' && onSuspend && (
          <Button variant="ghost" size="sm" onClick={() => onSuspend(group.id)}>
            <XCircle className="h-4 w-4 mr-1" />
            Suspend
          </Button>
        )}
      </td>
    </tr>
  );
};
