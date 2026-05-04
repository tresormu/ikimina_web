import React, { useState } from 'react';
import { CheckCircle, XCircle, Clock, DollarSign, User, Calendar, MessageSquare } from 'lucide-react';

interface LoanRequest {
  id: string;
  memberName: string;
  memberPhone: string;
  amount: number;
  reason: string;
  requestDate: string;
  status: 'pending' | 'approved' | 'denied';
  decisionDate?: string;
  decisionNote?: string;
  onTimeRate: number;
  monthsActive: number;
}

const initialLoans: LoanRequest[] = [
  { id: '1', memberName: 'Habimana David', memberPhone: '+250 744 567 890', amount: 75000, reason: 'Medical emergency for my child', requestDate: '20 Jan 2024', status: 'pending', onTimeRate: 72, monthsActive: 8 },
  { id: '2', memberName: 'Mukamana Alice', memberPhone: '+250 733 456 789', amount: 50000, reason: 'School fees for January term', requestDate: '18 Jan 2024', status: 'pending', onTimeRate: 88, monthsActive: 12 },
  { id: '3', memberName: 'Ingabire Grace', memberPhone: '+250 755 678 901', amount: 100000, reason: 'Business stock purchase', requestDate: '15 Jan 2024', status: 'approved', decisionDate: '16 Jan 2024', decisionNote: 'Good payment history, approved.', onTimeRate: 95, monthsActive: 18 },
  { id: '4', memberName: 'Bizimana Eric', memberPhone: '+250 766 789 012', amount: 30000, reason: 'Home repair after rain damage', requestDate: '10 Jan 2024', status: 'denied', decisionDate: '11 Jan 2024', decisionNote: 'Has 2 missed payments this cycle. Denied until cleared.', onTimeRate: 65, monthsActive: 5 },
];

const LoanManagement: React.FC = () => {
  const [loans, setLoans] = useState<LoanRequest[]>(initialLoans);
  const [selected, setSelected] = useState<LoanRequest | null>(null);
  const [decisionNote, setDecisionNote] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'denied'>('all');

  const filtered = filter === 'all' ? loans : loans.filter(l => l.status === filter);
  const pending = loans.filter(l => l.status === 'pending');

  const handleDecision = (id: string, decision: 'approved' | 'denied') => {
    setLoans(prev => prev.map(l => l.id === id ? {
      ...l,
      status: decision,
      decisionDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      decisionNote: decisionNote || (decision === 'approved' ? 'Approved by treasurer.' : 'Denied by treasurer.'),
    } : l));
    setSelected(null);
    setDecisionNote('');
  };

  const statusStyle = (s: string) => {
    if (s === 'approved') return 'bg-green-100 text-green-700';
    if (s === 'denied') return 'bg-red-100 text-red-700';
    return 'bg-yellow-100 text-yellow-700';
  };

  const reliabilityColor = (rate: number) =>
    rate >= 90 ? 'text-green-600' : rate >= 75 ? 'text-yellow-600' : 'text-red-600';

  return (
    <div className="space-y-6 p-4 lg:p-6">
      <div>
        <h1 className="text-2xl font-black text-gray-900">Loan Requests</h1>
        <p className="text-gray-500 mt-1">Review and decide on member loan requests — your decision is final</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Pending Review', value: loans.filter(l => l.status === 'pending').length, color: 'text-yellow-600', bg: 'bg-yellow-50' },
          { label: 'Approved', value: loans.filter(l => l.status === 'approved').length, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Denied', value: loans.filter(l => l.status === 'denied').length, color: 'text-red-600', bg: 'bg-red-50' },
        ].map(s => (
          <div key={s.label} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm text-center">
            <p className={`text-3xl font-black ${s.color}`}>{s.value}</p>
            <p className="text-sm text-gray-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Important note */}
      <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800">
        <p className="font-bold mb-1">ℹ️ How loan decisions work</p>
        <p>As treasurer, you review each request and decide to approve or deny it. There is no group voting — this is your responsibility. Consider the member's payment history and the reason they gave before deciding.</p>
      </div>

      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        {(['all', 'pending', 'approved', 'denied'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold capitalize transition-colors ${filter === f ? 'bg-primary-500 text-white' : 'border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
          >
            {f} {f !== 'all' && `(${loans.filter(l => l.status === f).length})`}
          </button>
        ))}
      </div>

      {/* Loan list */}
      <div className="space-y-3">
        {filtered.map(loan => (
          <div key={loan.id} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-100 text-base font-black text-primary-700 flex-shrink-0">
                  {loan.memberName.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-bold text-gray-900">{loan.memberName}</p>
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold capitalize ${statusStyle(loan.status)}`}>{loan.status}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">{loan.memberPhone} · Requested {loan.requestDate}</p>
                  <p className="text-sm text-gray-700 mt-1.5">"{loan.reason}"</p>
                  <div className="mt-2 flex gap-3 text-xs text-gray-500">
                    <span className={`font-semibold ${reliabilityColor(loan.onTimeRate)}`}>{loan.onTimeRate}% on-time</span>
                    <span>·</span>
                    <span>{loan.monthsActive} months active</span>
                  </div>
                  {loan.decisionNote && (
                    <div className="mt-2 rounded-lg bg-gray-50 px-3 py-2 text-xs text-gray-600">
                      <strong>Decision note:</strong> {loan.decisionNote}
                    </div>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-black text-gray-900">RWF {loan.amount.toLocaleString()}</p>
                {loan.status === 'pending' && (
                  <button
                    onClick={() => { setSelected(loan); setDecisionNote(''); }}
                    className="mt-2 rounded-xl bg-primary-500 px-4 py-2 text-sm font-bold text-white hover:bg-primary-600"
                  >
                    Review Request
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-gray-400">
            <DollarSign size={32} className="mx-auto mb-3 opacity-40" />
            <p>No loan requests in this category</p>
          </div>
        )}
      </div>

      {/* Decision modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-7 shadow-2xl">
            <h3 className="text-xl font-black text-gray-900">Review Loan Request</h3>
            <div className="mt-4 rounded-xl bg-gray-50 p-4 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Member</span><span className="font-bold">{selected.memberName}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Amount</span><span className="font-black text-primary-600">RWF {selected.amount.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Reason</span><span className="font-semibold text-right max-w-[60%]">{selected.reason}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">On-time rate</span><span className={`font-bold ${reliabilityColor(selected.onTimeRate)}`}>{selected.onTimeRate}%</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Months active</span><span className="font-bold">{selected.monthsActive}</span></div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Your decision note (optional)</label>
              <textarea
                value={decisionNote}
                onChange={e => setDecisionNote(e.target.value)}
                placeholder="Add a note explaining your decision..."
                rows={3}
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100 resize-none"
              />
            </div>
            <div className="mt-5 flex gap-3">
              <button
                onClick={() => handleDecision(selected.id, 'approved')}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 py-3 font-bold text-white hover:bg-green-700"
              >
                <CheckCircle size={16} /> Approve
              </button>
              <button
                onClick={() => handleDecision(selected.id, 'denied')}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 py-3 font-bold text-white hover:bg-red-700"
              >
                <XCircle size={16} /> Deny
              </button>
            </div>
            <button onClick={() => setSelected(null)} className="mt-3 w-full rounded-xl border border-gray-200 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanManagement;
