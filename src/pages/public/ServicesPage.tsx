import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Smartphone, TrendingUp, Zap, Phone, MessageSquare, ShieldAlert, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import PageHeader from '../../components/public/PageHeader';

const ServicesPage: React.FC = () => {
  const { t } = useTranslation();

  const services = [
    {
      icon: <BookOpen size={22} className="text-primary-600" />,
      title: t('public:services.features.digital_management.title'),
      desc: t('public:services.features.digital_management.desc'),
      highlights: ['Real-time balance visibility', 'Full contribution history', 'Rotation schedule management'],
    },
    {
      icon: <Smartphone size={22} className="text-primary-600" />,
      title: t('public:services.features.momo_payments.title'),
      desc: t('public:services.features.momo_payments.desc'),
      highlights: ['Automated payment requests', 'Instant confirmation SMS', 'Zero cash handling'],
    },
    {
      icon: <TrendingUp size={22} className="text-primary-600" />,
      title: t('public:services.features.credit_passport.title'),
      desc: t('public:services.features.credit_passport.desc'),
      highlights: ['Generated after 3 months', 'Backed by MoMo data', 'Shareable with financial institutions'],
    },
    {
      icon: <Zap size={22} className="text-primary-600" />,
      title: t('public:services.features.micro_loans.title'),
      desc: t('public:services.features.micro_loans.desc'),
      highlights: ['Available after 6 months', 'Transparent loan terms', 'Automatic repayment tracking'],
    },
    {
      icon: <Phone size={22} className="text-primary-600" />,
      title: t('public:services.features.ussd_access.title'),
      desc: t('public:services.features.ussd_access.desc'),
      highlights: ['No internet needed', 'Works on any phone', 'Full contribution access'],
    },
    {
      icon: <MessageSquare size={22} className="text-primary-600" />,
      title: t('public:services.features.dispute_system.title'),
      desc: t('public:services.features.dispute_system.desc'),
      highlights: ['Formal dispute process', 'Evidence tracking', 'Escalation support'],
    },
    {
      icon: <ShieldAlert size={22} className="text-primary-600" />,
      title: t('public:services.features.wrong_payment_prevention.title'),
      desc: t('public:services.features.wrong_payment_prevention.desc'),
      highlights: ['Amount verification', 'Recipient confirmation', 'Pre-transaction prompts'],
    },
  ];

  return (
    <>
      <PageHeader
        title={t('public:services.title')}
        subtitle={t('public:services.subtitle')}
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

      {/* Financial Institutions section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary-400">{t('public:services.financial_institutions.title')}</p>
          <h2 className="mt-3 text-2xl font-black sm:text-3xl">{t('public:services.financial_institutions.subtitle')}</h2>
          <p className="mt-4 text-gray-300 leading-relaxed">
            {t('public:services.financial_institutions.desc')}
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary-500 px-7 py-3.5 font-bold text-white hover:bg-primary-600 active:bg-primary-700 transition-colors"
          >
            {t('public:services.financial_institutions.cta')} <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
};

export default ServicesPage;
