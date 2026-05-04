import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import {
  Users, TrendingUp, AlertTriangle, Bell, Megaphone,
  Upload, Star, Copy, CheckCircle, XCircle, Clock,
  DollarSign, Phone, Calendar, ArrowRight,
} from 'lucide-react';

const GROUP_CODE = 'IKM-2847';
const USSD_CODE = '*777*2847#';

const members = [
  { id: '1', name: 'Uwimana Marie', phone: '+250 788 123 456', status: 'paid', amount: 25000, position: 1 },
  { id: '2', name: 'Niyonsaba Jean', phone: '+250 722 345 678', status: 'paid', amount: 25000, position: 2 },
  { id: '3', name: 'Mukamana Alice', phone: '+250 733 456 789', status: 'pending', amount: 25000, position: 3 },
  { id: '4', name: 'Habimana David', phone: '+250 744 567 890', status: 'missed', amount: 25000, position: 4 },
  { id: '5', name: 'Ingabire Grace', phone: '+250 755 678 901', status: 'paid', amount: 25000, position: 5 },
  { id: '6', name: 'Bizimana Eric', phone: '+250 766 789 012', status: 'paid', amount: 25000, position: 6 },
];

const weeklyData = [
  { week: 'Wk 3', collected: 120000, expected: 150000 },
  { week: 'Wk 4', collected: 150000, expected: 150000 },
  { week: 'Wk 5', collected: 125000, expected: 150000 },
  { week: 'Wk 6', collected: 150000, expected: 150000 },
  { week: 'Wk 7', collected: 140000, expected: 150000 },
  { week: 'Wk 8', collected: 100000, expected: 150000 },
];

const recentActivity = [
  { icon: <CheckCircle size={16} className="text-green-500" />, text: 'Uwimana Marie paid RWF 25,000', time: '2 hours ago' },
  { icon: <CheckCircle size={16} className="text-green-500" />, text: 'Ingabire Grace paid RWF 25,000', time: '4 hours ago' },
  { icon: <XCircle size={16} className="text-red-500" />, text: 'Habimana David missed this week', time: '1 day ago' },
  { icon: <Clock size={16} className="text-yellow-500" />, text: 'Mukamana Alice payment pending', time: '1 day ago' },
  { icon: <Bell size={16} className="text-blue-500" />, text: 'Rotation payout sent to Niyonsaba Jean', time: '2 days ago' },
];

