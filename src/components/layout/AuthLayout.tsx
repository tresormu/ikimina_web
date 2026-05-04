import React from 'react';
import authHero from '../../assets/images/auth-hero.svg';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-100 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-8 lg:grid-cols-2">
        <div className="hidden overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-xl lg:block">
          <img
            src={authHero}
            alt="Community savings illustration"
            className="h-full w-full object-cover"
          />
        </div>

        <div>
          <div className="mx-auto w-full max-w-md">
            <div className="flex justify-center">
              <div className="flex items-center space-x-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-500">
                  <span className="text-xl font-bold text-white">I</span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900">IkiminaPass</h1>
              </div>
            </div>

            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Digital Rotating Savings Platform
            </h2>
            <p className="mt-3 text-center text-sm text-gray-600">
              Access your group, track contributions, and stay up to date in one secure place.
            </p>
          </div>

          <div className="mx-auto mt-8 w-full max-w-md">
            <div className="rounded-2xl border border-orange-100 bg-white px-4 py-8 shadow-lg sm:px-10">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
