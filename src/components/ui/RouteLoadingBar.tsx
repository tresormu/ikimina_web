import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const RouteLoadingBar: React.FC = () => {
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Show splash immediately
    setVisible(true);
    setFading(false);
    setProgress(0);

    const t1 = setTimeout(() => setProgress(40), 100);
    const t2 = setTimeout(() => setProgress(70), 500);
    const t3 = setTimeout(() => setProgress(90), 1000);
    const t4 = setTimeout(() => setProgress(100), 1700);
    // Start fade out at 1.8s
    const t5 = setTimeout(() => setFading(true), 1800);
    // Fully hide at 2s
    const t6 = setTimeout(() => {
      setVisible(false);
      setFading(false);
      setProgress(0);
    }, 2000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
    };
  }, [location.pathname]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white transition-opacity duration-200"
      style={{ opacity: fading ? 0 : 1 }}
    >
      {/* Logo */}
      <div className="flex flex-col items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-500 text-white font-black text-xl shadow-lg">
          IP
        </div>
        <div className="text-center">
          <p className="text-lg font-black text-gray-900">IkiminaPass</p>
          <p className="text-sm text-gray-400 mt-0.5">Loading page...</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-8 w-48 h-1.5 rounded-full bg-gray-100 overflow-hidden">
        <div
          className="h-full rounded-full bg-primary-500 transition-all ease-out"
          style={{
            width: `${progress}%`,
            transitionDuration: '300ms',
          }}
        />
      </div>

      {/* Bouncing dots */}
      <div className="mt-5 flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-2 w-2 rounded-full bg-primary-400 animate-bounce"
            style={{ animationDelay: `${i * 150}ms` }}
          />
        ))}
      </div>
    </div>
  );
};

export default RouteLoadingBar;
