import './globals.css';
import type { Metadata } from 'next';
import Providers from '@/store/Providers';
import ToastProvider from '@/components/ui/ToastProvider';
import WalletHydrator from '@/components/WalletHydrator';
import ThemeHydrator from '@/components/ThemeHydrator';
import RentedHydrator from '@/components/RentedHydrator';

export const metadata: Metadata = {
  title: 'Upland Web3 Rental Demo',
  description: 'Web3 Real Estate Rental Platform Demo',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => { try { var s = localStorage.getItem('theme'); var d = s ? s === 'dark' : window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches; document.documentElement.dataset.theme = d ? 'dark' : 'light'; } catch(e){} })();`,
          }}
        />
      </head>
      <body>
        <Providers>
          <ToastProvider>
            <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
              <ThemeHydrator />
              <WalletHydrator />
              <RentedHydrator />
              {children}
            </div>
          </ToastProvider>
        </Providers>
      </body>
    </html>
  );
}
