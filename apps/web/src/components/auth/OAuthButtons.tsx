import { Button } from '@/components/ui/button';

export function OAuthButtons() {
  return (
    <div className="space-y-2">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Button
          variant="outline"
          onClick={() => { window.location.href = '/api/auth/google'; }}
        >
          Google
        </Button>
        <Button
          variant="outline"
          onClick={() => { window.location.href = '/api/auth/discord'; }}
        >
          Discord
        </Button>
      </div>
    </div>
  );
}
