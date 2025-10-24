'use client';
import { useEffect } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { setRentedIds } from '@/features/properties/propertySlice';

export default function RentedHydrator() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    try {
      const raw = typeof window !== 'undefined' ? localStorage.getItem('rentedIds') : null;
      const arr = raw ? JSON.parse(raw) : [];
      if (Array.isArray(arr)) {
        dispatch(setRentedIds(arr.filter((x: any) => typeof x === 'string')));
      }
    } catch {}
  }, [dispatch]);

  return null;
}
