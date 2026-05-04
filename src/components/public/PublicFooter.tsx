import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Linkedin, Instagram, Twitter } from 'lucide-react';

const footerLinks = [
  { label: 'Home', to: '/' },
  { label: 'How It Works', to: '/how-it-works' },
  { label: 'Services', to: '/services' },
  { label: 'About', to: '/about' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Contact', to: '/contact' },
];

const PublicFooter: React.FC = () => {
  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-500 text-white font-black text-sm">
                IP
              </div>
              <span className="text-lg font-black text-white">IkiminaPass</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Digitizing Rwanda's ikimina savings discipline into trusted, bankable credit power.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white">Explore</h3>
            <ul className="mt-4 space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-gray-400 hover:text-primary-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white">Legal</h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-primary-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-primary-400 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <button className="text-sm text-gray-400 hover:text-primary-400 transition-colors text-left">
                  🌐 English / Kinyarwanda
                </button>
              </li>
            </ul>
          </div>

          {/* Social + Contact */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white">Follow Us</h3>
            <div className="mt-4 flex items-center gap-3">
              {[
                { icon: <Facebook size={16} />, label: 'Facebook' },
                { icon: <Twitter size={16} />, label: 'Twitter' },
                { icon: <Instagram size={16} />, label: 'Instagram' },
                { icon: <Linkedin size={16} />, label: 'LinkedIn' },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-800 text-gray-400 hover:bg-primary-500 hover:text-white transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
            <div className="mt-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-white">Contact</h3>
              <p className="mt-2 text-sm text-gray-400">support@ikiminapass.com</p>
              <p className="text-sm text-gray-400">+250 7XX XXX XXX</p>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-6 flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} IkiminaPass. All rights reserved.
          </p>
          <p className="text-xs text-gray-500">Made with ❤️ in Kigali, Rwanda</p>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;
