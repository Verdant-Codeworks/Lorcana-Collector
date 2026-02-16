import { Link } from 'react-router';

export function Footer() {
  return (
    <footer className="border-t border-border px-4 py-4">
      <div className="mx-auto max-w-7xl space-y-2">
        <p className="text-center text-xs text-muted-foreground">
          Illumineer Vault is a fan-made project and is not affiliated with, endorsed by, or associated with
          Disney, Ravensburger, or the Lorcana trading card game.
        </p>
        <p className="text-center text-xs text-muted-foreground">
          Card data provided by{' '}
          <a href="https://lorcast.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">
            Lorcast
          </a>{' '}
          and{' '}
          <a href="https://lorcanajson.org" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">
            LorcanaJSON
          </a>
          . Card images are property of Disney / Ravensburger.
        </p>
        <div className="flex items-center justify-center gap-3 text-xs text-muted-foreground">
          <Link to="/privacy" className="underline hover:text-foreground">Privacy Policy</Link>
          <span>&middot;</span>
          <Link to="/terms" className="underline hover:text-foreground">Terms of Service</Link>
          <span>&middot;</span>
          <span>Powered by Verdant Codeworks</span>
        </div>
      </div>
    </footer>
  );
}
