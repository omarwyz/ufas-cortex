import { redirect } from 'next/navigation';

import { Sidebar } from '@/components/layout';
import { createClient } from '@/lib/supabase/server';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="flex min-h-screen w-full">
      <aside className="fixed inset-y-0 left-0 z-50 hidden lg:block">
        <Sidebar />
      </aside>

      <div className="flex flex-1 flex-col lg:pl-64">
        <main className="flex-1 bg-gray-50 dark:bg-gray-950">
          <div className="mx-auto max-w-7xl p-4 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
