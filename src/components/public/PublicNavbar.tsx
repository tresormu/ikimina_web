import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../ui/LanguageSwitcher';

const PublicNavbar: React.FC = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { label: t('navigation.home'), to: '/' },
    { label: t('navigation.how_it_works'), to: '/how-it-works' },
    { label: t('navigation.services'), to: '/services' },
    { label: t('navigation.about'), to: '/about' },
    { label: t('navigation.pricing'), to: '/pricing' },
    { label: t('navigation.contact'), to: '/contact' },
  ];

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-semibold transition-colors ${
      isActive ? 'text-primary-600' : 'text-gray-600 hover:text-gray-900'
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-500 text-white font-black text-sm shadow-sm">
            IP
          </div>
          <span className="text-lg font-black text-gray-900">{t('app.name')}</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher />
          <Link
            to="/login"
            className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:border-primary-300 hover:text-primary-600 transition-colors"
          >
            {t('navigation.login')}
          </Link>
          <Link
            to="/register"
            className="rounded-xl bg-primary-500 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-600 active:bg-primary-700 transition-colors shadow-sm"
          >
            {t('navigation.register')}
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 md:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-gray-100 bg-white px-4 pb-5 pt-3 md:hidden">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-2 border-t border-gray-100 pt-4">
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="rounded-xl border border-gray-200 px-4 py-2.5 text-center text-sm font-semibold text-gray-700"
            >
              {t('navigation.login')}
            </Link>
            <Link
              to="/register"
              onClick={() => setIsOpen(false)}
              className="rounded-xl bg-primary-500 px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-primary-600"
            >
              {t('navigation.register')}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default PublicNavbar;
