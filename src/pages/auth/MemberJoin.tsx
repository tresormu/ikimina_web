import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Eye, EyeOff, Shield, Smartphone } from 'lucide-react';

type Step = 'code' | 'details' | 'password_choice' | 'set_password' | 'done';

const MemberJoin: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('code');
  const [inviteCode, setInviteCode] = useState('');
  const [codeError, setCodeError] = useState('');
  const [form, setForm] = useState({ name: '', phone: '' });
  const [wantsPassword, setWantsPassword] = useState<boolean | null>(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCodeSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Simulate validation — valid codes start with IKM-
      if (inviteCode.trim().toUpperCase().startsWith('IKM-')) {
        setCodeError('');
        setStep('details');
      } else {
        setCodeError('This code is not valid or has expired. Ask your treasurer for a new code.');
      }
    }, 800);
  };

  const handleDetailsSubmit = () => {
    if (!form.name.trim() || !form.phone.trim()) return;
    setStep('password_choice');
  };

  const handlePasswordChoice = (wants: boolean) => {
    setWantsPassword(wants);
    if (wants) {
      setStep('set_password');
    } else {
      setStep('done');
    }
  };

  const handleSetPassword = () => {
    if (password.length < 4) return;
    if (password !== confirmPassword) return;
    setStep('done');
  };

  const stepLabels = ['Enter Code', 'Your Details', 'Security', 'Done'];
  const stepIndex = { code: 0, details: 1, password_choice: 2, set_password: 2, done: 3 }[step];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-500 text-white font-black text-xl shadow-lg">IP</div>
          <h1 className="mt-3 text-2xl font-black text-gray-900">Join Your Ikimina Group</h1>
          <p className="text-sm text-gray-500 mt-1">Your treasurer has added you — complete your registration below</p>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          {stepLabels.map((label, i) => (
            <React.Fragment key={label}>
              <div className="flex flex-col items-center gap-1">
                <div className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-colors ${i <= stepIndex ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-400'}`}>
                  {i < stepIndex ? '✓' : i + 1}
                </div>
                <span className={`text-xs font-semibold ${i <= stepIndex ? 'text-primary-600' : 'text-gray-400'}`}>{label}</span>
              </div>
              {i < stepLabels.length - 1 && <div className={`flex-1 h-0.5 mb-4 ${i < stepIndex ? 'bg-primary-500' : 'bg-gray-200'}`} />}
            </React.Fragment>
          ))}
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">

          {/* Step 1: Invite code */}
          {step === 'code' && (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-black text-gray-900">Enter Your Invite Code</h2>
                <p className="text-sm text-gray-500 mt-1">Your treasurer gave you a code that looks like <strong>IKM-JOIN-XXXX</strong></p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Invite Code</label>
                <input
                  value={inviteCode}
                  onChange={e => { setInviteCode(e.target.value); setCodeError(''); }}
                  placeholder="e.g. IKM-JOIN-7842"
                  className={`w-full rounded-xl border px-4 py-3 text-center text-lg font-bold tracking-widest focus:outline-none focus:ring-2 focus:ring-primary-100 ${codeError ? 'border-red-400 focus:border-red-400' : 'border-gray-300 focus:border-primary-500'}`}
                />
                {codeError && <p className="mt-2 text-sm text-red-600">{codeError}</p>}
              </div>
              <button
                onClick={handleCodeSubmit}
                disabled={!inviteCode.trim() || loading}
                className="w-full rounded-xl bg-primary-500 py-3 font-bold text-white hover:bg-primary-600 disabled:opacity-50"
              >
                {loading ? 'Checking...' : 'Continue'}
              </button>
            </div>
          )}

          {/* Step 2: Details */}
          {step === 'details' && (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-black text-gray-900">Your Details</h2>
                <p className="text-sm text-gray-500 mt-1">Enter your name and phone number so your group can identify you</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
                <input
                  value={form.name}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  placeholder="Your full name"
                  className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number</label>
                <input
                  value={form.phone}
                  onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                  placeholder="+250 7XX XXX XXX"
                  className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
                />
              </div>
              <button
                onClick={handleDetailsSubmit}
                disabled={!form.name.trim() || !form.phone.trim()}
                className="w-full rounded-xl bg-primary-500 py-3 font-bold text-white hover:bg-primary-600 disabled:opacity-50"
              >
                Continue
              </button>
            </div>
          )}

          {/* Step 3: Password choice */}
          {step === 'password_choice' && (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-black text-gray-900">Do you want a password?</h2>
                <p className="text-sm text-gray-500 mt-1">This is your choice — both options are safe</p>
              </div>
              <div className="space-y-3">
                <button
                  onClick={() => handlePasswordChoice(true)}
                  className="w-full rounded-2xl border-2 border-gray-200 p-5 text-left hover:border-primary-400 hover:bg-primary-50 transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 flex-shrink-0">
                      <Shield size={20} className="text-primary-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">Yes, I want a password</p>
                      <p className="text-sm text-gray-500 mt-0.5">You will be logged out every 4 hours and need to enter your password to log back in</p>
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => handlePasswordChoice(false)}
                  className="w-full rounded-2xl border-2 border-gray-200 p-5 text-left hover:border-gray-400 hover:bg-gray-50 transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 flex-shrink-0">
                      <Smartphone size={20} className="text-gray-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">No password, keep me logged in</p>
                      <p className="text-sm text-gray-500 mt-0.5">The app stays open on your phone. No session expiry. Good for people who share their phone less.</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Step 3b: Set password */}
          {step === 'set_password' && (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-black text-gray-900">Set Your Password</h2>
                <p className="text-sm text-gray-500 mt-1">Use at least 4 digits or letters. Keep it simple but private.</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type={showPw ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full rounded-xl border border-gray-300 px-4 py-2.5 pr-10 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
                  />
                  <button type="button" onClick={() => setShowPw(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="Enter password again"
                  className={`w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-100 ${confirmPassword && password !== confirmPassword ? 'border-red-400' : 'border-gray-300 focus:border-primary-500'}`}
                />
                {confirmPassword && password !== confirmPassword && (
                  <p className="mt-1 text-xs text-red-600">Passwords do not match</p>
                )}
              </div>
              <button
                onClick={handleSetPassword}
                disabled={password.length < 4 || password !== confirmPassword}
                className="w-full rounded-xl bg-primary-500 py-3 font-bold text-white hover:bg-primary-600 disabled:opacity-50"
              >
                Set Password & Join
              </button>
            </div>
          )}

          {/* Done */}
          {step === 'done' && (
            <div className="text-center space-y-5">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mx-auto">
                <CheckCircle size={32} className="text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-black text-gray-900">You're in! 🎉</h2>
                <p className="text-sm text-gray-500 mt-2">
                  Welcome, <strong>{form.name}</strong>! You are now an active member of your ikimina group.
                  {wantsPassword
                    ? ' You will be logged out every 4 hours for security.'
                    : ' Your session will stay open — no need to log in again.'}
                </p>
              </div>
              <div className="rounded-xl bg-primary-50 border border-primary-100 p-4 text-left">
                <p className="text-sm font-semibold text-primary-800 mb-2">What happens next:</p>
                <ul className="space-y-1 text-sm text-primary-700">
                  <li>✓ Your treasurer will confirm your membership</li>
                  <li>✓ You will receive contribution reminders on your phone</li>
                  <li>✓ Dial <strong>*777*2847#</strong> anytime to pay or check your balance</li>
                </ul>
              </div>
              <button
                onClick={() => navigate('/login')}
                className="w-full rounded-xl bg-primary-500 py-3 font-bold text-white hover:bg-primary-600"
              >
                Go to Login
              </button>
            </div>
          )}
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already a member? <Link to="/login" className="text-primary-600 font-semibold hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default MemberJoin;
