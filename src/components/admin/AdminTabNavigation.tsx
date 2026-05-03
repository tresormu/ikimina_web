import React from 'react';
import { BarChart3, Users, Building2, AlertCircle, DollarSign } from 'lucide-react';

interface AdminTabNavigationProps {
  activeTab: 'overview' | 'groups' | 'lenders' | 'disputes' | 'revenue';
  setActiveTab: (tab: 'overview' | 'groups' | 'lenders' | 'disputes' | 'revenue') => void;
}

export const AdminTabNavigation: React.FC<AdminTabNavigationProps> = ({ 
  activeTab, 
  setActiveTab 
}) => {
  const tabs = [
    { key: 'overview' as const, label: 'Overview', icon: BarChart3 },
    { key: 'groups' as const, label: 'Groups', icon: Users },
    { key: 'lenders' as const, label: 'Lenders', icon: Building2 },
    { key: 'disputes' as const, label: 'Disputes', icon: AlertCircle },
    { key: 'revenue' as const, label: 'Revenue', icon: DollarSign }
  ];

  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8">
        {tabs.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === key
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Icon className="h-4 w-4 inline mr-2" />
            {label}
          </button>
        ))}
      </nav>
    </div>
  );
};
