import NavigationBar from '@/app/components/layout/NavigationBar';
import localFont from 'next/font/local';

const pencilFont = localFont({
  src: '../fonts/Hakgyoansim Geurimilgi TTF R.ttf',
  display: 'swap',
});

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="h-full">
      <body
        className={`h-dvh mx-auto w-96 ${pencilFont.className} flex flex-col`}
      >
        <NavigationBar />
        <div className="flex flex-col justify-between bg-yellow-50 h-full">
          <div className="px-6 pb-6 pt-2 overflow-y-hidden">{children}</div>
        </div>
      </body>
    </html>
  );
}
