import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Phone, Calendar, CheckCircle, XCircle, Clock, TrendingUp, DollarSign, Star } from 'lucide-react';

// Full payment history from day one
const allPayments = [
  // Cycle 1
  { week: 1, cycle: 1, date: '05 Mar 2023', amount: 25000, status: 'paid', method: 'MoMo', txId: 'MM001' },
  { week: 2, cycle: 1, date: '12 Mar 2023', amount: 25000, status: 'paid', method: 'MoMo', txId: 'MM002' },
  { week: 3, cycle: 1, date: '19 Mar 2023', amount: 25000, status: 'paid', method: 'MoMo', txId: 'MM003' },
  { week: 4, cycle: 1, date: '26 Mar 2023', amount: 25000, status: 'missed', method: '-', txId: '-' },
  { week: 5, cycle: 1, date: '02 Apr 2023', amount: 25000, status: 'paid', method: 'MoMo', txId: 'MM005' },
  { week: 6, cycle: 1, date: '09 Apr 2023', amount: 25000, status: 'paid', method: 'MoMo', txId: 'MM006' },
  { week: 7, cycle: 1, date: '16 Apr 2023', amount: 25000, status: 'paid', method: 'MoMo', txId: 'MM007' },
  { week: 8, cycle: 1, date: '23 Apr 2023', amount: 25000, status: 'paid', method: 'MoMo', txId: 'MM008' },
  // Cycle 2
  { week: 1, cycle: 2, date: '30 Apr 2023', amount: 25000, status: 'paid', method: 'MoMo', txId: 'MM009' },
  { week: 2, cycle: 2, date: '07 May 2023', amount: 25000, status: 'paid', method: 'MoMo', txId: 'MM010' },
  { week: 3, cycle: 2, date: '14 May 2023', amount: 25000, status: 'paid', method: 'MoMo', txId: 'MM011' },
  { week: 4, cycle: 2, date: '21 May 2023', amount: 25000, status: 'paid', method: 'MoMo', txId: 'MM012' },
  { week: 5, cycle: 2, date: '28 May 2023', amount: 25000, status: 'missed', method: '-', txId: '-' },
  { week: 6, cycle: 2, date: '04 Jun 2023', amount: 25000, status: 'paid', method: 'MoMo', txId: 'MM014' },
  { week: 7, cycle: 2, date: '11 Jun 2023', amount: 25000, status: 'paid', method: 'MoMo', txId: 'MM015' },
  { week: 8, cycle: 2, date: '18 Jun 2023', amount: 25000, status: 'paid', method: 'MoMo', txId: 'MM016' },
  // Cycle 3
  { week: 1, cycle: 3, date: '25 Jun 2023', amount: 25000, status: 'paid', method: 'MoMo', txId: 'MM017' },
  { week: 2, cycle: 3, date: '02 Jul 2023', amount: 25000, status: 'paid', method: 'MoMo', txId: 'MM018' },
  { week: 3, cycle: 3, date: '09 Jul 2023', amount: 25000, status: 'paid', method: 'MoMo', txId: 'MM019' },
  { week: 4, cycle: 3, date: '16 Jul 2023', amount: 25000, status: 'paid', method: 'MoMo', txId: 'MM020' },
  { week: 5, cycle: 3, date: '23 Jul 2023', amount: 25000, status: 'paid', method: 'MoMo', txId: 'MM021' },
  { week: 6, cycle: 3, date: '30 Jul 2023', amount: 25000, status: 'paid', method: 'MoMo', txId: 'MM022' },
  { week: 7, cycle: 3, date: '06 Aug 2023', amount: 25000, status: 'paid', method: 'MoMo', txId: 'MM023' },
  { week: 8, cycle: 3, date: '20 Jan 2024', amount: 25000, status: 'paid', method: 'MoMo', txId: 'MM024' },
];

const member = {
  id: '1',
  name: 'Uwimana Marie',
  phone: '+250 788 123 456',
  joinDate: '05 March 2023',
  status: 'active',
  position: 1,
  creditScore: 742,
  totalPaid: allPayments.filter(p => p.status === 'paid').reduce((s, p) => s + p.amount, 0),
  missedCount: allPayments.filter(p => p.status === 'missed').length,
  onTimeRate: Math.round((allPayments.filter(p => p.status === 'paid').length / allPayments.length) * 100),
};

const cycles = [...new Set(allPayments.map(p => p.cycle))].sort((a, b) => b - a);

const statusIcon = (s: string) => {
  if (s === 'paid') return <CheckCircle size={15} className="text-green-500" />;
  if (s === 'missed') return <XCircle size={15} className="text-red-500" />;
  return <Clock size={15} className="text-yellow-500" />;
};

const statusStyle = (s: string) => {
  if (s === 'paid') return 'bg-green-100 text-green-700';
  if (s === 'missed') return 'bg-red-100 text-red-700';
  return 'bg-yellow-100 text-yellow-700';
};

