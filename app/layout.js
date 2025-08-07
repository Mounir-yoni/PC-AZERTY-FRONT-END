import './globals.css';
import { Inter } from 'next/font/google';
import NotificationSystem from '@/components/NotificationSystem';
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Azerty Computer - أفضل متجر حواسيب',
  description: 'اكتشف أحدث الحواسيب ومكوناتها في الجزائر.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.ico', type: 'image/x-icon' },
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'Azerty Computer',
    description: 'أفضل متجر حواسيب في الجزائر.',
    url: '/',
    siteName: 'Azerty Computer',
    images: [
      {
        url: 'http://localhost:3000/_next/static/media/Z2.492ff34d.png',
        width: 1200,
        height: 630,
        alt: 'صورة معاينة الموقع',
      },
    ],
    locale: 'ar_DZ',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        {children}
        <NotificationSystem />
      </body>
    </html>
  );
}