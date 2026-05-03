import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { AlertTriangle, MessageSquare } from 'lucide-react';

interface PaymentReminder {
  memberId: string;
  memberName: string;
  amount: number;
  daysOverdue: number;
  lastContactDate?: string;
}

interface PaymentRemindersProps {
  reminders: PaymentReminder[];
  onSendReminder: (memberId: string) => void;
}

export const PaymentReminders: React.FC<PaymentRemindersProps> = ({ 
  reminders, 
  onSendReminder 
}) => {
  if (reminders.length === 0) return null;

  return (
    <Card className="border-orange-200 bg-orange-50">
      <CardHeader>
        <CardTitle className="flex items-center text-orange-800">
          <AlertTriangle className="h-5 w-5 mr-2" />
          Payment Reminders Needed
        </CardTitle>
        <CardDescription className="text-orange-600">
          Members with overdue payments
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {reminders.map((reminder) => (
            <div key={reminder.memberId} className="flex items-center justify-between p-3 bg-white rounded-lg border">
              <div>
                <p className="font-medium text-gray-900">{reminder.memberName}</p>
                <p className="text-sm text-gray-500">
                  RWF {reminder.amount.toLocaleString()} - {reminder.daysOverdue} days overdue
                </p>
              </div>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => onSendReminder(reminder.memberId)}
              >
                <MessageSquare className="h-4 w-4 mr-1" />
                Remind
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
