import React from 'react';
import { Outlet } from 'react-router-dom';
import PublicNavbar from '../public/PublicNavbar';
import PublicFooter from '../public/PublicFooter';

const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <PublicNavbar />
      <main>
        <Outlet />
      </main>
      <PublicFooter />
    </div>
  );
};

export default PublicLayout;
