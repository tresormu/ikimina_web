import React from 'react';
import { Badge } from '../ui/Badge';

interface AdminStatusBadgeProps {
  status: 'active' | 'inactive' | 'suspended' | 'approved' | 'pending' | 'rejected' | 'escalated' | 'open' | 'resolved';
}

export const AdminStatusBadge: React.FC<AdminStatusBadgeProps> = ({ status }) => {
  const statusConfig = {
    active: { variant: 'success' as const },
    approved: { variant: 'success' as const },
    pending: { variant: 'warning' as const },
    open: { variant: 'warning' as const },
    suspended: { variant: 'error' as const },
    rejected: { variant: 'error' as const },
    escalated: { variant: 'error' as const },
    inactive: { variant: 'default' as const },
    resolved: { variant: 'default' as const }
  };

  const config = statusConfig[status] || statusConfig.pending;
  return <Badge variant={config.variant}>{status}</Badge>;
};
