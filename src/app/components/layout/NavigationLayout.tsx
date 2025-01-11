import type { ReactNode } from 'react';
import NavigationBar from '@/app/components/layout/NavigationBar';

type MainLayoutProps = {
  children: ReactNode;
};

export default function NavigationLayout({ children }: MainLayoutProps) {
  return (
    <div>
      <NavigationBar />
      <div className="flex flex-col justify-between bg-yellow-50 h-full">
        <div className="px-6 pb-6 pt-2 overflow-y-hidden">{children}</div>
      </div>
    </div>
  );
}
