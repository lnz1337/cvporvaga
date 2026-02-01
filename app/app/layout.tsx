import Link from 'next/link';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LogOut, Coins } from 'lucide-react';

async function AppNavbar() {
  const session = await getSession();

  const handleLogout = async () => {
    'use server';
    await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/logout`, {
      method: 'POST',
    });
    redirect('/login');
  };

  return (
    <nav className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/app" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
              CvPorVaga.
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg">
              <Coins className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-blue-900">
                {session?.credits || 0} {session?.credits === 1 ? 'crédito' : 'créditos'}
              </span>
            </div>
            
            <Link href="/pricing">
              <Button size="sm" variant="outline">
                Comprar créditos
              </Button>
            </Link>

            <form action={handleLogout}>
              <Button size="sm" variant="ghost">
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AppNavbar />
      <main>{children}</main>
    </div>
  );
}
