import './globals.css';
import type { Metadata } from 'next';
import Providers from '@/store/Providers';
import ToastProvider from '@/components/ui/ToastProvider';

export const metadata: Metadata = {
  title: 'Upland Web3 Rental Demo',
  description: 'Web3 Real Estate Rental Platform Demo',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <ToastProvider>
            <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
              {children}
            </div>
          </ToastProvider>
        </Providers>
      </body>
    </html>
  );
}
