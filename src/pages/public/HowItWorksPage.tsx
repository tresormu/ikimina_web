import React from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, Phone, ArrowRight, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import PageHeader from '../../components/public/PageHeader';
import howItWorksImg from '../../assets/images/how-it-works.svg';

const HowItWorksPage: React.FC = () => {
  const { t } = useTranslation();

  const steps = [
    {
      title: t('public:how_it_works.steps.0.title'),
      desc: t('public:how_it_works.steps.0.desc'),
    },
    {
      title: t('public:how_it_works.steps.1.title'),
      desc: t('public:how_it_works.steps.1.desc'),
    },
    {
      title: t('public:how_it_works.steps.2.title'),
      desc: t('public:how_it_works.steps.2.desc'),
    },
    {
      title: t('public:how_it_works.steps.3.title'),
      desc: t('public:how_it_works.steps.3.desc'),
    },
    {
      title: t('public:how_it_works.steps.4.title'),
      desc: t('public:how_it_works.steps.4.desc'),
    },
    {
      title: t('public:how_it_works.steps.5.title'),
      desc: t('public:how_it_works.steps.5.desc'),
    },
  ];

  const accessMethods = [
    {
      icon: <Smartphone size={28} className="text-primary-600" />,
      title: t('public:how_it_works.access_methods.smartphone.title'),
      desc: t('public:how_it_works.access_methods.smartphone.desc'),
      badge: t('public:how_it_works.access_methods.smartphone.badge'),
    },
    {
      icon: <Phone size={28} className="text-primary-600" />,
      title: t('public:how_it_works.access_methods.ussd.title'),
      desc: t('public:how_it_works.access_methods.ussd.desc'),
      badge: t('public:how_it_works.access_methods.ussd.badge'),
    },
  ];
  return (
    <>
      <PageHeader
        title={t('public:how_it_works.title')}
        subtitle={t('public:how_it_works.subtitle')}
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
            <p className="text-sm font-semibold uppercase tracking-widest text-primary-500">{t('public:how_it_works.access_methods.title')}</p>
            <h2 className="mt-3 text-2xl font-black text-gray-900 sm:text-3xl">
              {t('public:how_it_works.access_methods.heading')}
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
            <p className="text-sm font-semibold uppercase tracking-widest text-primary-400">{t('public:how_it_works.credit_passport.title')}</p>
          </div>
          <h2 className="mt-3 text-2xl font-black sm:text-3xl">{t('public:how_it_works.credit_passport.heading')}</h2>
          <p className="mt-4 text-gray-300 leading-relaxed">
            {t('public:how_it_works.credit_passport.desc')}
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              { label: 'Minimum history', value: t('public:how_it_works.credit_passport.stats.history') },
              { label: 'Score range', value: t('public:how_it_works.credit_passport.stats.range') },
              { label: 'Backed by', value: t('public:how_it_works.credit_passport.stats.backed_by') },
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
          {t('public:how_it_works.cta')} <ArrowRight size={18} />
        </Link>
      </section>
    </>
  );
};

export default HowItWorksPage;
