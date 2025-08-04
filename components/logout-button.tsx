'use client';

import { createBrowserSupabaseClient } from '@/utils/supabase/client';
import { Button } from '@material-tailwind/react';

export default function LogoutButton() {
  const supabase = createBrowserSupabaseClient();

  return (
    <Button
      onClick={async () => {
        supabase.auth.signOut();
      }}
      color="red"
    >
      로그아웃
    </Button>
  );
}
