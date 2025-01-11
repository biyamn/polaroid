import NavigationBar from '@/app/components/layout/NavigationBar';

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavigationBar />
      <div className="flex flex-col justify-between bg-yellow-50 h-full">
        <div className="px-6 pb-6 pt-2 overflow-y-hidden">{children}</div>
      </div>
    </>
  );
}
