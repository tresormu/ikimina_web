import React, { useState } from 'react';
import { Mail, Phone, Building2, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import PageHeader from '../../components/public/PageHeader';

const ContactPage: React.FC = () => {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <PageHeader
        title={t('public:contact.title', 'Contact Us')}
        subtitle={t('public:contact.subtitle', 'Talk to our team about group onboarding, support, or financial institution partnerships.')}
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">

          {/* Contact Form */}
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-black text-gray-900">{t('public:contact.form.title', 'Send us a message')}</h2>
            <p className="mt-1 text-sm text-gray-500">{t('public:contact.form.desc', 'We typically respond within one business day.')}</p>

            {submitted ? (
              <div className="mt-8 rounded-xl bg-primary-50 border border-primary-200 p-6 text-center">
                <div className="flex justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
                    <Send size={22} className="text-primary-600" />
                  </div>
                </div>
                <h3 className="mt-3 font-bold text-primary-900">{t('public:contact.form.success_title')}</h3>
                <p className="mt-1 text-sm text-primary-700">{t('public:contact.form.success_message')}</p>
              </div>
            ) : (
              <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">{t('public:contact.form.name')}</label>
                    <input
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder={t('public:contact.form.name_placeholder')}
                      className="mt-1.5 w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">{t('public:contact.form.email')}</label>
                    <input
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder={t('public:contact.form.email_placeholder')}
                      className="mt-1.5 w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">{t('public:contact.form.subject')}</label>
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="mt-1.5 w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
                  >
                    <option value="">{t('public:contact.form.subject_placeholder')}</option>
                    <option value="group">{t('public:contact.form.group_option')}</option>
                    <option value="support">{t('public:contact.form.support_option')}</option>
                    <option value="financial_institution">{t('public:contact.form.financial_option')}</option>
                    <option value="other">{t('public:contact.form.other_option')}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">{t('public:contact.form.message')}</label>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    value={form.message}
                    onChange={handleChange}
                    placeholder={t('public:contact.form.message_placeholder')}
                    className="mt-1.5 w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary-500 px-6 py-3 font-bold text-white hover:bg-primary-600 active:bg-primary-700 transition-colors"
                >
                  <Send size={16} /> {t('public:contact.form.send')}
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-5">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50">
                  <Mail size={20} className="text-primary-600" />
                </div>
                <h3 className="font-bold text-gray-900">{t('public:contact.info.email_title')}</h3>
              </div>
              <p className="mt-3 text-gray-600 text-sm">{t('public:contact.info.email_desc')}</p>
              <a href="mailto:support@ikiminapass.com" className="mt-1 block font-semibold text-primary-600 hover:text-primary-700 transition-colors">
                {t('public:contact.info.email_address')}
              </a>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50">
                  <Phone size={20} className="text-primary-600" />
                </div>
                <h3 className="font-bold text-gray-900">{t('public:contact.info.phone_title')}</h3>
              </div>
              <p className="mt-3 text-gray-600 text-sm">{t('public:contact.info.phone_desc')}</p>
              <a href="tel:+250700000000" className="mt-1 block font-semibold text-primary-600 hover:text-primary-700 transition-colors">
                {t('public:contact.info.phone_number')}
              </a>
            </div>

            <div className="rounded-2xl border border-primary-200 bg-primary-50 p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100">
                  <Building2 size={20} className="text-primary-700" />
                </div>
                <h3 className="font-bold text-primary-900">{t('public:contact.info.partners_title')}</h3>
              </div>
              <p className="mt-3 text-primary-800 text-sm leading-relaxed">
                {t('public:contact.info.partners_desc')}
              </p>
              <a href="mailto:partners@ikiminapass.com" className="mt-3 block font-semibold text-primary-700 hover:text-primary-800 transition-colors text-sm">
                {t('public:contact.info.partners_email')} →
              </a>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="font-bold text-gray-900">{t('public:contact.info.office_title')}</h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                {t('public:contact.info.office_address')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
