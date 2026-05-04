import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Smartphone, TrendingUp, Zap, Phone, MessageSquare, ShieldAlert, ArrowRight } from 'lucide-react';
import PageHeader from '../../components/public/PageHeader';

const services = [
  {
    icon: <BookOpen size={22} className="text-primary-600" />,
    title: 'Digital Group Management',
    desc: 'Replace notebooks and spreadsheets with a transparent, real-time digital ledger. Every member sees every transaction. Treasurers manage contributions, rotations, and disputes from one dashboard.',
    highlights: ['Real-time balance visibility', 'Full contribution history', 'Rotation schedule management'],
  },
  {
    icon: <Smartphone size={22} className="text-primary-600" />,
    title: 'Automated MoMo Payment Tracking',
    desc: 'Contributions are collected automatically via MTN MoMo on the scheduled day. Every payment is confirmed, timestamped, and recorded — no treasurer handles cash.',
    highlights: ['Automated payment requests', 'Instant confirmation SMS', 'Zero cash handling'],
  },
  {
    icon: <TrendingUp size={22} className="text-primary-600" />,
    title: 'Credit Passport Score (0 – 850)',
    desc: 'After 3 months of activity, every member earns a verified Credit Passport score backed by real MoMo transaction records. Share it with any bank, SACCO, or MFI to access formal loans.',
    highlights: ['Generated after 3 months', 'Backed by MoMo data', 'Shareable with lenders'],
  },
  {
    icon: <Zap size={22} className="text-primary-600" />,
    title: 'Emergency Micro-Loans',
    desc: 'Members with 6 or more months of consistent contribution history can access emergency micro-loans from the group fund — with transparent terms and automatic repayment tracking.',
    highlights: ['Available after 6 months', 'Transparent loan terms', 'Automatic repayment tracking'],
  },
  {
    icon: <Phone size={22} className="text-primary-600" />,
    title: 'USSD Access for Feature Phones',
    desc: 'No smartphone? No problem. Members on feature phones can contribute, check balances, and receive their Credit Passport score via USSD — no internet connection required.',
    highlights: ['No internet needed', 'Works on any phone', 'Full contribution access'],
  },
  {
    icon: <MessageSquare size={22} className="text-primary-600" />,
    title: 'Dispute Resolution System',
    desc: 'When payment disputes arise, members can raise a formal dispute through the platform. Treasurers review evidence, and unresolved cases are escalated to IkiminaPass support.',
    highlights: ['Formal dispute filing', 'Evidence-based review', 'Escalation to support'],
  },
  {
    icon: <ShieldAlert size={22} className="text-primary-600" />,
    title: 'Wrong-Payment Prevention',
    desc: 'Built-in safeguards verify payment amounts and recipient details before processing. Members receive confirmation prompts before any transaction is finalized.',
    highlights: ['Amount verification', 'Recipient confirmation', 'Pre-transaction prompts'],
  },
];

const ServicesPage: React.FC = () => {
  return (
    <>
      <PageHeader
        title="Services & Features"
        subtitle="Every tool your group needs to save safely, stay transparent, and build formal credit trust."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article key={service.title} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-primary-200 transition-all">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50">
                {service.icon}
              </div>
              <h2 className="mt-4 text-lg font-bold text-gray-900">{service.title}</h2>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">{service.desc}</p>
              <ul className="mt-4 space-y-1.5">
                {service.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2 text-xs font-medium text-gray-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary-500 flex-shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* Lender section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary-400">For Banks & MFIs</p>
          <h2 className="mt-3 text-2xl font-black sm:text-3xl">Access verified informal-sector credit data</h2>
          <p className="mt-4 text-gray-300 leading-relaxed">
            Lenders can purchase verified Credit Passport reports for any IkiminaPass member. Each report
            includes full MoMo-backed contribution history, score breakdown, and group behavior data —
            giving you the confidence to lend to Rwanda's informal sector safely.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary-500 px-7 py-3.5 font-bold text-white hover:bg-primary-600 active:bg-primary-700 transition-colors"
          >
            Partner With Us <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
};

export default ServicesPage;
