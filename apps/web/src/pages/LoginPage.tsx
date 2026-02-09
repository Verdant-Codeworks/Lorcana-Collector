import { LoginForm } from '@/components/auth/LoginForm';
import { Sparkles } from 'lucide-react';

export function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="space-y-8">
        <div className="flex justify-center">
          <Sparkles className="h-10 w-10 text-primary" />
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
