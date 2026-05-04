import React from 'react';
import { Link } from 'react-router-dom';
import {
  Heart, Target, Award, ArrowRight, ShieldCheck,
  Lock, Eye, Users, TrendingUp, AlertTriangle, CheckCircle,
} from 'lucide-react';
import PageHeader from '../../components/public/PageHeader';

const teamValues = [
  {
    icon: <Heart size={22} className="text-primary-600" />,
    title: 'Community First',
    desc: 'We built IkiminaPass to serve the millions of Rwandans who already save together — not to replace their tradition, but to protect and amplify it.',
  },
  {
    icon: <Target size={22} className="text-primary-600" />,
    title: 'Financial Inclusion',
    desc: 'Our goal is to make formal credit accessible to every Rwandan who has demonstrated savings discipline — regardless of whether they have a bank account.',
  },
  {
    icon: <Award size={22} className="text-primary-600" />,
    title: 'Radical Transparency',
    desc: 'Every transaction is visible to every member. No hidden fees, no opaque processes. Trust is built by making everything open and verifiable.',
  },
];

const trustReasons = [
  {
    icon: <Lock size={22} className="text-primary-600" />,
    title: 'No Cash Ever Touches a Treasurer',
    desc: 'All contributions flow directly through MTN MoMo — from member to the group account. No human intermediary handles the money, eliminating the single biggest source of fraud in traditional ikimina groups.',
  },
  {
    icon: <Eye size={22} className="text-primary-600" />,
    title: 'Every Member Sees Everything',
    desc: 'The group ledger is visible to all members in real time. Every contribution, every payout, every balance — fully transparent. No treasurer can alter records without every member knowing.',
  },
  {
    icon: <ShieldCheck size={22} className="text-primary-600" />,
    title: 'Immutable Transaction Records',
    desc: 'Every MoMo transaction is timestamped and stored permanently. Records cannot be deleted or edited after confirmation — giving members a tamper-proof history they can rely on.',
  },
  {
    icon: <TrendingUp size={22} className="text-primary-600" />,
    title: 'Credit Scores Backed by Real Data',
    desc: 'Our Credit Passport scores are not estimates or guesses. They are calculated directly from verified MoMo transaction records — the same data banks and regulators can audit.',
  },
  {
    icon: <Users size={22} className="text-primary-600" />,
    title: 'Treasurers Are Incentivized to Be Honest',
    desc: 'We pay treasurers 35% of transaction fees. A treasurer who manages their group well earns more. Honesty and accuracy are financially rewarded — not just expected.',
  },
  {
    icon: <Award size={22} className="text-primary-600" />,
    title: 'Dispute Resolution Built In',
    desc: 'When disagreements arise, members can raise formal disputes through the platform. Evidence is reviewed, and unresolved cases are escalated to IkiminaPass support — not left to informal pressure.',
  },
];

const problems = [
  {
    icon: <AlertTriangle size={20} className="text-red-500" />,
    title: 'Funds disappear with treasurers',
    desc: 'In traditional ikimina groups, the treasurer holds all the money. When they disappear — and it happens — members lose everything with no legal recourse.',
  },
  {
    icon: <AlertTriangle size={20} className="text-red-500" />,
    title: 'No verifiable credit history',
    desc: 'Years of faithful weekly contributions mean nothing to a bank. There is no formal record, no proof, no credit identity — so members are locked out of formal loans.',
  },
  {
    icon: <AlertTriangle size={20} className="text-red-500" />,
    title: 'Loan sharks fill the gap',
    desc: 'With no access to formal credit, members turn to informal lenders charging 10% per month or more. A short-term emergency becomes a long-term debt trap.',
  },
  {
    icon: <AlertTriangle size={20} className="text-red-500" />,
    title: 'Records are fragile and manipulable',
    desc: 'Notebooks get lost, Excel files get corrupted, and records can be altered. There is no audit trail, no accountability, and no way to resolve disputes fairly.',
  },
];

