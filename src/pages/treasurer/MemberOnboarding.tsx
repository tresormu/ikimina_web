import React, { useState, useRef } from 'react';
import { Upload, UserPlus, Copy, Clock, CheckCircle, X, FileText, Users } from 'lucide-react';

interface PendingMember {
  id: string;
  name: string;
  phone: string;
  nationalId?: string;
  source: 'manual' | 'file';
  status: 'pending' | 'joined';
}

const INVITE_CODE = 'IKM-JOIN-7842';
const INVITE_EXPIRES = '24 hours';

const MemberOnboarding: React.FC = () => {
  const [tab, setTab] = useState<'manual' | 'file' | 'pending'>('manual');
  const [form, setForm] = useState({ name: '', phone: '', nationalId: '' });
  const [pendingMembers, setPendingMembers] = useState<PendingMember[]>([
    { id: '1', name: 'Uwimana Marie', phone: '+250 788 111 222', nationalId: '1199080012345', source: 'manual', status: 'pending' },
    { id: '2', name: 'Habimana Eric', phone: '+250 722 333 444', nationalId: '', source: 'file', status: 'joined' },
    { id: '3', name: 'Ingabire Grace', phone: '+250 733 555 666', nationalId: '1198070098765', source: 'file', status: 'pending' },
  ]);
  const [codeCopied, setCodeCopied] = useState(false);
  const [fileMembers, setFileMembers] = useState<{ name: string; phone: string }[]>([]);
  const [fileLoaded, setFileLoaded] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleAddManual = () => {
    if (!form.name.trim() || !form.phone.trim()) return;
    const newMember: PendingMember = {
      id: Date.now().toString(),
      name: form.name,
      phone: form.phone,
      nationalId: form.nationalId,
      source: 'manual',
      status: 'pending',
    };
    setPendingMembers(prev => [...prev, newMember]);
    setForm({ name: '', phone: '', nationalId: '' });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // Simulate parsing — in real app use xlsx/pdf parser
    const simulated = [
      { name: 'Niyonsaba Jean', phone: '+250 744 777 888' },
      { name: 'Mukamana Alice', phone: '+250 755 999 000' },
      { name: 'Bizimana David', phone: '+250 766 111 333' },
    ];
    setFileMembers(simulated);
    setFileLoaded(true);
  };

  const handleImportFileMembers = () => {
    const newMembers: PendingMember[] = fileMembers.map((m, i) => ({
      id: `file-${Date.now()}-${i}`,
      name: m.name,
      phone: m.phone,
      source: 'file',
      status: 'pending',
    }));
    setPendingMembers(prev => [...prev, ...newMembers]);
    setFileMembers([]);
    setFileLoaded(false);
    setTab('pending');
  };

  const handleRemove = (id: string) => {
    setPendingMembers(prev => prev.filter(m => m.id !== id));
  };

  const copyCode = () => {
    navigator.clipboard.writeText(INVITE_CODE);
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  };

  const pending = pendingMembers.filter(m => m.status === 'pending');
  const joined = pendingMembers.filter(m => m.status === 'joined');

  return (
    <div className="space-y-6 p-4 lg:p-6">
      <div>
        <h1 className="text-2xl font-black text-gray-900">Add Members to Your Group</h1>
        <p className="text-gray-500 mt-1">Add members manually, import from a file, then share the invite code</p>
      </div>

      {/* Invite code banner */}
      <div className="rounded-2xl bg-gray-900 p-6 text-white">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-primary-400">Group Invite Code</p>
            <p className="mt-2 text-4xl font-black tracking-widest text-primary-400">{INVITE_CODE}</p>
            <div className="mt-2 flex items-center gap-2 text-sm text-gray-400">
              <Clock size={14} />
              <span>This code expires in <strong className="text-yellow-400">{INVITE_EXPIRES}</strong> — generate a new one after it expires</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <button
              onClick={copyCode}
              className="inline-flex items-center gap-2 rounded-xl bg-primary-500 px-5 py-2.5 font-bold text-white hover:bg-primary-600"
            >
              <Copy size={15} /> {codeCopied ? 'Copied!' : 'Copy Code'}
            </button>
            <button className="inline-flex items-center gap-2 rounded-xl border border-gray-600 px-5 py-2.5 text-sm font-semibold text-gray-300 hover:bg-gray-800">
              🔄 Generate New Code
            </button>
          </div>
        </div>
        <div className="mt-4 rounded-xl bg-white/5 p-4 text-sm text-gray-300">
          <p className="font-semibold text-white mb-1">How members join:</p>
          <ol className="space-y-1 list-decimal list-inside text-gray-400">
            <li>Member dials <strong className="text-primary-400">*777*2847#</strong> on their phone</li>
            <li>They select "Join a Group" and enter this invite code</li>
            <li>They enter their full name and phone number</li>
            <li>They choose whether to set a password or not</li>
            <li>They become an active member of your group</li>
          </ol>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-xl border border-gray-200 bg-gray-50 p-1 w-fit">
        {([
          { key: 'manual', label: 'Add Manually', icon: <UserPlus size={14} /> },
          { key: 'file', label: 'Import from File', icon: <Upload size={14} /> },
          { key: 'pending', label: `Pending (${pending.length})`, icon: <Users size={14} /> },
        ] as const).map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${tab === t.key ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* Manual tab */}
      {tab === 'manual' && (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="font-bold text-gray-900 mb-4">Enter member details manually</p>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name <span className="text-red-500">*</span></label>
              <input
                value={form.name}
                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                placeholder="e.g. Uwimana Marie"
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number <span className="text-red-500">*</span></label>
              <input
                value={form.phone}
                onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                placeholder="+250 7XX XXX XXX"
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">National ID <span className="text-gray-400 font-normal">(optional)</span></label>
              <input
                value={form.nationalId}
                onChange={e => setForm(p => ({ ...p, nationalId: e.target.value }))}
                placeholder="1 1990 8 0012345 6 78"
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
              />
            </div>
          </div>
          <button
            onClick={handleAddManual}
            disabled={!form.name.trim() || !form.phone.trim()}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <UserPlus size={15} /> Add Member
          </button>
          <p className="mt-3 text-xs text-gray-400">
            This member will be added as <strong>inactive</strong> until they join using the invite code above.
          </p>
        </div>
      )}

      {/* File tab */}
      {tab === 'file' && (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="font-bold text-gray-900 mb-1">Import members from Excel or PDF</p>
          <p className="text-sm text-gray-500 mb-5">
            Your file should have columns: <strong>Name</strong>, <strong>Phone</strong>, and optionally <strong>National ID</strong>
          </p>

          {!fileLoaded ? (
            <div
              onClick={() => fileRef.current?.click()}
              className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 p-10 cursor-pointer hover:border-primary-400 hover:bg-primary-50 transition-colors"
            >
              <Upload size={32} className="text-gray-400 mb-3" />
              <p className="font-semibold text-gray-700">Click to upload your file</p>
              <p className="text-sm text-gray-400 mt-1">Supports .xlsx, .xls, .csv, .pdf</p>
              <input ref={fileRef} type="file" accept=".xlsx,.xls,.csv,.pdf" className="hidden" onChange={handleFileUpload} />
            </div>
          ) : (
            <div>
              <div className="rounded-xl border border-green-200 bg-green-50 p-4 mb-4 flex items-center gap-3">
                <CheckCircle size={18} className="text-green-600" />
                <div>
                  <p className="font-semibold text-green-800">File loaded successfully</p>
                  <p className="text-sm text-green-700">{fileMembers.length} members found in the file</p>
                </div>
              </div>
              <div className="space-y-2 mb-4">
                {fileMembers.map((m, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-xl border border-gray-100 p-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700">{m.name.charAt(0)}</div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{m.name}</p>
                      <p className="text-xs text-gray-400">{m.phone}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={handleImportFileMembers} className="inline-flex items-center gap-2 rounded-xl bg-primary-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-primary-600">
                  <CheckCircle size={15} /> Import {fileMembers.length} Members
                </button>
                <button onClick={() => { setFileLoaded(false); setFileMembers([]); }} className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50">
                  <X size={15} /> Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Pending tab */}
      {tab === 'pending' && (
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <div>
              <p className="font-bold text-gray-900">Members Waiting to Join</p>
              <p className="text-sm text-gray-500 mt-0.5">{pending.length} pending · {joined.length} already joined</p>
            </div>
          </div>
          <div className="divide-y divide-gray-50">
            {pendingMembers.map((m) => (
              <div key={m.id} className="flex items-center justify-between p-4 hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700">{m.name.charAt(0)}</div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{m.name}</p>
                    <p className="text-xs text-gray-400">{m.phone} · Added via {m.source}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${m.status === 'joined' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {m.status === 'joined' ? '✓ Joined' : '⏳ Waiting'}
                  </span>
                  {m.status === 'pending' && (
                    <button onClick={() => handleRemove(m.id)} className="rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-500">
                      <X size={14} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberOnboarding;
