import LogoutButton from '@/components/logout-button';
import { createServerSupabaseClient } from '@/utils/supabase/server';

export const metadata = {
  title: 'Inflearngram',
  description: 'Instagram clone with Next.js and Tailwind CSS',
};

export default async function Home() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <div>
      <main className="w-full h-screen flex flex-col gap-2 items-center justify-center sm:items-start">
        <h1 className="text-4xl font-bold">
          Welcome {session?.user?.email?.split('@')?.[0]}!
        </h1>
        <LogoutButton />
      </main>
    </div>
  );
}