const MemberDetail: React.FC = () => {
  const { id } = useParams();

  const scoreColor = member.creditScore >= 700 ? 'text-green-600' : member.creditScore >= 500 ? 'text-yellow-600' : 'text-red-600';
  const scoreLabel = member.creditScore >= 700 ? 'Excellent' : member.creditScore >= 500 ? 'Good' : 'Fair';

  return (
    <div className="space-y-6 p-4 lg:p-6">
      {/* Back */}
      <Link to="/treasurer/members" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-primary-600">
        <ArrowLeft size={16} /> Back to Members
      </Link>

      {/* Header */}
      <div className="flex items-start gap-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-primary-500 text-2xl font-black text-white">
          {member.name.charAt(0)}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl font-black text-gray-900">{member.name}</h1>
            <span className="rounded-full bg-green-100 px-3 py-0.5 text-sm font-bold text-green-700">Active Member</span>
          </div>
          <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1"><Phone size={13} /> {member.phone}</span>
            <span className="flex items-center gap-1"><Calendar size={13} /> Joined {member.joinDate}</span>
            <span className="flex items-center gap-1"><Star size={13} /> Position {member.position} in rotation</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: 'Total Paid', value: `RWF ${member.totalPaid.toLocaleString()}`, icon: <DollarSign size={18} className="text-green-600" />, bg: 'bg-green-50' },
          { label: 'On-Time Rate', value: `${member.onTimeRate}%`, icon: <TrendingUp size={18} className="text-blue-600" />, bg: 'bg-blue-50' },
          { label: 'Missed Payments', value: member.missedCount, icon: <XCircle size={18} className="text-red-600" />, bg: 'bg-red-50' },
          { label: 'Total Weeks', value: allPayments.length, icon: <Calendar size={18} className="text-primary-600" />, bg: 'bg-primary-50' },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${s.bg}`}>{s.icon}</div>
            <p className="mt-3 text-xl font-black text-gray-900">{s.value}</p>
            <p className="text-sm text-gray-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Credit Passport */}
      <div className="rounded-2xl border border-gray-200 bg-gray-900 p-6 text-white">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-primary-400">Credit Passport Score</p>
            <div className="mt-2 flex items-end gap-3">
              <span className={`text-5xl font-black ${scoreColor}`}>{member.creditScore}</span>
              <span className="mb-1 text-lg text-gray-400">/ 850</span>
              <span className={`mb-1 rounded-full px-3 py-0.5 text-sm font-bold ${scoreColor} bg-white/10`}>{scoreLabel}</span>
            </div>
            <p className="mt-2 text-sm text-gray-400">Based on {allPayments.length} weeks of payment history</p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'On-time %', value: `${member.onTimeRate}%` },
              { label: 'Months active', value: '10' },
              { label: 'Missed', value: member.missedCount },
            ].map((item) => (
              <div key={item.label} className="rounded-xl bg-white/10 p-3 text-center">
                <p className="text-lg font-extrabold text-primary-400">{item.value}</p>
                <p className="text-xs text-gray-400 mt-0.5">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Full payment history */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <p className="font-bold text-gray-900 mb-1">Full Payment History — From Day One</p>
        <p className="text-sm text-gray-500 mb-5">Every payment this member has made since joining the group</p>

        {cycles.map((cycle) => (
          <div key={cycle} className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="rounded-full bg-primary-500 px-3 py-0.5 text-xs font-bold text-white">Cycle {cycle}</span>
              <div className="flex-1 h-px bg-gray-100" />
              <span className="text-xs text-gray-400">
                {allPayments.filter(p => p.cycle === cycle && p.status === 'paid').length} / {allPayments.filter(p => p.cycle === cycle).length} paid
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="pb-2 text-left text-xs font-semibold text-gray-400">Week</th>
                    <th className="pb-2 text-left text-xs font-semibold text-gray-400">Date</th>
                    <th className="pb-2 text-left text-xs font-semibold text-gray-400">Amount</th>
                    <th className="pb-2 text-left text-xs font-semibold text-gray-400">Method</th>
                    <th className="pb-2 text-left text-xs font-semibold text-gray-400">Transaction ID</th>
                    <th className="pb-2 text-left text-xs font-semibold text-gray-400">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {allPayments.filter(p => p.cycle === cycle).map((p, i) => (
                    <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="py-2.5 font-semibold text-gray-700">Week {p.week}</td>
                      <td className="py-2.5 text-gray-600">{p.date}</td>
                      <td className="py-2.5 font-semibold text-gray-900">
                        {p.status === 'missed' ? '—' : `RWF ${p.amount.toLocaleString()}`}
                      </td>
                      <td className="py-2.5 text-gray-600">{p.method}</td>
                      <td className="py-2.5 text-gray-400 font-mono text-xs">{p.txId}</td>
                      <td className="py-2.5">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${statusStyle(p.status)}`}>
                          {statusIcon(p.status)}
                          {p.status === 'paid' ? 'Paid' : p.status === 'missed' ? 'Missed' : 'Pending'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemberDetail;
