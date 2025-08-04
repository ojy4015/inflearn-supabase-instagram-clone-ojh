'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { createBrowserSupabaseClient } from '@/utils/supabase/client';

export default function AuthProvider({ accessToken, children }) {
  //서베에 갖고 있는 accessToken
  const supabase = createBrowserSupabaseClient();
  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription: authListner },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.access_token !== accessToken) {
        router.refresh();
      }
    });

    // 화면이 닫힐때
    return () => {
      authListner.unsubscribe();
    };
  }, [accessToken, supabase, router]);

  return children;
}
