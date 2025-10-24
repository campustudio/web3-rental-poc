'use client';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleTheme } from '@/features/theme/themeSlice';
import useMounted from '@/hooks/useMounted';

export default function ThemeSwitch() {
  const theme = useAppSelector((s) => s.theme.theme);
  const dispatch = useAppDispatch();
  const mounted = useMounted();

  if (!mounted) {
    return (
      <div
        className="relative w-16 h-8 rounded-full bg-gray-200 dark:bg-gray-700 opacity-0"
        aria-hidden
      />
    );
  }

  const isLight = theme === 'light';

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isLight}
      onClick={() => dispatch(toggleTheme())}
      title={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
      className="relative w-16 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center transition-colors"
    >
      {/* Sun (left) - solid big disk + chunky rays (gold) */}
      <svg
        aria-hidden="true"
        className={`absolute left-1 w-7 h-7 transition-opacity duration-200 ${isLight ? 'opacity-100 text-amber-500' : 'opacity-0 text-amber-500'}`}
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        {/* center disk larger */}
        <circle cx="12" cy="12" r="6.5" />
        {/* chunky rectangular rays */}
        <rect x="11" y="1.5" width="2" height="4" rx="1" />
        <rect x="11" y="18.5" width="2" height="4" rx="1" />
        <rect x="1.5" y="11" width="4" height="2" rx="1" />
        <rect x="18.5" y="11" width="4" height="2" rx="1" />
        <rect x="4.2" y="4.2" width="3.5" height="2" rx="1" transform="rotate(45 4.2 4.2)" />
        <rect x="16.3" y="16.3" width="3.5" height="2" rx="1" transform="rotate(45 16.3 16.3)" />
        <rect x="4.2" y="17.8" width="3.5" height="2" rx="1" transform="rotate(-45 4.2 17.8)" />
        <rect x="16.3" y="5.7" width="3.5" height="2" rx="1" transform="rotate(-45 16.3 5.7)" />
      </svg>
      {/* Moon (right) */}
      <svg
        aria-hidden="true"
        className={`absolute right-1 w-6 h-6 transition-opacity duration-200 ${isLight ? 'opacity-0 text-indigo-400' : 'opacity-100 text-indigo-400'}`}
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
      </svg>
      {/* Thumb */}
      <span
        className={
          'absolute top-1 w-6 h-6 rounded-full bg-white shadow transition-transform ' +
          (isLight ? 'translate-x-9' : 'translate-x-1')
        }
      />
    </button>
  );
}
