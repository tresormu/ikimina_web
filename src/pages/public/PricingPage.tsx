import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import PageHeader from '../../components/public/PageHeader';

const PricingPage: React.FC = () => {
  const { t } = useTranslation();

  const groupPlans = [
    {
      tier: t('public:pricing.group_plans.basic.title'),
      members: '5 – 10 members',
      price: t('public:pricing.group_plans.basic.price'),
      currency: 'RWF / month',
      features: [
        'Digital contribution ledger',
        'Automated MoMo collection',
        'Credit Passport for all members',
        'USSD access included',
        'Dispute resolution',
      ],
      highlight: false,
    },
    {
      tier: t('public:pricing.group_plans.standard.title'),
      members: '11 – 20 members',
      price: t('public:pricing.group_plans.standard.price'),
      currency: t('public:pricing.group_plans.standard.period'),
      features: [
        'Everything in Small Group',
        'Advanced rotation management',
        'Priority support',
        'Group analytics dashboard',
        'Emergency micro-loan access',
      ],
      highlight: true,
    },
    {
      tier: t('public:pricing.group_plans.premium.title'),
      members: '21 – 35 members',
      price: t('public:pricing.group_plans.premium.price'),
      currency: t('public:pricing.group_plans.premium.period'),
      features: [
        'Everything in Medium Group',
        'Multi-treasurer management',
        'Dedicated account manager',
        'Custom contribution schedules',
        'Full audit trail export',
      ],
      highlight: false,
    },
  ];

  return (
    <>
      <PageHeader
        title={t('public:pricing.title')}
        subtitle={t('public:pricing.subtitle')}
      />

      {/* Group Plans */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary-500">Group Subscriptions</p>
          <h2 className="mt-3 text-2xl font-black text-gray-900 sm:text-3xl">Choose your group size</h2>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {groupPlans.map((plan) => (
            <article
              key={plan.tier}
              className={`relative rounded-2xl border p-7 ${
                plan.highlight
                  ? 'border-primary-500 bg-white shadow-xl ring-2 ring-primary-500'
                  : 'border-gray-200 bg-white shadow-sm'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-primary-500 px-4 py-1 text-xs font-bold text-white shadow">
                    Most Popular
                  </span>
                </div>
              )}
              <p className="text-sm font-semibold text-gray-500">{plan.members}</p>
              <h3 className="mt-1 text-xl font-black text-gray-900">{plan.tier}</h3>
              <div className="mt-4 flex items-end gap-1">
                <span className="text-4xl font-extrabold text-primary-600">{plan.price}</span>
                <span className="mb-1 text-sm text-gray-500">{plan.currency}</span>
              </div>
              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-gray-700">
                    <CheckCircle size={16} className="mt-0.5 flex-shrink-0 text-primary-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                to="/register"
                className={`mt-8 block rounded-xl px-5 py-3 text-center font-bold transition-colors ${
                  plan.highlight
                    ? 'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700'
                    : 'border border-gray-300 text-gray-900 hover:bg-gray-50'
                }`}
              >
                Get Started
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Financial Institutions Pricing */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary-500">For Banks & MFIs</p>
            <h2 className="mt-3 text-2xl font-black text-gray-900">Financial Institution Credit Report Access</h2>
            <p className="mt-3 text-gray-600 leading-relaxed">
              Banks, MFIs, and SACCOs pay a per-report fee to access verified Credit Passport reports.
              Each report includes full MoMo-backed contribution history, score breakdown, and group behavior data.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-primary-100 bg-primary-50 p-5">
                <p className="text-3xl font-extrabold text-primary-600">5,000 RWF</p>
                <p className="mt-1 text-sm text-primary-800">Standard credit report</p>
              </div>
              <div className="rounded-xl border border-primary-100 bg-primary-50 p-5">
                <p className="text-3xl font-extrabold text-primary-600">10,000 RWF</p>
                <p className="mt-1 text-sm text-primary-800">Full detailed report with audit trail</p>
              </div>
            </div>
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gray-900 px-6 py-3 font-bold text-white hover:bg-gray-800 transition-colors"
            >
              Enquire About Financial Institution Access <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Treasurer Incentive */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-primary-600 p-8 text-white text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary-100">Treasurer Incentive</p>
          <h2 className="mt-3 text-3xl font-black">You earn 35% of every transaction fee</h2>
          <p className="mt-4 text-primary-100 leading-relaxed max-w-2xl mx-auto">
            Unlike other platforms that charge treasurers, IkiminaPass pays them. For every transaction
            fee collected from your group, you receive 35% directly to your MoMo account.
          </p>
          <Link
            to="/register"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 font-bold text-primary-700 hover:bg-primary-50 transition-colors"
          >
            Register as Treasurer <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
};

export default PricingPage;
