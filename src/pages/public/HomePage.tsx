import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck, Smartphone, TrendingUp, Users,
  ArrowRight, CheckCircle, Lock, Eye, Award, AlertTriangle,
} from 'lucide-react';
import heroIllustration from '../../assets/images/hero-illustration.svg';
import creditPassport from '../../assets/images/credit-passport.svg';

const stats = [
  { value: '5.9M', label: 'Rwandans in savings groups' },
  { value: '82.5%', label: 'Working in the informal sector' },
  { value: '10%/mo', label: 'Charged by loan sharks' },
  { value: '0', label: 'Formal credit records for most members' },
];

const solutions = [
  {
    icon: <Users size={22} className="text-primary-600" />,
    title: 'Digital Group Management',
    desc: 'Replace notebooks with a transparent, tamper-proof digital ledger every member can see in real time.',
  },
  {
    icon: <Smartphone size={22} className="text-primary-600" />,
    title: 'Automated MoMo Payments',
    desc: 'Contributions are collected and confirmed via MTN MoMo automatically — no chasing, no disputes.',
  },
  {
    icon: <TrendingUp size={22} className="text-primary-600" />,
    title: 'Credit Passport Score',
    desc: 'After 3 months, every member earns a verified score from 0 to 850 backed by real transaction history.',
  },
  {
    icon: <ShieldCheck size={22} className="text-primary-600" />,
    title: 'Fund Protection',
    desc: 'No more treasurers disappearing with group funds. Every franc is tracked, recorded, and accountable.',
  },
];

const howSteps = [
  'Group registers on IkiminaPass',
  'Members contribute weekly via MTN MoMo',
  'Every transaction is recorded automatically',
  'After 3 months, Credit Passport score is generated',
  'Member shares score with bank or SACCO',
  'Financial institution offers fair formal loan rates',
];

const problems = [
  'Treasurers disappear with group funds — members lose everything',
  'Years of savings discipline are invisible to banks and SACCOs',
  'No formal credit history means no access to fair loans',
  'Members pay 10% per month to loan sharks as the only alternative',
];

const trustPoints = [
  {
    icon: <Lock size={20} className="text-primary-600" />,
    title: 'No cash ever touches a treasurer',
    desc: 'All contributions flow directly through MTN MoMo — from member to group account. No human intermediary handles the money.',
  },
  {
    icon: <Eye size={20} className="text-primary-600" />,
    title: 'Every member sees every transaction',
    desc: 'The group ledger is fully visible to all members in real time. No record can be altered without every member knowing.',
  },
  {
    icon: <ShieldCheck size={20} className="text-primary-600" />,
    title: 'Immutable MoMo-backed records',
    desc: 'Every transaction is timestamped and stored permanently. Records cannot be deleted or edited after confirmation.',
  },
  {
    icon: <Award size={20} className="text-primary-600" />,
    title: 'Treasurers are rewarded for honesty',
    desc: 'We pay treasurers 35% of transaction fees. Accuracy and integrity are financially incentivized — not just expected.',
  },
];