const AboutPage: React.FC = () => {
  return (
    <>
      <PageHeader
        title="About IkiminaPass"
        subtitle="Making Rwanda's informal savings visible, secure, and financially powerful."
      />

      {/* Our Mission */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gray-900 p-8 text-white">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary-400">Our Mission</p>
          <h2 className="mt-3 text-2xl font-black sm:text-3xl leading-snug">
            Turn Rwanda's savings discipline into a recognized financial identity
          </h2>
          <p className="mt-4 text-gray-300 leading-relaxed">
            We believe that every Rwandan who has contributed faithfully to an ikimina group for months or
            years deserves to have that discipline recognized by the formal financial system. IkiminaPass
            exists to bridge that gap — using technology to make the invisible visible, the informal
            verifiable, and the excluded included.
          </p>
          <p className="mt-4 text-gray-300 leading-relaxed">
            Our mission is not just to build software. It is to fundamentally change who gets access to
            credit in Rwanda — by proving that savings behavior, not bank account history, is the truest
            measure of financial trustworthiness.
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary-500">Who We Are</p>
          <h2 className="mt-3 text-2xl font-black text-gray-900 sm:text-3xl">
            A team that grew up with ikimina
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-gray-700 leading-relaxed">
                IkiminaPass was founded by Rwandans who watched their families, neighbors, and communities
                rely on ikimina groups for decades. We know this tradition from the inside — the trust it
                requires, the discipline it builds, and the vulnerability it creates when that trust is broken.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-gray-700 leading-relaxed">
                We are a fintech team combining deep local knowledge with modern technology. Our backgrounds
                span financial services, mobile money infrastructure, and community development. We built
                IkiminaPass because we believe technology should serve the people who need it most — not
                just those who already have access.
              </p>
            </div>
          </div>

          {/* Ikimina tradition stats */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { value: '5 – 30', label: 'Members per group' },
              { value: 'Weekly', label: 'Typical contribution frequency' },
              { value: '5.9M', label: 'Rwandans participating' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl border border-primary-200 bg-primary-50 p-5 text-center">
                <p className="text-2xl font-extrabold text-primary-600">{stat.value}</p>
                <p className="mt-1 text-sm text-primary-800">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Are Trying to Solve */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary-500">The Problem</p>
        <h2 className="mt-3 text-2xl font-black text-gray-900 sm:text-3xl">
          What we are trying to solve
        </h2>
        <p className="mt-4 text-gray-600 leading-relaxed">
          Rwanda's ikimina system is one of the most powerful grassroots financial tools in the world.
          But it has four critical failures that IkiminaPass was built to fix:
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {problems.map((p) => (
            <div key={p.title} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                {p.icon}
                <h3 className="font-bold text-gray-900">{p.title}</h3>
              </div>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Our answer */}
        <div className="mt-8 rounded-2xl border border-primary-200 bg-primary-50 p-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary-600">Our Answer</p>
          <h3 className="mt-2 text-xl font-black text-gray-900">IkiminaPass solves all four</h3>
          <ul className="mt-4 space-y-3">
            {[
              'MoMo automation means no treasurer ever holds cash',
              'Immutable digital ledger creates a verifiable credit history',
              'Credit Passport score gives members access to formal loans at fair rates',
              'Transparent records and dispute resolution eliminate manipulation',
            ].map((point) => (
              <li key={point} className="flex items-start gap-3 text-gray-700 text-sm">
                <CheckCircle size={16} className="mt-0.5 flex-shrink-0 text-primary-500" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why We Are Trustworthy */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary-500">Why Trust Us</p>
          <h2 className="mt-3 text-2xl font-black text-gray-900 sm:text-3xl">
            Why IkiminaPass is trustworthy
          </h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Trust is not something we ask for — it is something we earn through how the platform is built.
            Here is exactly why members, treasurers, and lenders can rely on IkiminaPass:
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {trustReasons.map((reason) => (
              <div key={reason.title} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:border-primary-200 hover:shadow-md transition-all">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50">
                  {reason.icon}
                </div>
                <h3 className="mt-4 font-bold text-gray-900">{reason.title}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{reason.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary-500">Our Story</p>
        <h2 className="mt-3 text-2xl font-black text-gray-900 sm:text-3xl">Why we built IkiminaPass</h2>
        <div className="mt-6 space-y-4 text-gray-700 leading-relaxed">
          <p>
            We saw the same story repeat itself too many times: a group member contributes faithfully for
            two years, then needs a loan to expand their business or handle a medical emergency. They walk
            into a bank. The bank asks for credit history. They have none — at least none the bank can see.
            They leave empty-handed and turn to a loan shark at 10% per month.
          </p>
          <p>
            Meanwhile, their ikimina treasurer has a notebook with two years of perfect payment records.
            That notebook is worth nothing to a bank. We built IkiminaPass to change that — to make those
            records count, to make that discipline visible, and to give every faithful saver the financial
            identity they have already earned.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary-500">What We Stand For</p>
          <h2 className="mt-3 text-2xl font-black text-gray-900 sm:text-3xl">Our values</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {teamValues.map((v) => (
              <div key={v.title} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50">
                  {v.icon}
                </div>
                <h3 className="mt-4 font-bold text-gray-900">{v.title}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Competitive Advantage */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-primary-200 bg-primary-50 p-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary-600">Our Edge</p>
          <h2 className="mt-3 text-2xl font-black text-gray-900 sm:text-3xl">
            We reward treasurers instead of charging them
          </h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            Most platforms charge treasurers a fee to use their software. We do the opposite. IkiminaPass
            shares <strong className="text-primary-700">35% of every transaction fee</strong> collected
            with the treasurer — creating a self-sustaining adoption engine across Rwanda where honesty
            and accuracy are financially rewarded.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              { label: 'Treasurer revenue share', value: '35%' },
              { label: 'Platform fee model', value: 'Per transaction' },
              { label: 'Charge to treasurer', value: 'RWF 0' },
            ].map((item) => (
              <div key={item.label} className="rounded-xl bg-white border border-primary-200 p-4 text-center">
                <p className="text-2xl font-extrabold text-primary-600">{item.value}</p>
                <p className="mt-1 text-xs text-gray-600">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 text-center">
        <Link
          to="/register"
          className="inline-flex items-center gap-2 rounded-xl bg-primary-500 px-8 py-3.5 font-bold text-white hover:bg-primary-600 active:bg-primary-700 transition-colors"
        >
          Join IkiminaPass Today <ArrowRight size={18} />
        </Link>
      </section>
    </>
  );
};

export default AboutPage;
