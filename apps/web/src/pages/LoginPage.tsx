import { LoginForm } from '@/components/auth/LoginForm';
import { Footer } from '@/components/layout/Footer';
import { SEO } from '@/components/seo/SEO';

export function LoginPage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background overflow-hidden">
      <SEO
        title="Sign In"
        description="Sign in to Illumineer Vault to manage your Disney Lorcana card collection."
        canonicalUrl="/login"
        noindex
      />
      {/* Ambient inkwell glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-magic/8 blur-[120px]" />
        <div className="absolute left-1/3 top-1/3 h-[300px] w-[300px] rounded-full bg-enchant/6 blur-[100px]" />
        <div className="absolute right-1/3 bottom-1/3 h-[200px] w-[200px] rounded-full bg-primary/8 blur-[80px]" />
      </div>

      <div className="relative flex flex-1 items-center justify-center">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col items-center gap-3">
            <img src="/logo.svg" alt="Illumineer Vault" className="h-10" />
          </div>
          <div className="rounded-lg border border-magic/15 bg-card/90 p-6 backdrop-blur-sm shadow-[var(--shadow-glow-mixed)]">
            <LoginForm />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
