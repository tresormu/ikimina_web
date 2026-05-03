import React from 'react';
import { Badge } from '../ui/Badge';

interface PaymentMethodBadgeProps {
  method: 'mobile_money' | 'bank_transfer' | 'cash';
}

export const PaymentMethodBadge: React.FC<PaymentMethodBadgeProps> = ({ method }) => {
  const methodConfig = {
    mobile_money: { variant: 'secondary' as const, label: 'MoMo' },
    bank_transfer: { variant: 'secondary' as const, label: 'Bank' },
    cash: { variant: 'secondary' as const, label: 'Cash' }
  };

  const config = methodConfig[method] || methodConfig.mobile_money;
  return <Badge variant={config.variant} className="text-xs">{config.label}</Badge>;
};
