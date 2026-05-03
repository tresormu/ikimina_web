import React from 'react';
import { Card, CardContent } from '../ui/Card';
import { DollarSign, CheckCircle, Clock, XCircle } from 'lucide-react';

interface StatsCardProps {
  type: 'collected' | 'rate' | 'time' | 'missed';
  value: string;
  subtitle?: string;
  rate?: number;
}

export const StatsCard: React.FC<StatsCardProps> = ({ type, value, subtitle, rate }) => {
  const cardConfig = {
    collected: {
      icon: DollarSign,
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
      title: 'Total Collected'
    },
    rate: {
      icon: CheckCircle,
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600',
      title: 'Collection Rate'
    },
    time: {
      icon: Clock,
      bgColor: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      title: 'Avg Payment Time'
    },
    missed: {
      icon: XCircle,
      bgColor: 'bg-red-100',
      iconColor: 'text-red-600',
      title: 'Missed Payments'
    }
  };

  const config = cardConfig[type];
  const Icon = config.icon;
  const rateColor = rate ? (rate >= 90 ? 'text-green-600' : rate >= 70 ? 'text-yellow-600' : 'text-red-600') : '';

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center">
          <div className={`p-2 ${config.bgColor} rounded-lg`}>
            <Icon className={`h-6 w-6 ${config.iconColor}`} />
          </div>
          <div className="ml-3">
            <p className="text-sm text-gray-600">{config.title}</p>
            <p className={`text-2xl font-bold ${rateColor || 'text-gray-900'}`}>
              {value}
            </p>
            {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
