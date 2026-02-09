import { RegisterForm } from '@/components/auth/RegisterForm';
import { Sparkles } from 'lucide-react';

export function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="space-y-8">
        <div className="flex justify-center">
          <Sparkles className="h-10 w-10 text-primary" />
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}
