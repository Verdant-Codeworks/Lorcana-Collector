import { Outlet } from 'react-router';
import { Navbar } from './Navbar';

export function AppShell() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
