'use client';

// import type { Metadata } from 'next';
import '../globals.css';
import NavigationBar from '@/app/components/layout/NavigationBar';
import localFont from 'next/font/local';

const pencilFont = localFont({
  src: '../fonts/Hakgyoansim Geurimilgi TTF R.ttf',
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <NavigationBar />
      <div className="flex flex-col justify-between bg-yellow-50 h-full">
        <div className="px-6 pb-6 pt-2 overflow-y-hidden">{children}</div>
      </div>
    </section>
  );
}
