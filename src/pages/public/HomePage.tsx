import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck, Smartphone, TrendingUp, Users,
  ArrowRight, CheckCircle, Lock, Eye, Award, AlertTriangle,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import heroIllustration from '../../assets/images/hero-illustration.svg';
import creditPassport from '../../assets/images/credit-passport.svg';

const HomePage: React.FC = () => {
  const { t } = useTranslation();

  const stats = [
    { value: '5.9M', label: t('public:home.stats.rwandans_in_groups') },
    { value: '82.5%', label: 'Working in the informal sector' },
    { value: '10%/mo', label: 'Charged by loan sharks' },
    { value: '0', label: 'Formal credit records for most members' },
  ];

  const solutions = [
    {
      icon: <Users size={22} className="text-primary-600" />,
      title: t('public:home.solutions.digital_management.title'),
      desc: t('public:home.solutions.digital_management.desc'),
    },
    {
      icon: <Smartphone size={22} className="text-primary-600" />,
      title: t('public:home.solutions.momo_payments.title'),
      desc: t('public:home.solutions.momo_payments.desc'),
    },
    {
      icon: <TrendingUp size={22} className="text-primary-600" />,
      title: t('public:home.solutions.credit_score.title'),
      desc: t('public:home.solutions.credit_score.desc'),
    },
    {
      icon: <ShieldCheck size={22} className="text-primary-600" />,
      title: t('public:home.solutions.fund_protection.title'),
      desc: t('public:home.solutions.fund_protection.desc'),
    },
  ];

  const howSteps = t('public:home.how_it_works.steps', { returnObjects: true }) as string[];

  const problems = t('public:home.problems.items', { returnObjects: true }) as string[];

  const trustPoints = [
    {
      icon: <Lock size={20} className="text-primary-600" />,
      title: t('public:home.trust.no_cash_handling.title'),
      desc: t('public:home.trust.no_cash_handling.desc'),
    },
    {
      icon: <Eye size={20} className="text-primary-600" />,
      title: t('public:home.trust.every_member_sees.title'),
      desc: t('public:home.trust.every_member_sees.desc'),
    },
    {
      icon: <ShieldCheck size={20} className="text-primary-600" />,
      title: t('public:home.trust.immutable_records.title'),
      desc: t('public:home.trust.immutable_records.desc'),
    },
    {
      icon: <Award size={20} className="text-primary-600" />,
      title: t('public:home.trust.treasurers_rewarded.title'),
      desc: t('public:home.trust.treasurers_rewarded.desc'),
    },
  ];
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gray-900 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-700/30 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-400">
                {t('public:home.hero.tagline')}
              </p>
              <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
                {t('public:home.hero.title').split('Credit Superpower').map((part, i, arr) => (
                  <span key={i}>
                    {part}
                    {i < arr.length - 1 && <span className="text-primary-400">Credit Superpower</span>}
                  </span>
                ))}
              </h1>
              <p className="mt-6 text-lg text-gray-300 leading-relaxed">
                {t('public:home.hero.description')}
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary-500 px-7 py-3.5 font-bold text-white shadow-lg hover:bg-primary-600 active:bg-primary-700 transition-colors"
                >
                  {t('public:home.hero.get_started')} <ArrowRight size={18} />
                </Link>
                <Link
                  to="/how-it-works"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-7 py-3.5 font-semibold hover:bg-white/10 transition-colors"
                >
                  {t('public:home.hero.see_how_it_works')}
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
            <p className="text-sm font-semibold uppercase tracking-widest text-primary-500">{t('public:home.who_we_are.title')}</p>
            <h2 className="mt-3 text-3xl font-black text-gray-900 sm:text-4xl">
              {t('public:home.who_we_are.subtitle')}
            </h2>
            <p className="mt-5 text-lg text-gray-600 leading-relaxed">
              {t('public:home.who_we_are.description')}
            </p>
            <p className="mt-4 text-gray-600 leading-relaxed">
              {t('public:home.who_we_are.team_description')}
            </p>
            <Link
              to="/about"
              className="mt-6 inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
            >
              {t('public:home.who_we_are.learn_more')} <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: '5.9M', label: t('public:home.stats.rwandans_in_groups') },
              { value: '3 months', label: t('public:home.stats.to_earn_credit') },
              { value: '0 – 850', label: t('public:home.stats.score_range') },
              { value: '35%', label: t('public:home.stats.treasurer_revenue') },
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
              <p className="text-sm font-semibold uppercase tracking-widest text-primary-500">{t('public:home.problem_solution.what_we_solve')}</p>
              <h2 className="mt-3 text-3xl font-black text-gray-900 sm:text-4xl">
                {t('public:home.problem_solution.subtitle')}
              </h2>
              <p className="mt-5 text-gray-600 leading-relaxed">
                {t('public:home.problem_solution.description')}
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
              <p className="text-sm font-semibold uppercase tracking-widest text-primary-600">{t('public:home.problem_solution.our_solution')}</p>
              <h3 className="mt-3 text-2xl font-black text-gray-900">{t('public:home.problem_solution.solution_title')}</h3>
              <ul className="mt-6 space-y-4">
                {(t('public:home.problem_solution.solution_points', { returnObjects: true }) as string[]).map((point: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700">
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
            <p className="text-sm font-semibold uppercase tracking-widest text-primary-500">{t('public:home.credit_passport.title')}</p>
            <h2 className="mt-3 text-3xl font-black text-gray-900 sm:text-4xl">
              {t('public:home.credit_passport.subtitle')}
            </h2>
            <p className="mt-5 text-gray-600 leading-relaxed">
              {t('public:home.credit_passport.description')}
            </p>
            <div className="mt-6 grid grid-cols-3 gap-4">
              {[
                { value: '3 months', label: t('public:home.credit_passport.minimum_history') },
                { value: '0 – 850', label: t('public:home.credit_passport.score_range') },
                { value: 'MoMo', label: t('public:home.credit_passport.backed_by') },
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
              {t('public:home.credit_passport.how_score_calculated')} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Solutions grid */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary-500">{t('public:home.solutions.title')}</p>
            <h2 className="mt-3 text-3xl font-black text-gray-900 sm:text-4xl">{t('public:home.solutions.subtitle')}</h2>
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
            <p className="text-sm font-semibold uppercase tracking-widest text-primary-400">{t('public:home.trust.title')}</p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              {t('public:home.trust.subtitle')}
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-gray-400 leading-relaxed">
              {t('public:home.trust.description')}
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
          <p className="text-sm font-semibold uppercase tracking-widest text-primary-500">{t('public:home.journey.title')}</p>
          <h2 className="mt-3 text-3xl font-black text-gray-900 sm:text-4xl">{t('public:home.journey.subtitle')}</h2>
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
          <h2 className="text-3xl font-black text-white sm:text-4xl">{t('public:home.cta_banner.title')}</h2>
          <p className="mt-4 text-lg text-primary-100">
            {t('public:home.cta_banner.description')}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/register"
              className="rounded-xl bg-white px-8 py-3.5 font-bold text-primary-700 hover:bg-primary-50 transition-colors"
            >
              {t('public:home.cta_banner.register_group')}
            </Link>
            <Link
              to="/contact"
              className="rounded-xl border border-white/30 px-8 py-3.5 font-semibold text-white hover:bg-white/10 transition-colors"
            >
              {t('public:home.cta_banner.talk_to_us')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
