import { Link } from 'react-router';
import { Footer } from '@/components/layout/Footer';

export function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-12">
        <Link to="/login" className="mb-8 inline-block text-sm text-muted-foreground hover:text-foreground">
          &larr; Back
        </Link>

        <h1 className="mb-8 text-3xl font-bold">Privacy Policy</h1>
        <p className="mb-4 text-sm text-muted-foreground">Last updated: February 2026</p>

        <div className="space-y-6 text-sm leading-relaxed text-muted-foreground">
          <section>
            <h2 className="mb-2 text-lg font-semibold text-foreground">1. Who We Are</h2>
            <p>
              Illumineer Vault is a fan-made, open-source Disney Lorcana collection tracker
              powered by Verdant Codeworks. It is not affiliated with, endorsed by, or associated
              with Disney, Ravensburger, or the Lorcana trading card game.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-foreground">2. Data We Collect</h2>
            <p>When you create an account, we collect:</p>
            <ul className="ml-4 mt-2 list-disc space-y-1">
              <li><strong>Email address</strong> — used for authentication and account recovery.</li>
              <li><strong>Password</strong> — stored as a one-way bcrypt hash. We never store or see your plaintext password.</li>
              <li><strong>Display name</strong> (optional) — shown in the app interface.</li>
              <li><strong>OAuth profile data</strong> — if you sign in with Google or Discord, we receive your email, display name, avatar URL, and provider ID from those services.</li>
            </ul>
            <p className="mt-2">We also store your collection data (which cards you own and in what quantities).</p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-foreground">3. How We Use Your Data</h2>
            <p>Your data is used solely to:</p>
            <ul className="ml-4 mt-2 list-disc space-y-1">
              <li>Authenticate you and maintain your session.</li>
              <li>Store and display your card collection.</li>
            </ul>
            <p className="mt-2">We do not sell, share, or transfer your personal data to any third parties. We do not serve advertisements or use your data for marketing.</p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-foreground">4. Third-Party Services</h2>
            <p>Illumineer Vault integrates with the following external services:</p>
            <ul className="ml-4 mt-2 list-disc space-y-1">
              <li><strong>Google OAuth / Discord OAuth</strong> — if you choose to sign in with these providers, their privacy policies apply to the data they share with us.</li>
              <li><strong>Lorcast API</strong> (<a href="https://lorcast.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">lorcast.com</a>) — provides card game data. No personal data is sent to Lorcast.</li>
              <li><strong>LorcanaJSON</strong> (<a href="https://lorcanajson.org" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">lorcanajson.org</a>) — provides supplemental card data. No personal data is sent to LorcanaJSON.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-foreground">5. Data Storage &amp; Security</h2>
            <p>
              Your data is stored in a PostgreSQL database. Passwords are hashed with bcrypt.
              Authentication uses JSON Web Tokens (JWT) stored in your browser's local storage.
              We use HTTPS for all communications.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-foreground">6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="ml-4 mt-2 list-disc space-y-1">
              <li><strong>Access</strong> your data — visible in your account profile and collections.</li>
              <li><strong>Delete</strong> your account and all associated data — available in account settings.</li>
              <li><strong>Export</strong> your data — your collection data is accessible through the application.</li>
            </ul>
            <p className="mt-2">
              Account deletion permanently removes your user profile, OAuth links, and all collection
              data. This action cannot be undone.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-foreground">7. Cookies &amp; Local Storage</h2>
            <p>
              Illumineer Vault does not use tracking cookies. We store a single JWT authentication token in
              your browser's local storage to maintain your session. No analytics or third-party
              tracking scripts are used.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-foreground">8. Changes to This Policy</h2>
            <p>
              We may update this policy from time to time. Changes will be reflected on this page
              with an updated date.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
