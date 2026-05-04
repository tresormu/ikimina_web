import React, { useState } from 'react';
import { DollarSign, TrendingUp, Users, FileText, Download, Calendar } from 'lucide-react';

type Source = 'credit_reports' | 'subscriptions' | 'late_fees' | 'loan_interest' | 'penalties';

interface ProfitRecord {
  id: string;
  date: string;
  source: Source;
  group: string;
  description: string;
  amount: number;
}

const records: ProfitRecord[] = [
  { id: '1', date: '20 Jan 2024', source: 'credit_reports', group: 'BPR Bank Rwanda', description: '5 credit reports purchased', amount: 50000 },
  { id: '2', date: '20 Jan 2024', source: 'subscriptions', group: 'Kigali Savings Group', description: 'Monthly subscription — 15 members', amount: 3500 },
  { id: '3', date: '19 Jan 2024', source: 'late_fees', group: 'Nyabugogo Investment Club', description: 'Platform share of late fee — Habimana David', amount: 1250 },
  { id: '4', date: '18 Jan 2024', source: 'credit_reports', group: 'ABC Finance Ltd', description: '3 credit reports purchased', amount: 30000 },
  { id: '5', date: '17 Jan 2024', source: 'loan_interest', group: 'Kimironko Women Group', description: 'Platform share of emergency loan interest', amount: 2500 },
  { id: '6', date: '16 Jan 2024', source: 'subscriptions', group: 'Gisozi Youth Savers', description: 'Monthly subscription — 10 members', amount: 2000 },
  { id: '7', date: '15 Jan 2024', source: 'penalties', group: 'Remera Business Circle', description: 'Platform share of missed payment penalty', amount: 1250 },
  { id: '8', date: '14 Jan 2024', source: 'credit_reports', group: 'ABC Finance Ltd', description: '10 credit reports purchased', amount: 100000 },
  { id: '9', date: '13 Jan 2024', source: 'subscriptions', group: 'Kimironko Women Group', description: 'Monthly subscription — 20 members', amount: 5000 },
  { id: '10', date: '12 Jan 2024', source: 'loan_interest', group: 'Kigali Savings Group', description: 'Platform share of emergency loan interest', amount: 3750 },
  { id: '11', date: '10 Jan 2024', source: 'credit_reports', group: 'Rwanda Credit Union', description: '2 credit reports purchased', amount: 20000 },
  { id: '12', date: '08 Jan 2024', source: 'late_fees', group: 'Gisozi Youth Savers', description: 'Platform share of late fee — Bizimana Eric', amount: 500 },
];

const sourceConfig: Record<Source, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
  credit_reports: { label: 'Credit Reports', color: 'text-blue-700', bg: 'bg-blue-100', icon: <FileText size={14} /> },
  subscriptions: { label: 'Subscriptions', color: 'text-green-700', bg: 'bg-green-100', icon: <Users size={14} /> },
  late_fees: { label: 'Late Fees (65%)', color: 'text-yellow-700', bg: 'bg-yellow-100', icon: <DollarSign size={14} /> },
  loan_interest: { label: 'Loan Interest (65%)', color: 'text-violet-700', bg: 'bg-violet-100', icon: <TrendingUp size={14} /> },
  penalties: { label: 'Penalties (65%)', color: 'text-red-700', bg: 'bg-red-100', icon: <DollarSign size={14} /> },
};

const grandTotal = records.reduce((s, r) => s + r.amount, 0);
const totalBySource = (source: Source) => records.filter(r => r.source === source).reduce((s, r) => s + r.amount, 0);

