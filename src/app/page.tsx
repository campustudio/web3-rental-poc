'use client';
import WalletButton from '@/components/WalletButton';
import PropertyCard from '@/components/PropertyCard';
import { useGetPropertiesQuery } from '@/features/properties/propertyApi';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import ThemeSwitch from '@/components/ThemeSwitch';
import useMounted from '@/hooks/useMounted';

export default function HomePage() {
  const { data } = useGetPropertiesQuery();
  const theme = useAppSelector((s) => s.theme.theme);
  const dispatch = useAppDispatch();
  const mounted = useMounted();
  const themeLabel = !mounted ? '' : theme === 'light' ? 'Light Mode' : 'Dark Mode';

  return (
    <main className="container mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Upland Web3 Rental Demo</h1>
        <div className="flex items-center gap-3">
          <ThemeSwitch />
          <span className="text-sm select-none hidden sm:inline">{themeLabel}</span>
          <WalletButton />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.properties?.map((p: any) => (
          <PropertyCard key={p.id} property={p} />
        ))}
      </div>
    </main>
  );
}
