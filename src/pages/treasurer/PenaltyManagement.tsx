import React, { useState } from 'react';
import { AlertTriangle, Plus, X, CheckCircle, Clock, User } from 'lucide-react';

interface PenaltyRule {
  id: string;
  name: string;
  description: string;
  amount: number;
}

interface AssignedPenalty {
  id: string;
  memberId: string;
  memberName: string;
  memberPhone: string;
  ruleId: string;
  ruleName: string;
  amount: number;
  reason: string;
  assignedDate: string;
  status: 'pending' | 'paid';
  paidDate?: string;
}

const defaultRules: PenaltyRule[] = [
  { id: '1', name: 'Late Payment', description: 'Payment made after the deadline', amount: 2500 },
  { id: '2', name: 'Missed Payment', description: 'No payment made for the week', amount: 5000 },
  { id: '3', name: 'Disrespect in Meeting', description: 'Disruptive behavior during group meeting', amount: 1000 },
  { id: '4', name: 'Absent from Meeting', description: 'Did not attend scheduled group meeting', amount: 500 },
];

const members = [
  { id: '1', name: 'Uwimana Marie', phone: '+250 788 123 456' },
  { id: '2', name: 'Niyonsaba Jean', phone: '+250 722 345 678' },
  { id: '3', name: 'Mukamana Alice', phone: '+250 733 456 789' },
  { id: '4', name: 'Habimana David', phone: '+250 744 567 890' },
  { id: '5', name: 'Ingabire Grace', phone: '+250 755 678 901' },
];

