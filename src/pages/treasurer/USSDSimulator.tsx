import React, { useState } from 'react';
import { Phone, ArrowLeft, CheckCircle, AlertTriangle, X } from 'lucide-react';

type Screen =
  | 'welcome'
  | 'verify_member'
  | 'verify_fail'
  | 'main_menu'
  | 'pay_contribution'
  | 'pay_contribution_confirm'
  | 'pay_contribution_done'
  | 'my_penalties'
  | 'penalty_detail'
  | 'pay_penalty_confirm'
  | 'pay_penalty_done'
  | 'check_balance'
  | 'loan_request'
  | 'loan_sent';

const GROUP_CODE = 'IKM-2847';
const USSD_CODE = '*777*2847#';

const penalties = [
  { id: '1', name: 'Missed Payment — Week 8', amount: 5000 },
  { id: '2', name: 'Absent from Meeting — Jan', amount: 500 },
];

const USSDSimulator: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('welcome');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [selectedPenalty, setSelectedPenalty] = useState<typeof penalties[0] | null>(null);
  const [bankAccount, setBankAccount] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [loanReason, setLoanReason] = useState('');
  const [input, setInput] = useState('');

  // Simulate member verification — valid if phone starts with +250
  const verifyMember = () => {
    if (!phone.trim()) { setPhoneError('Please enter your phone number'); return; }
    if (!phone.replace(/\s/g, '').match(/^\+?250[0-9]{9}$/)) {
      setPhoneError('This phone number is not registered in any ikimina group on our system');
      setScreen('verify_fail');
      return;
    }
    setPhoneError('');
    setScreen('main_menu');
  };

  const reset = () => {
    setScreen('welcome');
    setPhone('');
    setPhoneError('');
    setSelectedPenalty(null);
    setBankAccount('');
    setLoanAmount('');
    setLoanReason('');
    setInput('');
  };

  return (
    <div className="space-y-6 p-4 lg:p-6">
      <div>
        <h1 className="text-2xl font-black text-gray-900">USSD Service Simulator</h1>
        <p className="text-gray-500 mt-1">This is how members interact with IkiminaPass on any phone — no internet needed</p>
      </div>

      {/* Info banner */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-3 text-sm">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-primary-500 mb-1">USSD Code</p>
            <p className="text-2xl font-black text-gray-900">{USSD_CODE}</p>
            <p className="text-gray-500 mt-0.5">Members dial this on any phone</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-primary-500 mb-1">Payment Method</p>
            <p className="font-bold text-gray-900">Bank Account Transfer</p>
            <p className="text-gray-500 mt-0.5">Funds go directly to the group bank account</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-primary-500 mb-1">Member Verification</p>
            <p className="font-bold text-gray-900">Phone number checked first</p>
            <p className="text-gray-500 mt-0.5">Must be a registered member to proceed</p>
          </div>
        </div>
      </div>

      {/* Phone simulator */}
      <div className="flex justify-center">
        <div className="w-72 rounded-[2.5rem] border-4 border-gray-800 bg-gray-900 shadow-2xl overflow-hidden">
          {/* Phone top bar */}
          <div className="bg-gray-800 px-6 py-3 flex items-center justify-between">
            <span className="text-xs text-gray-400">9:41</span>
            <div className="flex h-4 w-20 items-center justify-center rounded-full bg-gray-900" />
            <span className="text-xs text-gray-400">📶</span>
          </div>

          {/* USSD screen */}
          <div className="bg-gray-950 min-h-[420px] p-4 flex flex-col">
            {/* Header */}
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-800">
              <Phone size={14} className="text-primary-400" />
              <span className="text-xs font-bold text-primary-400">{USSD_CODE} — IkiminaPass</span>
            </div>

            {/* Screen content */}
            <div className="flex-1 text-sm text-gray-200 space-y-3">

              {screen === 'welcome' && (
                <>
                  <p className="font-bold text-white text-base">Welcome to IkiminaPass</p>
                  <p className="text-gray-400 text-xs">Group: {GROUP_CODE}</p>
                  <p className="text-gray-300 mt-3">To continue, please enter your phone number so we can verify you are a member of this group.</p>
                  <div className="mt-4">
                    <input
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="+250 7XX XXX XXX"
                      className="w-full rounded-lg bg-gray-800 border border-gray-700 px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none"
                    />
                    {phoneError && <p className="mt-1 text-xs text-red-400">{phoneError}</p>}
                  </div>
                  <button onClick={verifyMember} className="mt-3 w-full rounded-lg bg-primary-500 py-2 text-sm font-bold text-white hover:bg-primary-600">
                    Verify & Continue
                  </button>
                </>
              )}

              {screen === 'verify_fail' && (
                <>
                  <div className="flex items-center gap-2 text-red-400">
                    <X size={16} />
                    <p className="font-bold">Not a Member</p>
                  </div>
                  <p className="text-gray-300 text-xs mt-2">
                    The phone number <strong className="text-white">{phone}</strong> is not registered as a member of any ikimina group on IkiminaPass.
                  </p>
                  <p className="text-gray-400 text-xs mt-2">If you believe this is an error, contact your treasurer.</p>
                  <button onClick={reset} className="mt-4 w-full rounded-lg border border-gray-700 py-2 text-sm font-semibold text-gray-300 hover:bg-gray-800">
                    Try Again
                  </button>
                </>
              )}

              {screen === 'main_menu' && (
                <>
                  <div className="flex items-center gap-2 text-green-400 mb-2">
                    <CheckCircle size={14} />
                    <p className="text-xs">Verified: {phone}</p>
                  </div>
                  <p className="font-bold text-white">Main Menu</p>
                  <p className="text-gray-400 text-xs">Group: {GROUP_CODE} · Cycle 3, Week 8</p>
                  <div className="mt-3 space-y-2">
                    {[
                      { num: '1', label: 'Pay Weekly Contribution', screen: 'pay_contribution' as Screen },
                      { num: '2', label: 'My Penalties', screen: 'my_penalties' as Screen },
                      { num: '3', label: 'Check My Balance', screen: 'check_balance' as Screen },
                      { num: '4', label: 'Request a Loan', screen: 'loan_request' as Screen },
                    ].map((item) => (
                      <button
                        key={item.num}
                        onClick={() => setScreen(item.screen)}
                        className="w-full flex items-center gap-3 rounded-lg bg-gray-800 px-3 py-2.5 text-left hover:bg-gray-700 transition-colors"
                      >
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-500 text-xs font-bold text-white flex-shrink-0">{item.num}</span>
                        <span className="text-sm text-gray-200">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}

              {screen === 'pay_contribution' && (
                <>
                  <button onClick={() => setScreen('main_menu')} className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-200 mb-3">
                    <ArrowLeft size={12} /> Back
                  </button>
                  <p className="font-bold text-white">Pay Weekly Contribution</p>
                  <div className="mt-3 rounded-lg bg-gray-800 p-3 space-y-1 text-xs">
                    <div className="flex justify-between"><span className="text-gray-400">Week</span><span className="text-white font-bold">Week 8, Cycle 3</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">Amount Due</span><span className="text-primary-400 font-bold">RWF 25,000</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">Deadline</span><span className="text-white">Sunday 21 Jan 2024</span></div>
                  </div>
                  <div className="mt-3">
                    <p className="text-xs text-gray-400 mb-1">Your bank account number</p>
                    <input
                      value={bankAccount}
                      onChange={e => setBankAccount(e.target.value)}
                      placeholder="e.g. 000 1234 5678 90"
                      className="w-full rounded-lg bg-gray-800 border border-gray-700 px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none"
                    />
                  </div>
                  <button
                    onClick={() => setScreen('pay_contribution_confirm')}
                    disabled={!bankAccount.trim()}
                    className="mt-3 w-full rounded-lg bg-primary-500 py-2 text-sm font-bold text-white hover:bg-primary-600 disabled:opacity-50"
                  >
                    Continue
                  </button>
                </>
              )}

              {screen === 'pay_contribution_confirm' && (
                <>
                  <p className="font-bold text-white">Confirm Payment</p>
                  <div className="mt-3 rounded-lg bg-gray-800 p-3 space-y-1.5 text-xs">
                    <div className="flex justify-between"><span className="text-gray-400">From Account</span><span className="text-white font-mono">{bankAccount}</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">To</span><span className="text-white">IkiminaPass Group Account</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">Amount</span><span className="text-primary-400 font-bold">RWF 25,000</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">Purpose</span><span className="text-white">Week 8 Contribution</span></div>
                  </div>
                  <p className="text-xs text-yellow-400 mt-2">⚠️ Please confirm this payment is correct before proceeding</p>
                  <div className="mt-3 flex gap-2">
                    <button onClick={() => setScreen('pay_contribution_done')} className="flex-1 rounded-lg bg-green-600 py-2 text-sm font-bold text-white hover:bg-green-700">Confirm</button>
                    <button onClick={() => setScreen('pay_contribution')} className="flex-1 rounded-lg bg-gray-700 py-2 text-sm font-semibold text-gray-300 hover:bg-gray-600">Cancel</button>
                  </div>
                </>
              )}

              {screen === 'pay_contribution_done' && (
                <>
                  <div className="flex items-center gap-2 text-green-400">
                    <CheckCircle size={16} />
                    <p className="font-bold">Payment Successful!</p>
                  </div>
                  <div className="mt-3 rounded-lg bg-gray-800 p-3 text-xs space-y-1">
                    <div className="flex justify-between"><span className="text-gray-400">Amount Paid</span><span className="text-green-400 font-bold">RWF 25,000</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">Reference</span><span className="text-white font-mono">TXN{Date.now().toString().slice(-6)}</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">Status</span><span className="text-green-400">Confirmed ✓</span></div>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">Your treasurer has been notified. You will receive an SMS confirmation shortly.</p>
                  <button onClick={() => setScreen('main_menu')} className="mt-3 w-full rounded-lg border border-gray-700 py-2 text-sm font-semibold text-gray-300 hover:bg-gray-800">
                    Back to Menu
                  </button>
                </>
              )}

              {screen === 'my_penalties' && (
                <>
                  <button onClick={() => setScreen('main_menu')} className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-200 mb-3">
                    <ArrowLeft size={12} /> Back
                  </button>
                  <p className="font-bold text-white">My Pending Penalties</p>
                  {penalties.length === 0 ? (
                    <p className="text-gray-400 text-xs mt-3">You have no pending penalties. 🎉</p>
                  ) : (
                    <div className="mt-3 space-y-2">
                      {penalties.map((p, i) => (
                        <button
                          key={p.id}
                          onClick={() => { setSelectedPenalty(p); setScreen('penalty_detail'); }}
                          className="w-full flex items-center gap-3 rounded-lg bg-gray-800 px-3 py-2.5 text-left hover:bg-gray-700"
                        >
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500/20 text-xs font-bold text-red-400 flex-shrink-0">{i + 1}</span>
                          <div className="flex-1">
                            <p className="text-xs text-gray-200">{p.name}</p>
                            <p className="text-xs text-red-400 font-bold">RWF {p.amount.toLocaleString()}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}

              {screen === 'penalty_detail' && selectedPenalty && (
                <>
                  <button onClick={() => setScreen('my_penalties')} className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-200 mb-3">
                    <ArrowLeft size={12} /> Back
                  </button>
                  <p className="font-bold text-white">Pay Penalty</p>
                  <div className="mt-3 rounded-lg bg-gray-800 p-3 space-y-1.5 text-xs">
                    <div className="flex justify-between"><span className="text-gray-400">Penalty</span><span className="text-white">{selectedPenalty.name}</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">Amount</span><span className="text-red-400 font-bold">RWF {selectedPenalty.amount.toLocaleString()}</span></div>
                  </div>
                  <div className="mt-3">
                    <p className="text-xs text-gray-400 mb-1">Your bank account number</p>
                    <input
                      value={bankAccount}
                      onChange={e => setBankAccount(e.target.value)}
                      placeholder="e.g. 000 1234 5678 90"
                      className="w-full rounded-lg bg-gray-800 border border-gray-700 px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none"
                    />
                  </div>
                  <button
                    onClick={() => setScreen('pay_penalty_confirm')}
                    disabled={!bankAccount.trim()}
                    className="mt-3 w-full rounded-lg bg-red-600 py-2 text-sm font-bold text-white hover:bg-red-700 disabled:opacity-50"
                  >
                    Pay Penalty
                  </button>
                </>
              )}

              {screen === 'pay_penalty_confirm' && selectedPenalty && (
                <>
                  <p className="font-bold text-white">Confirm Penalty Payment</p>
                  <div className="mt-3 rounded-lg bg-gray-800 p-3 space-y-1.5 text-xs">
                    <div className="flex justify-between"><span className="text-gray-400">Penalty</span><span className="text-white">{selectedPenalty.name}</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">From Account</span><span className="text-white font-mono">{bankAccount}</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">Amount</span><span className="text-red-400 font-bold">RWF {selectedPenalty.amount.toLocaleString()}</span></div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button onClick={() => setScreen('pay_penalty_done')} className="flex-1 rounded-lg bg-green-600 py-2 text-sm font-bold text-white hover:bg-green-700">Confirm</button>
                    <button onClick={() => setScreen('penalty_detail')} className="flex-1 rounded-lg bg-gray-700 py-2 text-sm font-semibold text-gray-300 hover:bg-gray-600">Cancel</button>
                  </div>
                </>
              )}

              {screen === 'pay_penalty_done' && selectedPenalty && (
                <>
                  <div className="flex items-center gap-2 text-green-400">
                    <CheckCircle size={16} />
                    <p className="font-bold">Penalty Paid!</p>
                  </div>
                  <p className="text-xs text-gray-300 mt-2">
                    RWF {selectedPenalty.amount.toLocaleString()} paid for: <strong className="text-white">{selectedPenalty.name}</strong>
                  </p>
                  <p className="text-xs text-gray-400 mt-1">Your treasurer has been notified and the penalty is now cleared.</p>
                  <button onClick={() => setScreen('main_menu')} className="mt-3 w-full rounded-lg border border-gray-700 py-2 text-sm font-semibold text-gray-300 hover:bg-gray-800">
                    Back to Menu
                  </button>
                </>
              )}

              {screen === 'check_balance' && (
                <>
                  <button onClick={() => setScreen('main_menu')} className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-200 mb-3">
                    <ArrowLeft size={12} /> Back
                  </button>
                  <p className="font-bold text-white">My Balance & Status</p>
                  <div className="mt-3 rounded-lg bg-gray-800 p-3 space-y-2 text-xs">
                    <div className="flex justify-between"><span className="text-gray-400">Group</span><span className="text-white">{GROUP_CODE}</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">Current Cycle</span><span className="text-white">Cycle 3, Week 8</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">This Week Status</span><span className="text-yellow-400 font-bold">⏳ Pending</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">Amount Due</span><span className="text-primary-400 font-bold">RWF 25,000</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">Total Paid (All Time)</span><span className="text-green-400 font-bold">RWF 550,000</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">Pending Penalties</span><span className="text-red-400 font-bold">2 (RWF 5,500)</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">Credit Score</span><span className="text-primary-400 font-bold">742 / 850</span></div>
                  </div>
                  <button onClick={() => setScreen('main_menu')} className="mt-3 w-full rounded-lg border border-gray-700 py-2 text-sm font-semibold text-gray-300 hover:bg-gray-800">
                    Back to Menu
                  </button>
                </>
              )}

              {screen === 'loan_request' && (
                <>
                  <button onClick={() => setScreen('main_menu')} className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-200 mb-3">
                    <ArrowLeft size={12} /> Back
                  </button>
                  <p className="font-bold text-white">Request a Loan</p>
                  <p className="text-xs text-gray-400 mt-1">Your request will be reviewed by your group treasurer</p>
                  <div className="mt-3 space-y-2">
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Amount (RWF)</p>
                      <input
                        value={loanAmount}
                        onChange={e => setLoanAmount(e.target.value)}
                        placeholder="e.g. 50000"
                        type="number"
                        className="w-full rounded-lg bg-gray-800 border border-gray-700 px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Reason</p>
                      <input
                        value={loanReason}
                        onChange={e => setLoanReason(e.target.value)}
                        placeholder="Why do you need this loan?"
                        className="w-full rounded-lg bg-gray-800 border border-gray-700 px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => setScreen('loan_sent')}
                    disabled={!loanAmount || !loanReason.trim()}
                    className="mt-3 w-full rounded-lg bg-primary-500 py-2 text-sm font-bold text-white hover:bg-primary-600 disabled:opacity-50"
                  >
                    Send Request
                  </button>
                </>
              )}

              {screen === 'loan_sent' && (
                <>
                  <div className="flex items-center gap-2 text-green-400">
                    <CheckCircle size={16} />
                    <p className="font-bold">Request Sent!</p>
                  </div>
                  <p className="text-xs text-gray-300 mt-2">
                    Your loan request of <strong className="text-primary-400">RWF {Number(loanAmount).toLocaleString()}</strong> has been sent to your treasurer.
                  </p>
                  <p className="text-xs text-gray-400 mt-1">The treasurer will review and respond. You will receive an SMS with the decision.</p>
                  <button onClick={() => setScreen('main_menu')} className="mt-3 w-full rounded-lg border border-gray-700 py-2 text-sm font-semibold text-gray-300 hover:bg-gray-800">
                    Back to Menu
                  </button>
                </>
              )}

            </div>

            {/* Reset button */}
            <button onClick={reset} className="mt-4 text-xs text-gray-600 hover:text-gray-400 text-center w-full">
              ↩ End Session / Start Over
            </button>
          </div>

          {/* Phone bottom */}
          <div className="bg-gray-800 px-6 py-4 flex justify-center">
            <div className="h-1 w-24 rounded-full bg-gray-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default USSDSimulator;