const HomePage: React.FC = () => {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gray-900 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-700/30 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-400">
                Built for Rwanda's ikimina economy
              </p>
              <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
                Turning Rwanda's Oldest Savings Tradition Into a{' '}
                <span className="text-primary-400">Credit Superpower</span>
              </h1>
              <p className="mt-6 text-lg text-gray-300 leading-relaxed">
                5.9 million Rwandans save together in community groups every week — but their records live
                in notebooks. IkiminaPass digitizes group management, automates MoMo contributions, and
                generates a verified Credit Passport score from 0 to 850.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary-500 px-7 py-3.5 font-bold text-white shadow-lg hover:bg-primary-600 active:bg-primary-700 transition-colors"
                >
                  Get Started <ArrowRight size={18} />
                </Link>
                <Link
                  to="/how-it-works"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-7 py-3.5 font-semibold hover:bg-white/10 transition-colors"
                >
                  See How It Works
                </Link>
              </div>
            </div>
            {/* Hero illustration */}
            <div className="hidden lg:flex items-center justify-center">
              <img
                src={heroIllustration}
                alt="IkiminaPass community savings platform"
                className="w-full max-w-lg rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-gray-100">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-gray-100 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white px-6 py-8 text-center">
              <p className="text-3xl font-extrabold text-primary-600">{stat.value}</p>
              <p className="mt-2 text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Who We Are */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary-500">Who We Are</p>
            <h2 className="mt-3 text-3xl font-black text-gray-900 sm:text-4xl">
              A team that grew up with ikimina
            </h2>
            <p className="mt-5 text-lg text-gray-600 leading-relaxed">
              IkiminaPass was founded by Rwandans who watched their families and communities rely on
              ikimina groups for decades. We know this tradition from the inside — the trust it requires,
              the discipline it builds, and the vulnerability it creates when that trust is broken.
            </p>
            <p className="mt-4 text-gray-600 leading-relaxed">
              We are a fintech team combining deep local knowledge with modern technology — built to serve
              the people who need it most, not just those who already have access.
            </p>
            <Link
              to="/about"
              className="mt-6 inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
            >
              Learn more about us <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: '5.9M', label: 'Rwandans in savings groups' },
              { value: '3 months', label: 'To earn a Credit Passport' },
              { value: '0 – 850', label: 'Credit Passport score range' },
              { value: '35%', label: 'Revenue share for treasurers' },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm">
                <p className="text-2xl font-extrabold text-primary-600">{item.value}</p>
                <p className="mt-1 text-xs text-gray-500 leading-snug">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem / Solution */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary-500">What We Solve</p>
              <h2 className="mt-3 text-3xl font-black text-gray-900 sm:text-4xl">
                Years of savings discipline — invisible to banks
              </h2>
              <p className="mt-5 text-gray-600 leading-relaxed">
                Rwanda's ikimina groups are a powerful savings engine. But when a member walks into a bank
                asking for a loan, their years of weekly contributions count for nothing — no verifiable
                record, no credit history, no proof.
              </p>
              <ul className="mt-6 space-y-3">
                {problems.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-gray-700">
                    <AlertTriangle size={16} className="mt-0.5 flex-shrink-0 text-red-400" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-primary-50 border border-primary-100 p-8">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary-600">Our Solution</p>
              <h3 className="mt-3 text-2xl font-black text-gray-900">IkiminaPass fixes all of this</h3>
              <ul className="mt-6 space-y-4">
                {[
                  'Digital ledger every member can verify in real time',
                  'MoMo automation removes human handling of funds',
                  'Credit Passport score built from real transaction data',
                  'Banks and SACCOs can now lend with confidence',
                  'Dispute resolution system for fair conflict handling',
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3 text-gray-700">
                    <CheckCircle size={18} className="mt-0.5 flex-shrink-0 text-primary-500" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Credit Passport showcase */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="flex items-center justify-center">
            <img
              src={creditPassport}
              alt="IkiminaPass Credit Passport score card"
              className="w-full max-w-md rounded-2xl shadow-xl"
            />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary-500">Credit Passport</p>
            <h2 className="mt-3 text-3xl font-black text-gray-900 sm:text-4xl">
              Your savings history, finally visible to banks
            </h2>
            <p className="mt-5 text-gray-600 leading-relaxed">
              After just 3 months of consistent contributions, IkiminaPass generates a verified Credit
              Passport score from 0 to 850 — calculated directly from your real MoMo transaction records.
              Share it with any bank, SACCO, or MFI to access formal loans at fair rates.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-4">
              {[
                { value: '3 months', label: 'Minimum history' },
                { value: '0 – 850', label: 'Score range' },
                { value: 'MoMo', label: 'Backed by' },
              ].map((item) => (
                <div key={item.label} className="rounded-xl border border-primary-100 bg-primary-50 p-4 text-center">
                  <p className="text-lg font-extrabold text-primary-600">{item.value}</p>
                  <p className="mt-1 text-xs text-gray-500">{item.label}</p>
                </div>
              ))}
            </div>
            <Link
              to="/how-it-works"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary-500 px-6 py-3 font-bold text-white hover:bg-primary-600 active:bg-primary-700 transition-colors"
            >
              How the score is calculated <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Solutions grid */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary-500">What We Offer</p>
            <h2 className="mt-3 text-3xl font-black text-gray-900 sm:text-4xl">Everything your group needs</h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {solutions.map((s) => (
              <div key={s.title} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-primary-200 transition-all">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50">
                  {s.icon}
                </div>
                <h3 className="mt-4 text-lg font-bold text-gray-900">{s.title}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Trust Us */}
      <section className="bg-gray-900 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary-400">Why Trust Us</p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Trust is built into how the platform works
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-gray-400 leading-relaxed">
              We don't ask you to trust us — we built the platform so you don't have to take our word for it.
              Every safeguard is structural, not just a promise.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {trustPoints.map((t) => (
              <div key={t.title} className="rounded-2xl border border-gray-700 bg-gray-800 p-6 hover:border-primary-500 transition-colors">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-500/10">
                  {t.icon}
                </div>
                <h3 className="mt-4 font-bold text-white">{t.title}</h3>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-primary-400 font-semibold hover:text-primary-300 transition-colors"
            >
              Read more about why we're trustworthy <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* How it works preview */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary-500">The Journey</p>
          <h2 className="mt-3 text-3xl font-black text-gray-900 sm:text-4xl">From savings group to bank loan</h2>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {howSteps.map((step, i) => (
            <div key={step} className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary-500 text-sm font-bold text-white">
                {i + 1}
              </div>
              <p className="text-gray-700 font-medium">{step}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/how-it-works" className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors">
            See the full process <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-primary-600">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-white sm:text-4xl">Ready to register your group?</h2>
          <p className="mt-4 text-lg text-primary-100">
            Join thousands of Rwandan savings groups building verified credit history today.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/register"
              className="rounded-xl bg-white px-8 py-3.5 font-bold text-primary-700 hover:bg-primary-50 transition-colors"
            >
              Register Your Group
            </Link>
            <Link
              to="/contact"
              className="rounded-xl border border-white/30 px-8 py-3.5 font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Talk to Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
