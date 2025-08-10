import './globals.css';
import { Inter } from 'next/font/google';
import NotificationSystem from '@/components/NotificationSystem';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Script from 'next/script';

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

export default async function LocaleLayout({ children, params }) {
  const { locale } = params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />

        {/* Meta Pixel Code */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1818186065718847');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1818186065718847&ev=PageView&noscript=1"
          />
        </noscript>
        {/* End Meta Pixel Code */}
      </head>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale}>
          {children}
          <NotificationSystem />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
