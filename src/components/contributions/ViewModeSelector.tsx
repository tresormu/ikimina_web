import React from 'react';
import { Button } from '../ui/Button';
import { BarChart3, Users, PieChart, Grid } from 'lucide-react';

interface ViewModeSelectorProps {
  viewMode: 'grid' | 'overview' | 'detailed' | 'analytics';
  setViewMode: (mode: 'grid' | 'overview' | 'detailed' | 'analytics') => void;
}

export const ViewModeSelector: React.FC<ViewModeSelectorProps> = ({ viewMode, setViewMode }) => {
  const modes = [
    { key: 'grid' as const, label: 'Grid', icon: Grid },
    { key: 'overview' as const, label: 'Overview', icon: BarChart3 },
    { key: 'detailed' as const, label: 'Detailed', icon: Users },
    { key: 'analytics' as const, label: 'Analytics', icon: PieChart }
  ];

  return (
    <div className="flex space-x-2">
      {modes.map(({ key, label, icon: Icon }) => (
        <Button
          key={key}
          variant={viewMode === key ? ('primary' as const) : ('outline' as const)}
          size="sm"
          onClick={() => setViewMode(key)}
        >
          <Icon className="h-4 w-4 mr-1" />
          {label}
        </Button>
      ))}
    </div>
  );
};
