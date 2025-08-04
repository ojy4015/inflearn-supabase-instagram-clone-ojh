import Sidebar from '@/components/sidebar';

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full h-screen flex">
      <div className="w-[10%]">
        <Sidebar />
      </div>
      <div className="w-[90%] flex items-center justify-center">{children}</div>
    </main>
  );
}
