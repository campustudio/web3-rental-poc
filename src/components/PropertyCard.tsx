'use client';
import { useRentPropertyMutation, useEndRentPropertyMutation } from '@/features/properties/propertyApi';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addRentedId, removeRentedId } from '@/features/properties/propertySlice';
import { useToast } from '@/components/ui/ToastProvider';

export default function PropertyCard({ property }: { property: any }) {
  const dispatch = useAppDispatch();
  const rentedIds = useAppSelector((s) => s.properties.rentedIds);
  const walletAddress = useAppSelector((s) => s.wallet.address);
  const [rentProperty, { isLoading }] = useRentPropertyMutation();
  const [endRent, { isLoading: ending }] = useEndRentPropertyMutation();
  const { show } = useToast();
  const rented = rentedIds?.includes(property.id);
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
      <div className="mt-3 flex gap-2">
        <button
          onClick={async () => {
            try {
              if (!walletAddress) {
                show({ type: 'warning', title: 'Wallet', message: 'Please connect your wallet first.' });
                return;
              }
              const res = await rentProperty(property).unwrap();
              if (res?.success) {
                dispatch(addRentedId(property.id));
                show({ type: 'success', title: 'Success', message: 'Property rented.' });
              }
            } catch (e: any) {
              const msg = e?.error || e?.message || 'Rent failed';
              show({ type: 'error', title: 'Rent', message: String(msg) });
            }
          }}
          disabled={isLoading || rented}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-60"
        >
          {rented ? 'Rented' : isLoading ? 'Processing...' : 'Rent'}
        </button>
        {rented && (
          <button
            onClick={async () => {
              try {
                const res = await endRent({ id: property.id }).unwrap();
                if (res?.success) {
                  dispatch(removeRentedId(property.id));
                  show({ type: 'success', title: 'Ended', message: 'Rent ended.' });
                }
              } catch (e: any) {
                const msg = e?.error || e?.message || 'End rent failed';
                show({ type: 'error', title: 'Rent', message: String(msg) });
              }
            }}
            disabled={ending}
            className="bg-gray-500 text-white px-3 py-2 rounded-lg disabled:opacity-60"
          >
            {ending ? 'Ending...' : 'End Rent'}
          </button>
        )}
      </div>
    </motion.div>
  );
}
