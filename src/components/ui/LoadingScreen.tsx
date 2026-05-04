import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ message = 'Loading IkiminaPass...' }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress from 0 → 90 quickly, then wait for parent to unmount
    const steps = [20, 45, 65, 80, 90];
    const timers: ReturnType<typeof setTimeout>[] = [];
    steps.forEach((target, i) => {
      timers.push(setTimeout(() => setProgress(target), i * 140));
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white px-4">
      {/* Logo */}
      <div className="flex flex-col items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-500 text-white font-black text-xl shadow-lg">
          IP
        </div>
        <div className="text-center">
          <p className="text-lg font-black text-gray-900">IkiminaPass</p>
          <p className="text-sm text-gray-500 mt-0.5">{message}</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-8 w-48 h-1.5 rounded-full bg-gray-100 overflow-hidden">
        <div
          className="h-full rounded-full bg-primary-500 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Dots */}
      <div className="mt-6 flex items-center gap-1.5">
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

export default LoadingScreen;
