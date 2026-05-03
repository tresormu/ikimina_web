import React from 'react';
import { Badge } from '../ui/Badge';

interface PriorityBadgeProps {
  priority: 'low' | 'medium' | 'high';
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority }) => {
  const priorityConfig = {
    high: { variant: 'error' as const, label: 'High' },
    medium: { variant: 'warning' as const, label: 'Medium' },
    low: { variant: 'default' as const, label: 'Low' }
  };

  const config = priorityConfig[priority];
  return <Badge variant={config.variant}>{config.label}</Badge>;
};
