'use client';

// import type { Metadata } from 'next';
import '../globals.css';
import NavigationBar from '@/app/components/layout/NavigationBar';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/supabase/supabaseClient';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: userData } = useQuery({
    queryKey: ['userData'],
    queryFn: async () => {
      const { data } = await supabase.auth.getUser();
      return data.user;
    },
  });

  return (
    <section>
      <NavigationBar isLogin={!!userData} />
      <div className="flex flex-col justify-between bg-yellow-50 h-full">
        <div className="px-6 pb-6 pt-2 overflow-y-hidden">{children}</div>
      </div>
    </section>
  );
}
