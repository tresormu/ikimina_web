import React from 'react';
import { Badge } from '../ui/Badge';

interface StatusBadgeProps {
  status: 'paid' | 'missed' | 'pending' | 'partial';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const statusConfig = {
    paid: { variant: 'success' as const, label: 'Paid' },
    partial: { variant: 'warning' as const, label: 'Partial' },
    pending: { variant: 'default' as const, label: 'Pending' },
    missed: { variant: 'error' as const, label: 'Missed' }
  };

  const config = statusConfig[status] || statusConfig.pending;
  return <Badge variant={config.variant}>{config.label}</Badge>;
};
