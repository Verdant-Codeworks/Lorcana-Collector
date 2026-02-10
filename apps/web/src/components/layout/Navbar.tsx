import { Link, useNavigate, useLocation } from 'react-router';
import { useAuthStore } from '@/stores/auth.store';
import { Button } from '@/components/ui/button';
import { LogOut, Wand2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { to: '/dashboard', label: 'Collections' },
  { to: '/browse', label: 'Browse Cards' },
];

export function Navbar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="border-b border-magic/20 bg-card/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <Link to="/dashboard" className="flex items-center gap-2 text-lg font-bold">
          <Wand2 className="h-5 w-5 text-enchant" />
          <span className="bg-gradient-to-r from-magic via-primary to-enchant bg-clip-text text-transparent">
            Lorcana Collector
          </span>
        </Link>

        <div className="flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to || location.pathname.startsWith(link.to + '/');
            return (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  'relative px-3 py-1.5 text-sm transition-colors rounded-md',
                  isActive
                    ? 'text-primary font-medium'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-[13px] left-0 right-0 h-0.5 bg-gradient-to-r from-magic via-primary to-enchant" />
                )}
              </Link>
            );
          })}

          {user && (
            <>
              <div className="mx-3 h-5 w-px bg-border" />
              <span className="text-sm text-muted-foreground">
                {user.displayName || user.email}
              </span>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
