import React from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, Phone, ArrowRight, Star } from 'lucide-react';
import PageHeader from '../../components/public/PageHeader';
import howItWorksImg from '../../assets/images/how-it-works.svg';

const steps = [
  {
    title: 'Group Registers on IkiminaPass',
    desc: 'A treasurer creates a group account, sets the contribution amount, frequency (weekly, bi-weekly, or monthly), and invites members via phone number or invite code.',
  },
  {
    title: 'Members Join and Confirm',
    desc: 'Each member receives an SMS or USSD prompt to confirm their participation. No smartphone required — feature phone users are fully supported.',
  },
  {
    title: 'Contributions Collected via MTN MoMo',
    desc: 'On contribution day, members receive an automated MoMo payment request. Funds are collected directly — no treasurer handles cash, eliminating theft risk.',
  },
  {
    title: 'Every Transaction Recorded Automatically',
    desc: 'Each payment is timestamped, confirmed, and stored in an immutable digital ledger. Every member can view the group balance and contribution history at any time.',
  },
  {
    title: 'Rotation Payout Managed Digitally',
    desc: "When it is a member's turn to receive the pot, the payout is sent automatically via MoMo. The rotation schedule is transparent and agreed upon by the group.",
  },
  {
    title: 'Credit Passport Score Generated',
    desc: 'After 3 months of consistent contributions, IkiminaPass generates a verified Credit Passport score from 0 to 850 based on payment consistency, tenure, and group behavior.',
  },
  {
    title: 'Member Shares Score with Lender',
    desc: 'The member authorizes a bank, SACCO, or MFI to access their Credit Passport report. The lender sees verified, MoMo-backed savings history.',
  },
  {
    title: 'Lender Offers Fair Formal Loan',
    desc: 'With verified credit data, the lender can offer a formal loan at fair rates — ending the cycle of 10% per month loan shark dependency.',
  },
];

const accessMethods = [
  {
    icon: <Smartphone size={28} className="text-primary-600" />,
    title: 'Smartphone App',
    desc: 'Full dashboard for treasurers and members. View group stats, contribution history, Credit Passport score, and manage disputes.',
    badge: 'Full Features',
  },
  {
    icon: <Phone size={28} className="text-primary-600" />,
    title: 'USSD (Feature Phones)',
    desc: 'Dial a short code to contribute, check your balance, and receive your Credit Passport score — no internet or smartphone needed.',
    badge: 'No Internet Required',
  },
];

const HowItWorksPage: React.FC = () => {
  return (
    <>
      <PageHeader
        title="How IkiminaPass Works"
        subtitle="From weekly community savings to verified loan-readiness — a simple, fully digital journey."
      />

      {/* Steps */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Flow illustration */}
        <img
          src={howItWorksImg}
          alt="IkiminaPass step-by-step flow"
          className="w-full rounded-2xl shadow-md mb-10"
        />
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={step.title} className="flex items-start gap-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-500 text-sm font-bold text-white">
                {index + 1}
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{step.title}</h3>
                <p className="mt-1 text-sm text-gray-600 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Access Methods */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary-500">Accessibility</p>
            <h2 className="mt-3 text-2xl font-black text-gray-900 sm:text-3xl">
              Works for every Rwandan — smartphone or feature phone
            </h2>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {accessMethods.map((method) => (
              <div key={method.title} className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary-50 border border-primary-100">
                  {method.icon}
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <h3 className="text-lg font-bold text-gray-900">{method.title}</h3>
                  <span className="rounded-full bg-primary-100 px-2.5 py-0.5 text-xs font-semibold text-primary-700">
                    {method.badge}
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{method.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credit Passport Explainer */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gray-900 p-8 text-white">
          <div className="flex items-center gap-3">
            <Star size={22} className="text-primary-400" />
            <p className="text-sm font-semibold uppercase tracking-widest text-primary-400">Credit Passport</p>
          </div>
          <h2 className="mt-3 text-2xl font-black sm:text-3xl">Your savings history, finally visible to banks</h2>
          <p className="mt-4 text-gray-300 leading-relaxed">
            The Credit Passport is a score from 0 to 850 calculated from your real MoMo transaction history
            inside your ikimina group. It measures payment consistency, tenure, group size, and repayment
            behavior. After just 3 months, you have a verifiable credit identity that banks and SACCOs can
            trust — without needing a formal bank account history.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              { label: 'Minimum history', value: '3 months' },
              { label: 'Score range', value: '0 – 850' },
              { label: 'Backed by', value: 'MoMo records' },
            ].map((item) => (
              <div key={item.label} className="rounded-xl bg-white/10 p-4 text-center">
                <p className="text-xl font-extrabold text-primary-400">{item.value}</p>
                <p className="mt-1 text-xs text-gray-400">{item.label}</p>
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
          Register Your Group Now <ArrowRight size={18} />
        </Link>
      </section>
    </>
  );
};

export default HowItWorksPage;
