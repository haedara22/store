import type { Metadata } from 'next';
import { Cairo } from 'next/font/google';
import './globals.css';
import { STORE_NAME, STORE_DESCRIPTION } from '@/lib/constants';

const cairo = Cairo({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-cairo',
});

export const metadata: Metadata = {
  title: {
    default: `${STORE_NAME} - متجر إلكتروني لإكسسوارات الموبايلات والأجهزة الإلكترونية`,
    template: `%s | ${STORE_NAME}`,
  },
  description: STORE_DESCRIPTION,
  keywords: [
    'إكسسوارات موبايل',
    'شواحن',
    'كابلات',
    'سماعات',
    'مضخمات صوت',
    'أجهزة إلكترونية',
    'الحامد للتجارة',
    'سوريا',
  ],
  authors: [{ name: STORE_NAME }],
  creator: STORE_NAME,
  publisher: STORE_NAME,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'ar_SY',
    url: '/',
    title: STORE_NAME,
    description: STORE_DESCRIPTION,
    siteName: STORE_NAME,
  },
  twitter: {
    card: 'summary_large_image',
    title: STORE_NAME,
    description: STORE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
