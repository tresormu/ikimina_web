import React, { useState } from 'react';
import { DollarSign, TrendingUp, AlertTriangle, Zap, Download, Calendar, Clock } from 'lucide-react';

type ProfitSource = 'loan_interest' | 'late_fee' | 'penalty' | 'subscription' | 'other';

interface ProfitRecord {
  id: string;
  date: string;
  source: ProfitSource;
  member: string;
  description: string;
  amount: number;
}

const profits: ProfitRecord[] = [
  { id: '1', date: '20 Jan 2024', source: 'loan_interest', member: 'Habimana David', description: 'Interest on emergency loan — 5% for 4 weeks', amount: 5000 },
  { id: '2', date: '20 Jan 2024', source: 'late_fee', member: 'Mukamana Alice', description: 'Late payment fee — 3 days overdue', amount: 2500 },
  { id: '3', date: '18 Jan 2024', source: 'penalty', member: 'Habimana David', description: 'Missed payment penalty — Week 8', amount: 2500 },
  { id: '4', date: '14 Jan 2024', source: 'loan_interest', member: 'Bizimana Eric', description: 'Interest on emergency loan — 5% for 2 weeks', amount: 2500 },
  { id: '5', date: '13 Jan 2024', source: 'subscription', member: 'Group', description: 'Monthly group subscription fee', amount: 3500 },
  { id: '6', date: '10 Jan 2024', source: 'late_fee', member: 'Ingabire Grace', description: 'Late payment fee — 1 day overdue', amount: 1000 },
  { id: '7', date: '07 Jan 2024', source: 'penalty', member: 'Mukamana Alice', description: 'Missed payment penalty — Week 6', amount: 2500 },
  { id: '8', date: '05 Jan 2024', source: 'other', member: 'Group', description: 'Credit Passport report fee (member request)', amount: 5000 },
  { id: '9', date: '01 Jan 2024', source: 'loan_interest', member: 'Niyonsaba Jean', description: 'Interest on emergency loan — 5% for 3 weeks', amount: 3750 },
  { id: '10', date: '28 Dec 2023', source: 'late_fee', member: 'Habimana David', description: 'Late payment fee — 5 days overdue', amount: 2500 },
];

const sourceConfig: Record<ProfitSource, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
  loan_interest: { label: 'Loan Interest', color: 'text-blue-700', bg: 'bg-blue-100', icon: <TrendingUp size={14} /> },
  late_fee: { label: 'Late Fee', color: 'text-yellow-700', bg: 'bg-yellow-100', icon: <Clock size={14} /> },
  penalty: { label: 'Penalty', color: 'text-red-700', bg: 'bg-red-100', icon: <AlertTriangle size={14} /> },
  subscription: { label: 'Subscription', color: 'text-green-700', bg: 'bg-green-100', icon: <DollarSign size={14} /> },
  other: { label: 'Other', color: 'text-gray-700', bg: 'bg-gray-100', icon: <Zap size={14} /> },
};

const totalBySource = (source: ProfitSource) =>
  profits.filter(p => p.source === source).reduce((s, p) => s + p.amount, 0);

const grandTotal = profits.reduce((s, p) => s + p.amount, 0);

const Profits: React.FC = () => {
  const [filter, setFilter] = useState<ProfitSource | 'all'>('all');

  const filtered = filter === 'all' ? profits : profits.filter(p => p.source === filter);

  const handleExport = () => {
    const csv = ['Date,Source,Member,Description,Amount (RWF)',
      ...filtered.map(p => `${p.date},${sourceConfig[p.source].label},${p.member},"${p.description}",${p.amount}`)
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `profits_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 p-4 lg:p-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Group Profits</h1>
          <p className="text-gray-500 mt-1">All income earned by the group from loans, fees, and penalties</p>
        </div>
        <button
          onClick={handleExport}
          className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 shadow-sm"
        >
          <Download size={15} /> Export CSV
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <div className="col-span-2 lg:col-span-1 rounded-2xl bg-gray-900 p-5 text-white">
          <p className="text-xs font-bold uppercase tracking-widest text-primary-400">Total Profits</p>
          <p className="mt-2 text-3xl font-black text-primary-400">RWF {grandTotal.toLocaleString()}</p>
          <p className="mt-1 text-xs text-gray-400">All time</p>
        </div>
        {(Object.keys(sourceConfig) as ProfitSource[]).map((source) => (
          <div key={source} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${sourceConfig[source].bg} ${sourceConfig[source].color}`}>
              {sourceConfig[source].icon} {sourceConfig[source].label}
            </div>
            <p className="mt-3 text-xl font-black text-gray-900">RWF {totalBySource(source).toLocaleString()}</p>
          </div>
        ))}
      </div>

      {/* Visual breakdown bar */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <p className="font-bold text-gray-900 mb-4">Profit Breakdown</p>
        <div className="space-y-3">
          {(Object.keys(sourceConfig) as ProfitSource[]).map((source) => {
            const amount = totalBySource(source);
            const pct = grandTotal > 0 ? Math.round((amount / grandTotal) * 100) : 0;
            return (
              <div key={source} className="flex items-center gap-3">
                <span className="w-28 text-xs font-semibold text-gray-600 flex-shrink-0">{sourceConfig[source].label}</span>
                <div className="flex-1 h-3 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="w-20 text-right text-xs font-bold text-gray-700">RWF {amount.toLocaleString()}</span>
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
          All
        </button>
        {(Object.keys(sourceConfig) as ProfitSource[]).map((source) => (
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
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500">Date</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500">Source</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500">Member</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500">Description</th>
                <th className="px-5 py-3 text-right text-xs font-semibold text-gray-500">Amount</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-5 py-3 text-gray-600 flex items-center gap-1.5">
                    <Calendar size={13} className="text-gray-400" /> {p.date}
                  </td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${sourceConfig[p.source].bg} ${sourceConfig[p.source].color}`}>
                      {sourceConfig[p.source].label}
                    </span>
                  </td>
                  <td className="px-5 py-3 font-semibold text-gray-800">{p.member}</td>
                  <td className="px-5 py-3 text-gray-600">{p.description}</td>
                  <td className="px-5 py-3 text-right font-bold text-green-700">RWF {p.amount.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50 border-t border-gray-200">
              <tr>
                <td colSpan={4} className="px-5 py-3 text-sm font-bold text-gray-700">Total ({filtered.length} records)</td>
                <td className="px-5 py-3 text-right font-black text-primary-600">
                  RWF {filtered.reduce((s, p) => s + p.amount, 0).toLocaleString()}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Profits;
