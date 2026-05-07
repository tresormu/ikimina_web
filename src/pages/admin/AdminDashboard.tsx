import React, { useState } from 'react';
import { Users, TrendingUp, DollarSign, AlertTriangle, CheckCircle, XCircle, Clock, Eye, Ban, UserCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [
  { label: 'Total Groups', value: '156', sub: '142 active', icon: <Users size={20} className="text-primary-600" />, bg: 'bg-primary-50' },
  { label: 'Total Members', value: '3,240', sub: 'across all groups', icon: <Users size={20} className="text-blue-600" />, bg: 'bg-blue-50' },
  { label: 'Platform Revenue', value: 'RWF 12.5M', sub: 'RWF 2.1M this month', icon: <DollarSign size={20} className="text-green-600" />, bg: 'bg-green-50' },
  { label: 'Open Disputes', value: '12', sub: '5 escalated', icon: <AlertTriangle size={20} className="text-red-600" />, bg: 'bg-red-50' },
  { label: 'Credit Reports Sold', value: '847', sub: 'RWF 8.47M revenue', icon: <TrendingUp size={20} className="text-yellow-600" />, bg: 'bg-yellow-50' },
];

const groups = [
  { id: '1', name: 'Kigali Savings Group', members: 15, treasurer: 'Jean Mugisha', status: 'active', cycle: 3, week: 8, lastActivity: '20 Jan 2024' },
  { id: '2', name: 'Nyabugogo Investment Club', members: 12, treasurer: 'Alice Uwimana', status: 'active', cycle: 2, week: 5, lastActivity: '19 Jan 2024' },
  { id: '3', name: 'Remera Business Circle', members: 8, treasurer: 'Bob Niyonsaba', status: 'suspended', cycle: 1, week: 3, lastActivity: '15 Jan 2024' },
  { id: '4', name: 'Kimironko Women Group', members: 20, treasurer: 'Grace Ingabire', status: 'active', cycle: 4, week: 2, lastActivity: '20 Jan 2024' },
  { id: '5', name: 'Gisozi Youth Savers', members: 10, treasurer: 'Eric Bizimana', status: 'active', cycle: 1, week: 6, lastActivity: '18 Jan 2024' },
];

const disputes = [
  { id: '1', group: 'Kigali Savings Group', member: 'Jean Mugisha', issue: 'Payment not recorded after MoMo confirmation', status: 'escalated', priority: 'high', date: '18 Jan 2024' },
  { id: '2', group: 'Nyabugogo Investment Club', member: 'Alice Uwimana', issue: 'Rotation order dispute — member claims wrong position', status: 'open', priority: 'medium', date: '20 Jan 2024' },
  { id: '3', group: 'Gisozi Youth Savers', member: 'Eric Bizimana', issue: 'Treasurer marked payment as missed despite MoMo receipt', status: 'escalated', priority: 'high', date: '17 Jan 2024' },
];

const recentActivity = [
  { icon: <CheckCircle size={15} className="text-green-500" />, text: 'Kimironko Women Group completed Week 2 — 100% collection', time: '2 hours ago' },
  { icon: <AlertTriangle size={15} className="text-red-500" />, text: 'New dispute escalated from Kigali Savings Group', time: '6 hours ago' },
  { icon: <Users size={15} className="text-primary-500" />, text: 'New group registered: Gisozi Youth Savers (10 members)', time: '1 day ago' },
  { icon: <DollarSign size={15} className="text-green-500" />, text: 'Monthly revenue milestone: RWF 2.1M collected', time: '2 days ago' },
];

const monthlyRevenue = [
  { month: 'Aug', amount: 1400000 },
  { month: 'Sep', amount: 1600000 },
  { month: 'Oct', amount: 1750000 },
  { month: 'Nov', amount: 1900000 },
  { month: 'Dec', amount: 2000000 },
  { month: 'Jan', amount: 2100000 },
];

const statusStyle = (s: string) => {
  if (s === 'active' || s === 'approved') return 'bg-green-100 text-green-700';
  if (s === 'pending') return 'bg-yellow-100 text-yellow-700';
  if (s === 'suspended' || s === 'rejected') return 'bg-red-100 text-red-700';
  return 'bg-gray-100 text-gray-700';
};

const priorityStyle = (p: string) => {
  if (p === 'high') return 'bg-red-100 text-red-700';
  if (p === 'medium') return 'bg-yellow-100 text-yellow-700';
  return 'bg-gray-100 text-gray-700';
};

const AdminDashboard: React.FC = () => {
  const [tab, setTab] = useState<'overview' | 'groups' | 'disputes'>('overview');
  const maxRevenue = Math.max(...monthlyRevenue.map(d => d.amount));

  return (
    <div className="space-y-6 p-4 lg:p-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500 mt-1">Full platform overview — groups, members, disputes, and revenue</p>
        </div>
        <Link
          to="/admin/profits"
          className="inline-flex items-center gap-2 rounded-xl bg-primary-500 px-4 py-2.5 text-sm font-bold text-white hover:bg-primary-600"
        >
          <DollarSign size={16} /> View Platform Profits
        </Link>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${s.bg}`}>{s.icon}</div>
            <p className="mt-3 text-2xl font-black text-gray-900">{s.value}</p>
            <p className="text-sm font-semibold text-gray-700">{s.label}</p>
            <p className="text-xs text-gray-400 mt-0.5">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Revenue chart + Recent activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="font-bold text-gray-900">Monthly Revenue — Last 6 Months</p>
          <p className="text-sm text-gray-500 mt-0.5">Platform income from subscriptions and credit reports</p>
          <div className="mt-6 flex items-end gap-3 h-32">
            {monthlyRevenue.map((d) => {
              const h = Math.round((d.amount / maxRevenue) * 112);
              return (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full rounded-t-lg bg-primary-500 hover:bg-primary-600 transition-colors cursor-pointer" style={{ height: h }} title={`RWF ${d.amount.toLocaleString()}`} />
                  <span className="text-xs text-gray-500">{d.month}</span>
                </div>
              );
            })}
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
            <span>RWF 1.4M</span>
            <span className="text-green-600 font-semibold">↑ 50% growth in 6 months</span>
            <span>RWF 2.1M</span>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="font-bold text-gray-900 mb-4">Recent Platform Activity</p>
          <div className="space-y-3">
            {recentActivity.map((a, i) => (
              <div key={i} className="flex items-start gap-3 rounded-xl border border-gray-100 p-3">
                <div className="mt-0.5">{a.icon}</div>
                <div>
                  <p className="text-sm text-gray-800">{a.text}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-xl border border-gray-200 bg-gray-50 p-1 w-fit">
        {(['overview', 'groups', 'disputes'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-lg px-4 py-2 text-sm font-semibold capitalize transition-colors ${tab === t ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Overview tab */}
      {tab === 'overview' && (
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { label: 'Groups needing attention', value: '3', desc: '2 with low collection rate, 1 suspended', color: 'border-red-200 bg-red-50', textColor: 'text-red-700' },
            { label: 'Disputes to resolve', value: '5', desc: '3 escalated, 2 open for over 48 hours', color: 'border-orange-200 bg-orange-50', textColor: 'text-orange-700' },
          ].map((item) => (
            <div key={item.label} className={`rounded-2xl border p-5 ${item.color}`}>
              <p className={`text-3xl font-black ${item.textColor}`}>{item.value}</p>
              <p className={`text-sm font-bold mt-1 ${item.textColor}`}>{item.label}</p>
              <p className="text-xs text-gray-600 mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      )}

      {/* Groups tab */}
      {tab === 'groups' && (
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100">
            <p className="font-bold text-gray-900">All Registered Groups</p>
            <p className="text-sm text-gray-500 mt-0.5">{groups.length} groups shown</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {['Group Name', 'Members', 'Treasurer', 'Cycle / Week', 'Status', 'Last Active', 'Actions'].map(h => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {groups.map((g) => (
                  <tr key={g.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-5 py-3 font-semibold text-gray-900">{g.name}</td>
                    <td className="px-5 py-3 text-gray-600">{g.members}</td>
                    <td className="px-5 py-3 text-gray-600">{g.treasurer}</td>
                    <td className="px-5 py-3 text-gray-600">Cycle {g.cycle}, Week {g.week}</td>
                    <td className="px-5 py-3">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold capitalize ${statusStyle(g.status)}`}>{g.status}</span>
                    </td>
                    <td className="px-5 py-3 text-gray-500 text-xs">{g.lastActivity}</td>
                    <td className="px-5 py-3">
                      <div className="flex gap-2">
                        <button className="rounded-lg border border-gray-200 p-1.5 hover:bg-gray-100"><Eye size={14} /></button>
                        <button className="rounded-lg border border-red-200 p-1.5 text-red-500 hover:bg-red-50"><Ban size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Disputes tab */}
      {tab === 'disputes' && (
        <div className="space-y-3">
          {disputes.map((d) => (
            <div key={d.id} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${priorityStyle(d.priority)}`}>{d.priority} priority</span>
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${statusStyle(d.status)}`}>{d.status}</span>
                  </div>
                  <p className="mt-2 font-bold text-gray-900">{d.issue}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    <strong>{d.member}</strong> — {d.group} — {d.date}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="rounded-xl bg-green-100 px-3 py-2 text-xs font-bold text-green-700 hover:bg-green-200">Mark Resolved</button>
                  <button className="rounded-xl border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-50">View Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
