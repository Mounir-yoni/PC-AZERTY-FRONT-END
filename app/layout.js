import './globals.css';
import { Inter } from 'next/font/google';
import NotificationSystem from '@/components/NotificationSystem';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'AZERTY - Premium Computer Store',
  description: 'Your trusted destination for computers, components, and tech accessories',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <NotificationSystem />
      </body>
    </html>
  );
}