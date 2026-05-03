import React from 'react';
import { Card, CardContent } from '../ui/Card';
import { Users, Building2, DollarSign, AlertCircle } from 'lucide-react';

interface AdminStatsCardProps {
  type: 'groups' | 'lenders' | 'revenue' | 'disputes';
  value: string | number;
  subtitle: string;
  bgColor?: string;
  iconColor?: string;
}

export const AdminStatsCard: React.FC<AdminStatsCardProps> = ({ 
  type, 
  value, 
  subtitle, 
  bgColor, 
  iconColor 
}) => {
  const cardConfig = {
    groups: {
      icon: Users,
      bgColor: bgColor || 'bg-blue-100',
      iconColor: iconColor || 'text-blue-600',
      title: 'Total Groups'
    },
    lenders: {
      icon: Building2,
      bgColor: bgColor || 'bg-green-100',
      iconColor: iconColor || 'text-green-600',
      title: 'Total Lenders'
    },
    revenue: {
      icon: DollarSign,
      bgColor: bgColor || 'bg-purple-100',
      iconColor: iconColor || 'text-purple-600',
      title: 'Total Revenue'
    },
    disputes: {
      icon: AlertCircle,
      bgColor: bgColor || 'bg-red-100',
      iconColor: iconColor || 'text-red-600',
      title: 'Total Disputes'
    }
  };

  const config = cardConfig[type];
  const Icon = config.icon;

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center">
          <div className={`p-2 ${config.bgColor} rounded-lg`}>
            <Icon className={`h-6 w-6 ${config.iconColor}`} />
          </div>
          <div className="ml-3">
            <p className="text-sm text-gray-600">{config.title}</p>
            <p className="text-xl font-bold text-gray-900">{value}</p>
            <p className="text-xs text-gray-500">{subtitle}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
