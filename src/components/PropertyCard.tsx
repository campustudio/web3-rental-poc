'use client';
import { useRentPropertyMutation } from '@/features/properties/propertyApi';
import { motion } from 'framer-motion';

export default function PropertyCard({ property }: { property: any }) {
  const [rentProperty, { isLoading }] = useRentPropertyMutation();
  return (
    <motion.div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4 transition" whileHover={{ scale: 1.03 }}>
      <img src={property.image} alt={property.name} className="rounded-xl mb-2 w-full h-40 object-cover" />
      <h3 className="font-semibold">{property.name}</h3>
      <p className="text-sm text-gray-500">{property.location}</p>
      <p className="text-sm text-gray-500 mt-1">Rent: {property.price} ETH</p>
      <button onClick={() => rentProperty(property)} disabled={isLoading} className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-60">
        {isLoading ? 'Processing...' : 'Rent'}
      </button>
    </motion.div>
  );
}