const PenaltyManagement: React.FC = () => {
  const [tab, setTab] = useState<'rules' | 'assign' | 'assigned'>('assigned');
  const [rules, setRules] = useState<PenaltyRule[]>(defaultRules);
  const [assigned, setAssigned] = useState<AssignedPenalty[]>([
    { id: '1', memberId: '4', memberName: 'Habimana David', memberPhone: '+250 744 567 890', ruleId: '2', ruleName: 'Missed Payment', amount: 5000, reason: 'Missed Week 8 payment', assignedDate: '20 Jan 2024', status: 'pending' },
    { id: '2', memberId: '3', memberName: 'Mukamana Alice', memberPhone: '+250 733 456 789', ruleId: '1', ruleName: 'Late Payment', amount: 2500, reason: 'Paid 3 days late — Week 7', assignedDate: '15 Jan 2024', status: 'paid', paidDate: '17 Jan 2024' },
    { id: '3', memberId: '2', memberName: 'Niyonsaba Jean', memberPhone: '+250 722 345 678', ruleId: '4', ruleName: 'Absent from Meeting', amount: 500, reason: 'Did not attend January meeting', assignedDate: '10 Jan 2024', status: 'pending' },
  ]);

  // New rule form
  const [newRule, setNewRule] = useState({ name: '', description: '', amount: '' });
  const [showNewRule, setShowNewRule] = useState(false);

  // Assign form
  const [assignForm, setAssignForm] = useState({ memberId: '', ruleId: '', reason: '' });
  const [assignSuccess, setAssignSuccess] = useState(false);

  const handleAddRule = () => {
    if (!newRule.name.trim() || !newRule.amount) return;
    const rule: PenaltyRule = {
      id: Date.now().toString(),
      name: newRule.name,
      description: newRule.description,
      amount: Number(newRule.amount),
    };
    setRules(prev => [...prev, rule]);
    setNewRule({ name: '', description: '', amount: '' });
    setShowNewRule(false);
  };

  const handleDeleteRule = (id: string) => {
    setRules(prev => prev.filter(r => r.id !== id));
  };

  const handleAssign = () => {
    if (!assignForm.memberId || !assignForm.ruleId || !assignForm.reason.trim()) return;
    const member = members.find(m => m.id === assignForm.memberId)!;
    const rule = rules.find(r => r.id === assignForm.ruleId)!;
    const newAssigned: AssignedPenalty = {
      id: Date.now().toString(),
      memberId: member.id,
      memberName: member.name,
      memberPhone: member.phone,
      ruleId: rule.id,
      ruleName: rule.name,
      amount: rule.amount,
      reason: assignForm.reason,
      assignedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'pending',
    };
    setAssigned(prev => [newAssigned, ...prev]);
    setAssignForm({ memberId: '', ruleId: '', reason: '' });
    setAssignSuccess(true);
    setTimeout(() => setAssignSuccess(false), 3000);
    setTab('assigned');
  };

  const pending = assigned.filter(a => a.status === 'pending');
  const paid = assigned.filter(a => a.status === 'paid');
  const totalPending = pending.reduce((s, a) => s + a.amount, 0);
  const totalCollected = paid.reduce((s, a) => s + a.amount, 0);

  return (
    <div className="space-y-6 p-4 lg:p-6">
      <div>
        <h1 className="text-2xl font-black text-gray-900">Penalty Management</h1>
        <p className="text-gray-500 mt-1">Create penalty rules, assign them to members, and track payments</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: 'Penalty Rules', value: rules.length, color: 'text-primary-600', bg: 'bg-primary-50' },
          { label: 'Pending Penalties', value: pending.length, color: 'text-yellow-600', bg: 'bg-yellow-50' },
          { label: 'Amount Pending', value: `RWF ${totalPending.toLocaleString()}`, color: 'text-red-600', bg: 'bg-red-50' },
          { label: 'Total Collected', value: `RWF ${totalCollected.toLocaleString()}`, color: 'text-green-600', bg: 'bg-green-50' },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
            <p className="text-sm text-gray-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* How it works for members */}
      <div className="rounded-2xl bg-gray-900 p-5 text-white">
        <p className="text-xs font-bold uppercase tracking-widest text-primary-400 mb-2">How Members Pay Penalties via USSD</p>
        <div className="grid gap-3 sm:grid-cols-3 text-sm text-gray-300">
          <div className="rounded-xl bg-white/5 p-3">
            <p className="font-bold text-white mb-1">Step 1</p>
            <p>Member dials <strong className="text-primary-400">*777*2847#</strong> and selects "My Penalties"</p>
          </div>
          <div className="rounded-xl bg-white/5 p-3">
            <p className="font-bold text-white mb-1">Step 2</p>
            <p>System verifies they are a member of this group, then shows their pending penalties</p>
          </div>
          <div className="rounded-xl bg-white/5 p-3">
            <p className="font-bold text-white mb-1">Step 3</p>
            <p>Member selects the penalty and pays from their bank account — penalty marked as paid automatically</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-xl border border-gray-200 bg-gray-50 p-1 w-fit">
        {([
          { key: 'assigned', label: `Assigned Penalties (${assigned.length})` },
          { key: 'assign', label: 'Assign Penalty' },
          { key: 'rules', label: `Penalty Rules (${rules.length})` },
        ] as const).map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${tab === t.key ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Assigned penalties */}
      {tab === 'assigned' && (
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <div className="divide-y divide-gray-50">
            {assigned.length === 0 && (
              <div className="p-10 text-center text-gray-400">
                <AlertTriangle size={32} className="mx-auto mb-3 opacity-40" />
                <p>No penalties assigned yet</p>
              </div>
            )}
            {assigned.map((a) => (
              <div key={a.id} className="flex items-start justify-between gap-4 p-5 hover:bg-gray-50 flex-wrap">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700 flex-shrink-0">
                    {a.memberName.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-bold text-gray-900">{a.memberName}</p>
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${a.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {a.status === 'paid' ? '✓ Paid' : '⏳ Pending'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-0.5">
                      <strong>{a.ruleName}</strong> — {a.reason}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Assigned {a.assignedDate}
                      {a.paidDate && ` · Paid ${a.paidDate}`}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-black ${a.status === 'paid' ? 'text-green-600' : 'text-red-600'}`}>
                    RWF {a.amount.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-400">{a.memberPhone}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Assign penalty */}
      {tab === 'assign' && (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="font-bold text-gray-900 mb-4">Assign a Penalty to a Member</p>
          {assignSuccess && (
            <div className="mb-4 flex items-center gap-2 rounded-xl bg-green-50 border border-green-200 p-3 text-sm text-green-700">
              <CheckCircle size={16} /> Penalty assigned successfully. The member will see it when they dial the USSD code.
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Select Member <span className="text-red-500">*</span></label>
              <select
                value={assignForm.memberId}
                onChange={e => setAssignForm(p => ({ ...p, memberId: e.target.value }))}
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
              >
                <option value="">Choose a member...</option>
                {members.map(m => (
                  <option key={m.id} value={m.id}>{m.name} — {m.phone}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Penalty Type <span className="text-red-500">*</span></label>
              <select
                value={assignForm.ruleId}
                onChange={e => setAssignForm(p => ({ ...p, ruleId: e.target.value }))}
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
              >
                <option value="">Choose a penalty type...</option>
                {rules.map(r => (
                  <option key={r.id} value={r.id}>{r.name} — RWF {r.amount.toLocaleString()}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Reason <span className="text-red-500">*</span></label>
              <textarea
                value={assignForm.reason}
                onChange={e => setAssignForm(p => ({ ...p, reason: e.target.value }))}
                placeholder="Explain why this penalty is being assigned..."
                rows={3}
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100 resize-none"
              />
            </div>
            <button
              onClick={handleAssign}
              disabled={!assignForm.memberId || !assignForm.ruleId || !assignForm.reason.trim()}
              className="inline-flex items-center gap-2 rounded-xl bg-primary-500 px-6 py-2.5 font-bold text-white hover:bg-primary-600 disabled:opacity-50"
            >
              <AlertTriangle size={15} /> Assign Penalty
            </button>
          </div>
        </div>
      )}

      {/* Rules */}
      {tab === 'rules' && (
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            {rules.map((r) => (
              <div key={r.id} className="flex items-start justify-between rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <div>
                  <p className="font-bold text-gray-900">{r.name}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{r.description}</p>
                  <p className="mt-2 text-lg font-black text-primary-600">RWF {r.amount.toLocaleString()}</p>
                </div>
                <button onClick={() => handleDeleteRule(r.id)} className="rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-500">
                  <X size={15} />
                </button>
              </div>
            ))}
          </div>

          {!showNewRule ? (
            <button
              onClick={() => setShowNewRule(true)}
              className="inline-flex items-center gap-2 rounded-xl border border-dashed border-gray-300 px-5 py-3 text-sm font-semibold text-gray-600 hover:border-primary-400 hover:text-primary-600 hover:bg-primary-50 transition-all"
            >
              <Plus size={15} /> Add New Penalty Rule
            </button>
          ) : (
            <div className="rounded-2xl border border-primary-200 bg-primary-50 p-5">
              <p className="font-bold text-gray-900 mb-4">New Penalty Rule</p>
              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Rule Name</label>
                  <input
                    value={newRule.name}
                    onChange={e => setNewRule(p => ({ ...p, name: e.target.value }))}
                    placeholder="e.g. Late Payment"
                    className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm focus:border-primary-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Description</label>
                  <input
                    value={newRule.description}
                    onChange={e => setNewRule(p => ({ ...p, description: e.target.value }))}
                    placeholder="Short description"
                    className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm focus:border-primary-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Amount (RWF)</label>
                  <input
                    type="number"
                    value={newRule.amount}
                    onChange={e => setNewRule(p => ({ ...p, amount: e.target.value }))}
                    placeholder="e.g. 2500"
                    className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm focus:border-primary-500 focus:outline-none"
                  />
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <button onClick={handleAddRule} className="rounded-xl bg-primary-500 px-4 py-2 text-sm font-bold text-white hover:bg-primary-600">Save Rule</button>
                <button onClick={() => setShowNewRule(false)} className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50">Cancel</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PenaltyManagement;