const AdminProfits: React.FC = () => {
  const [filter, setFilter] = useState<Source | 'all'>('all');
  const filtered = filter === 'all' ? records : records.filter(r => r.source === filter);

  const handleExport = () => {
    const csv = ['Date,Source,Group/Lender,Description,Amount (RWF)',
      ...filtered.map(r => `${r.date},${sourceConfig[r.source].label},${r.group},"${r.description}",${r.amount}`)
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `admin_profits_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 p-4 lg:p-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Platform Profits</h1>
          <p className="text-gray-500 mt-1">All money IkiminaPass earns from credit reports, subscriptions, fees, and interest</p>
        </div>
        <button
          onClick={handleExport}
          className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 shadow-sm"
        >
          <Download size={15} /> Export CSV
        </button>
      </div>

      {/* Total + breakdown */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        <div className="col-span-2 lg:col-span-1 rounded-2xl bg-gray-900 p-6 text-white">
          <p className="text-xs font-bold uppercase tracking-widest text-primary-400">Total Platform Revenue</p>
          <p className="mt-2 text-4xl font-black text-primary-400">RWF {grandTotal.toLocaleString()}</p>
          <p className="mt-1 text-xs text-gray-400">January 2024 (shown)</p>
          <div className="mt-4 pt-4 border-t border-gray-700">
            <p className="text-xs text-gray-400">Monthly target: RWF 2,100,000</p>
            <div className="mt-2 h-2 rounded-full bg-gray-700">
              <div className="h-full rounded-full bg-primary-500" style={{ width: `${Math.min(100, Math.round((grandTotal / 2100000) * 100))}%` }} />
            </div>
            <p className="mt-1 text-xs text-primary-400">{Math.round((grandTotal / 2100000) * 100)}% of monthly target</p>
          </div>
        </div>
        {(Object.keys(sourceConfig) as Source[]).map((source) => (
          <div key={source} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${sourceConfig[source].bg} ${sourceConfig[source].color}`}>
              {sourceConfig[source].icon} {sourceConfig[source].label}
            </div>
            <p className="mt-3 text-xl font-black text-gray-900">RWF {totalBySource(source).toLocaleString()}</p>
            <p className="text-xs text-gray-400 mt-0.5">
              {grandTotal > 0 ? Math.round((totalBySource(source) / grandTotal) * 100) : 0}% of total
            </p>
          </div>
        ))}
      </div>

      {/* Visual bar breakdown */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <p className="font-bold text-gray-900 mb-4">Revenue Sources Breakdown</p>
        <div className="space-y-3">
          {(Object.keys(sourceConfig) as Source[]).map((source) => {
            const amount = totalBySource(source);
            const pct = grandTotal > 0 ? Math.round((amount / grandTotal) * 100) : 0;
            return (
              <div key={source} className="flex items-center gap-3">
                <span className="w-36 text-xs font-semibold text-gray-600 flex-shrink-0">{sourceConfig[source].label}</span>
                <div className="flex-1 h-3 rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full rounded-full bg-primary-500" style={{ width: `${pct}%` }} />
                </div>
                <span className="w-24 text-right text-xs font-bold text-gray-700">RWF {amount.toLocaleString()}</span>
                <span className="w-10 text-right text-xs text-gray-400">{pct}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${filter === 'all' ? 'bg-primary-500 text-white' : 'border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
        >
          All Sources
        </button>
        {(Object.keys(sourceConfig) as Source[]).map((source) => (
          <button
            key={source}
            onClick={() => setFilter(source)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${filter === source ? 'bg-primary-500 text-white' : 'border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
          >
            {sourceConfig[source].label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {['Date', 'Source', 'Group / Lender', 'Description', 'Amount'].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-5 py-3 text-gray-600 flex items-center gap-1.5">
                    <Calendar size={13} className="text-gray-400" /> {r.date}
                  </td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${sourceConfig[r.source].bg} ${sourceConfig[r.source].color}`}>
                      {sourceConfig[r.source].label}
                    </span>
                  </td>
                  <td className="px-5 py-3 font-semibold text-gray-800">{r.group}</td>
                  <td className="px-5 py-3 text-gray-600">{r.description}</td>
                  <td className="px-5 py-3 text-right font-bold text-green-700">RWF {r.amount.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50 border-t border-gray-200">
              <tr>
                <td colSpan={4} className="px-5 py-3 text-sm font-bold text-gray-700">Total ({filtered.length} records)</td>
                <td className="px-5 py-3 text-right font-black text-primary-600">
                  RWF {filtered.reduce((s, r) => s + r.amount, 0).toLocaleString()}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProfits;
