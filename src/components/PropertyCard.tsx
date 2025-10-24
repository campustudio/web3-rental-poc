'use client';
import { useRentPropertyMutation } from '@/features/properties/propertyApi';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setLastRentId } from '@/features/properties/propertySlice';

export default function PropertyCard({ property }: { property: any }) {
  const dispatch = useAppDispatch();
  const lastRentId = useAppSelector((s) => s.properties.lastRentId);
  const walletAddress = useAppSelector((s) => s.wallet.address);
  const [rentProperty, { isLoading }] = useRentPropertyMutation();
  const rented = lastRentId === property.id;
  return (
    <motion.div
      className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow p-4 transition ${
        rented ? 'opacity-70' : ''
      }`}
      whileHover={{ scale: 1.03 }}
    >
      {rented && (
        <span className="absolute right-3 top-3 select-none text-xs font-semibold bg-green-600 text-white px-2 py-1 rounded-md shadow">
          Rented
        </span>
      )}
      <img src={property.image} alt={property.name} className="rounded-xl mb-2 w-full h-40 object-cover" />
      <h3 className="font-semibold">{property.name}</h3>
      <p className="text-sm text-gray-500">{property.location}</p>
      <p className="text-sm text-gray-500 mt-1">Rent: {property.price} ETH</p>
      <button
        onClick={async () => {
          try {
            if (!walletAddress) {
              alert('Please connect your wallet first.');
              return;
            }
            const res = await rentProperty(property).unwrap();
            if (res?.success) dispatch(setLastRentId(property.id));
          } catch (e: any) {
            alert(e?.error || e?.message || 'Rent failed');
          }
        }}
        disabled={isLoading || rented}
        className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-60"
      >
        {rented ? 'Rented!' : isLoading ? 'Processing...' : 'Rent'}
      </button>
    </motion.div>
  );
}
