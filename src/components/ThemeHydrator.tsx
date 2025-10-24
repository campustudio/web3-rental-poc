'use client';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setTheme } from '@/features/theme/themeSlice';

export default function ThemeHydrator() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((s) => s.theme.theme);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    const prefersDark = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const toApply = stored ? (stored === 'dark' ? 'dark' : 'light') : prefersDark ? 'dark' : 'light';
    if (theme !== toApply) {
      dispatch(setTheme(toApply));
    } else if (typeof document !== 'undefined') {
      document.documentElement.dataset.theme = toApply;
    }
  }, [dispatch]);

  return null;
}
