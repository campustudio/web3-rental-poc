'use client';
import { useEffect } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { setRentedIds } from '@/features/properties/propertySlice';
import { getItem } from '@/lib/storage';

export default function RentedHydrator() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const hydrate = () => {
      try {
        const raw = getItem('rentedIds');
        const arr = raw ? JSON.parse(raw) : [];
        if (Array.isArray(arr)) {
          dispatch(setRentedIds(arr.filter((x: any) => typeof x === 'string')));
        }
      } catch {}
    };

    hydrate();

    const onStorage = (e: StorageEvent) => {
      if (e.key === 'rentedIds') hydrate();
    };
    const onVis = () => {
      if (document.visibilityState === 'visible') hydrate();
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', onStorage);
      document.addEventListener('visibilitychange', onVis);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('storage', onStorage);
        document.removeEventListener('visibilitychange', onVis);
      }
    };
  }, [dispatch]);

  return null;
}
