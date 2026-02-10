import { LoginForm } from '@/components/auth/LoginForm';
import { Wand2 } from 'lucide-react';

export function LoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background overflow-hidden">
      {/* Ambient inkwell glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-magic/8 blur-[120px]" />
        <div className="absolute left-1/3 top-1/3 h-[300px] w-[300px] rounded-full bg-enchant/6 blur-[100px]" />
        <div className="absolute right-1/3 bottom-1/3 h-[200px] w-[200px] rounded-full bg-primary/8 blur-[80px]" />
      </div>

      <div className="relative w-full max-w-md space-y-8">
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-magic/30 bg-magic/10 shadow-[var(--shadow-glow-purple)]">
            <Wand2 className="h-8 w-8 text-enchant" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-magic via-primary to-enchant bg-clip-text text-transparent">
            Lorcana Collector
          </h1>
        </div>
        <div className="rounded-lg border border-magic/15 bg-card/90 p-6 backdrop-blur-sm shadow-[var(--shadow-glow-mixed)]">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
