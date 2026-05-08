import React from 'react';
import { Link } from 'react-router-dom';
import {
  Heart, Target, Award, ArrowRight, ShieldCheck,
  Lock, Eye, Users, TrendingUp, AlertTriangle, CheckCircle,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import PageHeader from '../../components/public/PageHeader';

const AboutPage: React.FC = () => {
  const { t } = useTranslation();

  const teamValues = [
    {
      icon: <Heart size={22} className="text-primary-600" />,
      title: t('public:about.values.0.title'),
      desc: t('public:about.values.0.desc'),
    },
    {
      icon: <Target size={22} className="text-primary-600" />,
      title: t('public:about.values.1.title'),
      desc: t('public:about.values.1.desc'),
    },
    {
      icon: <Award size={22} className="text-primary-600" />,
      title: t('public:about.values.2.title'),
      desc: t('public:about.values.2.desc'),
    },
  ];

  const trustReasons = [
    {
      icon: <Lock size={22} className="text-primary-600" />,
      title: t('public:about.trust.reasons.0'),
      desc: t('public:about.trust.reasons.0_desc'),
    },
    {
      icon: <Eye size={22} className="text-primary-600" />,
      title: t('public:about.trust.reasons.1'),
      desc: t('public:about.trust.reasons.1_desc'),
    },
    {
      icon: <ShieldCheck size={22} className="text-primary-600" />,
      title: t('public:about.trust.reasons.2'),
      desc: t('public:about.trust.reasons.2_desc'),
    },
    {
      icon: <TrendingUp size={22} className="text-primary-600" />,
      title: t('public:about.trust.reasons.3'),
      desc: t('public:about.trust.reasons.3_desc'),
    },
  ];

  const problems = [
    {
      icon: <AlertTriangle size={20} className="text-red-500" />,
      title: t('public:about.problems.0.title'),
      desc: t('public:about.problems.0.desc'),
    },
    {
      icon: <AlertTriangle size={20} className="text-red-500" />,
      title: t('public:about.problems.1.title'),
      desc: t('public:about.problems.1.desc'),
    },
    {
      icon: <AlertTriangle size={20} className="text-red-500" />,
      title: t('public:about.problems.2.title'),
      desc: t('public:about.problems.2.desc'),
    },
    {
      icon: <AlertTriangle size={20} className="text-red-500" />,
      title: t('public:about.problems.3.title'),
      desc: t('public:about.problems.3.desc'),
    },
  ];
  return (
    <>
      <PageHeader
        title={t('public:about.title')}
        subtitle={t('public:about.subtitle')}
      />

      {/* Our Mission */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gray-900 p-8 text-white">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary-400">{t('public:about.mission.title')}</p>
          <h2 className="mt-3 text-2xl font-black sm:text-3xl leading-snug">
            {t('public:about.mission.heading')}
          </h2>
          <p className="mt-4 text-gray-300 leading-relaxed">
            {t('public:about.mission.desc_1')}
          </p>
          <p className="mt-4 text-gray-300 leading-relaxed">
            {t('public:about.mission.desc_2')}
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary-500">{t('public:about.who_we_are.title')}</p>
          <h2 className="mt-3 text-2xl font-black text-gray-900 sm:text-3xl">
            {t('public:about.who_we_are.heading')}
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-gray-700 leading-relaxed">
                {t('public:about.who_we_are.desc_1')}
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-gray-700 leading-relaxed">
                {t('public:about.who_we_are.desc_2')}
              </p>
            </div>
          </div>

          {/* Ikimina tradition stats */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { value: '5 – 30', label: t('public:about.stats.members') },
              { value: t('public:about.stats.frequency_value'), label: t('public:about.stats.frequency_label') },
              { value: '5.9M', label: t('public:about.stats.participating') },
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
        <p className="text-sm font-semibold uppercase tracking-widest text-primary-500">{t('public:about.problem.title')}</p>
        <h2 className="mt-3 text-2xl font-black text-gray-900 sm:text-3xl">
          {t('public:about.problem.heading')}
        </h2>
        <p className="mt-4 text-gray-600 leading-relaxed">
          {t('public:about.problem.desc')}
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
          <p className="text-sm font-semibold uppercase tracking-widest text-primary-600">{t('public:about.solution.title')}</p>
          <h3 className="mt-2 text-xl font-black text-gray-900">{t('public:about.solution.heading')}</h3>
          <ul className="mt-4 space-y-3">
            {[
              t('public:about.solution.points.0'),
              t('public:about.solution.points.1'),
              t('public:about.solution.points.2'),
              t('public:about.solution.points.3'),
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
          <p className="text-sm font-semibold uppercase tracking-widest text-primary-500">{t('public:about.trust.title')}</p>
          <h2 className="mt-3 text-2xl font-black text-gray-900 sm:text-3xl">
            {t('public:about.trust.heading')}
          </h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            {t('public:about.trust.desc')}
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
        <p className="text-sm font-semibold uppercase tracking-widest text-primary-500">{t('public:about.story.title')}</p>
        <h2 className="mt-3 text-2xl font-black text-gray-900 sm:text-3xl">{t('public:about.story.heading')}</h2>
        <div className="mt-6 space-y-4 text-gray-700 leading-relaxed">
          <p>
            {t('public:about.story.desc_1')}
          </p>
          <p>
            {t('public:about.story.desc_2')}
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary-500">{t('public:about.values.title')}</p>
          <h2 className="mt-3 text-2xl font-black text-gray-900 sm:text-3xl">{t('public:about.values.heading')}</h2>
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
          <p className="text-sm font-semibold uppercase tracking-widest text-primary-600">{t('public:about.edge.title')}</p>
          <h2 className="mt-3 text-2xl font-black text-gray-900 sm:text-3xl">
            {t('public:about.edge.heading')}
          </h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            {t('public:about.edge.desc')}
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
