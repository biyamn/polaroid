'use client';

import NavigationBar from '@/app/components/layout/NavigationBar';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/supabase/supabaseClient';

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: userData } = useQuery({
    queryKey: ['userData'],
    queryFn: async () => {
      const { data } = await supabase.auth.getUser();
      return data.user;
    },
  });

  return (
    <section className="h-full">
      <NavigationBar isLogin={!!userData} />
      <div className="flex flex-col justify-between bg-yellow-50 h-full">
        <div className="px-6 pb-6 pt-2 overflow-y-hidden">{children}</div>
      </div>
    </section>
  );
}
