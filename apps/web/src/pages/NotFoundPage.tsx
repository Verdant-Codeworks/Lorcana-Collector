import { Link } from 'react-router';
import { SEO } from '@/components/seo/SEO';
import { Footer } from '@/components/layout/Footer';

export function NotFoundPage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background overflow-hidden">
      <SEO title="Page Not Found" noindex />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-magic/8 blur-[120px]" />
      </div>

      <div className="relative flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-md space-y-6 text-center">
          <h1 className="text-6xl font-bold text-primary">404</h1>
          <p className="text-xl text-muted-foreground">Page Not Found</p>
          <p className="text-sm text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              to="/"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
            >
              Go Home
            </Link>
            <Link
              to="/browse"
              className="inline-flex h-10 items-center justify-center rounded-md border border-magic/20 bg-card/80 px-6 text-sm font-medium text-foreground shadow-sm hover:bg-card transition-colors"
            >
              Browse Cards
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