const TreasurerDashboard: React.FC = () => {
  const { user } = useAuthStore();
  const [announcement, setAnnouncement] = useState('');
  const [codeCopied, setCodeCopied] = useState(false);
  const [ussdCopied, setUssdCopied] = useState(false);
  const [showRotationModal, setShowRotationModal] = useState(false);
  const [rotationConfirmed, setRotationConfirmed] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const paid = members.filter(m => m.status === 'paid').length;
  const pending = members.filter(m => m.status === 'pending').length;
  const missed = members.filter(m => m.status === 'missed').length;
  const totalCollected = members.filter(m => m.status === 'paid').reduce((s, m) => s + m.amount, 0);
  const totalExpected = members.length * 25000;
  const collectionRate = Math.round((totalCollected / totalExpected) * 100);

  const maxBar = Math.max(...weeklyData.map(d => d.expected));

  const copyCode = (val: string, setter: (v: boolean) => void) => {
    navigator.clipboard.writeText(val);
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) alert(`File "${file.name}" uploaded. Members will be imported shortly.`);
  };

  const statusColor = (s: string) => {
    if (s === 'paid') return 'bg-green-100 text-green-700';
    if (s === 'pending') return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  };

  const statusLabel = (s: string) => {
    if (s === 'paid') return 'Paid ✓';
    if (s === 'pending') return 'Waiting';
    return 'Missed ✗';
  };

  return (
    <div className="space-y-6 p-4 lg:p-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900">
            Welcome back, {user?.fullName?.split(' ')[0] || 'Treasurer'} 👋
          </h1>
          <p className="text-gray-500 mt-1">Here is what is happening in your group today</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 shadow-sm"
          >
            <Upload size={16} /> Import Members (Excel)
          </button>
          <input ref={fileInputRef} type="file" accept=".xlsx,.xls,.csv" className="hidden" onChange={handleFileUpload} />
          <Link
            to="/treasurer/members"
            className="inline-flex items-center gap-2 rounded-xl bg-primary-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-600"
          >
            <Users size={16} /> Manage Members
          </Link>
        </div>
      </div>

      {/* Ikimina Code + USSD */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-primary-200 bg-primary-50 p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-primary-600">Your Ikimina Group Code</p>
          <div className="mt-2 flex items-center gap-3">
            <span className="text-3xl font-black text-gray-900 tracking-widest">{GROUP_CODE}</span>
            <button
              onClick={() => copyCode(GROUP_CODE, setCodeCopied)}
              className="flex items-center gap-1 rounded-lg bg-primary-500 px-3 py-1.5 text-xs font-bold text-white hover:bg-primary-600"
            >
              <Copy size={12} /> {codeCopied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <p className="mt-2 text-xs text-gray-500">Share this code with new members so they can join your group</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-gray-900 p-5 text-white">
          <p className="text-xs font-bold uppercase tracking-widest text-primary-400">USSD Code for Members</p>
          <div className="mt-2 flex items-center gap-3">
            <span className="text-3xl font-black tracking-widest text-primary-400">{USSD_CODE}</span>
            <button
              onClick={() => copyCode(USSD_CODE, setUssdCopied)}
              className="flex items-center gap-1 rounded-lg bg-primary-500 px-3 py-1.5 text-xs font-bold text-white hover:bg-primary-600"
            >
              <Copy size={12} /> {ussdCopied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <p className="mt-2 text-xs text-gray-400">Members without smartphones dial this code to pay and check their balance</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: 'Total Members', value: members.length, icon: <Users size={20} className="text-primary-600" />, bg: 'bg-primary-50' },
          { label: 'Paid This Week', value: paid, icon: <CheckCircle size={20} className="text-green-600" />, bg: 'bg-green-50' },
          { label: 'Still Waiting', value: pending + missed, icon: <Clock size={20} className="text-yellow-600" />, bg: 'bg-yellow-50' },
          { label: 'Collection Rate', value: `${collectionRate}%`, icon: <TrendingUp size={20} className="text-blue-600" />, bg: 'bg-blue-50' },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${s.bg}`}>{s.icon}</div>
            <p className="mt-3 text-2xl font-black text-gray-900">{s.value}</p>
            <p className="text-sm text-gray-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* This week pot + recipient */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-gray-500">💰 This Week's Pot</p>
          <p className="mt-2 text-4xl font-black text-primary-600">RWF {totalCollected.toLocaleString()}</p>
          <p className="mt-1 text-sm text-gray-400">out of RWF {totalExpected.toLocaleString()} expected</p>
          <div className="mt-3 h-2 rounded-full bg-gray-100">
            <div className="h-full rounded-full bg-primary-500" style={{ width: `${collectionRate}%` }} />
          </div>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-gray-500">🎯 This Week's Recipient</p>
          <p className="mt-2 text-2xl font-black text-gray-900">Niyonsaba Jean</p>
          <p className="mt-1 text-sm text-gray-500 flex items-center gap-1"><Phone size={13} /> +250 722 345 678</p>
          <p className="mt-1 text-xs text-gray-400">Position 2 in rotation — Cycle 3, Week 8</p>
          <div className="mt-4">
            <button
              onClick={() => setShowRotationModal(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-primary-500 px-4 py-2 text-sm font-bold text-white hover:bg-primary-600"
            >
              <Star size={14} /> I Want to Go First in Rotation
            </button>
          </div>
        </div>
      </div>

      {/* Weekly collection chart */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <p className="font-bold text-gray-900">Weekly Collection — Last 6 Weeks</p>
        <p className="text-sm text-gray-500 mt-0.5">How much money was collected each week</p>
        <div className="mt-6 flex items-end gap-3 h-36">
          {weeklyData.map((d) => {
            const collectedH = Math.round((d.collected / maxBar) * 120);
            const expectedH = Math.round((d.expected / maxBar) * 120);
            return (
              <div key={d.week} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex items-end gap-0.5 justify-center" style={{ height: 120 }}>
                  <div
                    className="w-5 rounded-t-md bg-primary-500"
                    style={{ height: collectedH }}
                    title={`Collected: RWF ${d.collected.toLocaleString()}`}
                  />
                  <div
                    className="w-5 rounded-t-md bg-gray-200"
                    style={{ height: expectedH }}
                    title={`Expected: RWF ${d.expected.toLocaleString()}`}
                  />
                </div>
                <span className="text-xs text-gray-500">{d.week}</span>
              </div>
            );
          })}
        </div>
        <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-sm bg-primary-500 inline-block" /> Collected</span>
          <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-sm bg-gray-200 inline-block" /> Expected</span>
        </div>
      </div>

      {/* Members this week + Recent activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Members status */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <p className="font-bold text-gray-900">Members — This Week</p>
            <Link to="/treasurer/members" className="text-xs text-primary-600 font-semibold hover:underline flex items-center gap-1">
              See all <ArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-3">
            {members.map((m) => (
              <div key={m.id} className="flex items-center justify-between rounded-xl border border-gray-100 p-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700">
                    {m.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{m.name}</p>
                    <p className="text-xs text-gray-400">{m.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">RWF {m.amount.toLocaleString()}</span>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${statusColor(m.status)}`}>
                    {statusLabel(m.status)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="font-bold text-gray-900 mb-4">Recent Activity</p>
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

      {/* Announcement */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <Megaphone size={18} className="text-primary-600" />
          <p className="font-bold text-gray-900">Send a Message to All Members</p>
        </div>
        <p className="text-sm text-gray-500 mb-3">All members will receive this message on their phone via SMS</p>
        <div className="flex gap-2">
          <input
            className="flex-1 rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
            placeholder="Type your message here... e.g. Reminder: contributions due this Friday"
            value={announcement}
            onChange={(e) => setAnnouncement(e.target.value)}
          />
          <button
            onClick={() => { if (announcement.trim()) { alert('Message sent to all members!'); setAnnouncement(''); } }}
            className="rounded-xl bg-primary-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-primary-600"
          >
            Send
          </button>
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'Track Payments', to: '/treasurer/contributions', icon: <DollarSign size={18} /> },
          { label: 'Manage Members', to: '/treasurer/members', icon: <Users size={18} /> },
          { label: 'Rotation Order', to: '/treasurer/rotation', icon: <TrendingUp size={18} /> },
          { label: 'Disputes', to: '/treasurer/disputes', icon: <AlertTriangle size={18} /> },
        ].map((l) => (
          <Link
            key={l.label}
            to={l.to}
            className="flex flex-col items-center gap-2 rounded-2xl border border-gray-200 bg-white p-4 text-center shadow-sm hover:border-primary-300 hover:bg-primary-50 transition-all"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600">{l.icon}</div>
            <span className="text-xs font-semibold text-gray-700">{l.label}</span>
          </Link>
        ))}
      </div>

      {/* Rotation modal */}
      {showRotationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-7 shadow-2xl">
            {rotationConfirmed ? (
              <div className="text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 mx-auto">
                  <CheckCircle size={28} className="text-green-600" />
                </div>
                <h3 className="mt-4 text-xl font-black text-gray-900">Request Submitted!</h3>
                <p className="mt-2 text-gray-500 text-sm">Your request to be first in the rotation has been recorded. The group will vote on this.</p>
                <button onClick={() => { setShowRotationModal(false); setRotationConfirmed(false); }} className="mt-6 w-full rounded-xl bg-primary-500 py-3 font-bold text-white hover:bg-primary-600">
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-100 mx-auto">
                  <Star size={28} className="text-primary-600" />
                </div>
                <h3 className="mt-4 text-xl font-black text-gray-900 text-center">Go First in Rotation?</h3>
                <p className="mt-3 text-gray-600 text-sm text-center leading-relaxed">
                  You are asking to receive the group pot in the <strong>first week</strong> of the next cycle. This request will be shared with all members for approval.
                </p>
                <div className="mt-6 flex gap-3">
                  <button onClick={() => setShowRotationModal(false)} className="flex-1 rounded-xl border border-gray-200 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50">
                    Cancel
                  </button>
                  <button onClick={() => setRotationConfirmed(true)} className="flex-1 rounded-xl bg-primary-500 py-3 text-sm font-bold text-white hover:bg-primary-600">
                    Yes, Request It
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TreasurerDashboard;
