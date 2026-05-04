import React, { useState } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { User, Phone, Calendar, TrendingUp, DollarSign, Users, Edit2, Save, X } from 'lucide-react';

const TreasurerProfile: React.FC = () => {
  const { user } = useAuthStore();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    fullName: user?.fullName || 'Jean Niyonsaba',
    phone: user?.phone || '+250 788 123 456',
    nationalId: user?.nationalId || '1 1990 8 0012345 6 78',
    email: 'jean.niyonsaba@email.com',
  });

  const stats = [
    { label: 'Group Members', value: '24', icon: <Users size={20} className="text-primary-600" />, bg: 'bg-primary-50' },
    { label: 'Cycles Completed', value: '3', icon: <TrendingUp size={20} className="text-green-600" />, bg: 'bg-green-50' },
    { label: 'Total Collected', value: 'RWF 4.2M', icon: <DollarSign size={20} className="text-blue-600" />, bg: 'bg-blue-50' },
    { label: 'My Earnings (35%)', value: 'RWF 84,000', icon: <DollarSign size={20} className="text-yellow-600" />, bg: 'bg-yellow-50' },
  ];

  const activityLog = [
    { date: '20 Jan 2024', action: 'Confirmed 6 payments for Week 8' },
    { date: '18 Jan 2024', action: 'Sent rotation payout to Niyonsaba Jean' },
    { date: '15 Jan 2024', action: 'Resolved dispute for Habimana David' },
    { date: '13 Jan 2024', action: 'Confirmed 8 payments for Week 7' },
    { date: '10 Jan 2024', action: 'Added new member: Ingabire Grace' },
    { date: '06 Jan 2024', action: 'Confirmed 7 payments for Week 6' },
  ];

  return (
    <div className="space-y-6 p-4 lg:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900">My Profile</h1>
          <p className="text-gray-500 mt-1">Your personal information and group performance</p>
        </div>
        {!editing ? (
          <button
            onClick={() => setEditing(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            <Edit2 size={15} /> Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => setEditing(false)}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              <X size={15} /> Cancel
            </button>
            <button
              onClick={() => { setEditing(false); alert('Profile saved!'); }}
              className="inline-flex items-center gap-2 rounded-xl bg-primary-500 px-4 py-2.5 text-sm font-bold text-white hover:bg-primary-600"
            >
              <Save size={15} /> Save Changes
            </button>
          </div>
        )}
      </div>

      {/* Profile card */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-start gap-5">
          <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-2xl bg-primary-500 text-3xl font-black text-white">
            {form.fullName.charAt(0)}
          </div>
          <div className="flex-1">
            {editing ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { label: 'Full Name', key: 'fullName', icon: <User size={14} /> },
                  { label: 'Phone Number', key: 'phone', icon: <Phone size={14} /> },
                  { label: 'National ID', key: 'nationalId', icon: <User size={14} /> },
                  { label: 'Email Address', key: 'email', icon: <User size={14} /> },
                ].map((f) => (
                  <div key={f.key}>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">{f.label}</label>
                    <input
                      value={form[f.key as keyof typeof form]}
                      onChange={(e) => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                      className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Full Name</p>
                  <p className="text-base font-bold text-gray-900 mt-0.5">{form.fullName}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Phone Number</p>
                  <p className="text-base font-bold text-gray-900 mt-0.5">{form.phone}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">National ID</p>
                  <p className="text-base font-bold text-gray-900 mt-0.5">{form.nationalId}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Email</p>
                  <p className="text-base font-bold text-gray-900 mt-0.5">{form.email}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Role</p>
                  <span className="mt-0.5 inline-block rounded-full bg-primary-100 px-3 py-0.5 text-sm font-bold text-primary-700">Treasurer</span>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Member Since</p>
                  <p className="text-base font-bold text-gray-900 mt-0.5 flex items-center gap-1"><Calendar size={13} /> January 2022</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${s.bg}`}>{s.icon}</div>
            <p className="mt-3 text-xl font-black text-gray-900">{s.value}</p>
            <p className="text-sm text-gray-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Activity log */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <p className="font-bold text-gray-900 mb-4">My Recent Actions</p>
        <div className="space-y-3">
          {activityLog.map((a, i) => (
            <div key={i} className="flex items-start gap-4 rounded-xl border border-gray-100 p-3">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary-50 text-xs font-bold text-primary-600">
                {i + 1}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">{a.action}</p>
                <p className="text-xs text-gray-400 mt-0.5">{a.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TreasurerProfile;
