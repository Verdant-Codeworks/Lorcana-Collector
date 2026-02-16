import { Link } from 'react-router';
import { Footer } from '@/components/layout/Footer';
import { SEO } from '@/components/seo/SEO';

export function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SEO
        title="Terms of Service"
        description="Terms of service for Illumineer Vault, a fan-made Disney Lorcana collection tracker."
        canonicalUrl="/terms"
      />
      <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-12">
        <Link to="/login" className="mb-8 inline-block text-sm text-muted-foreground hover:text-foreground">
          &larr; Back
        </Link>

        <h1 className="mb-8 text-3xl font-bold">Terms of Service</h1>
        <p className="mb-4 text-sm text-muted-foreground">Last updated: February 2026</p>

        <div className="space-y-6 text-sm leading-relaxed text-muted-foreground">
          <section>
            <h2 className="mb-2 text-lg font-semibold text-foreground">1. About Illumineer Vault</h2>
            <p>
              Illumineer Vault is a fan-made, open-source Disney Lorcana trading card collection tracker
              powered by Verdant Codeworks. It is not affiliated with, endorsed by, or associated with
              Disney, Ravensburger, or the Lorcana trading card game. All card names, images, and game
              data are the property of their respective owners.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-foreground">2. Use of Service</h2>
            <p>By using Illumineer Vault, you agree to:</p>
            <ul className="ml-4 mt-2 list-disc space-y-1">
              <li>Use the service for personal, non-commercial collection tracking only.</li>
              <li>Not attempt to scrape, overload, or otherwise misuse the service.</li>
              <li>Provide accurate information when creating an account.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-foreground">3. Accounts</h2>
            <p>
              You are responsible for maintaining the security of your account credentials.
              You may delete your account at any time from your account settings, which will
              permanently remove all your data.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-foreground">4. Intellectual Property</h2>
            <p>
              Disney Lorcana, card images, card text, and related game content are the intellectual
              property of Disney and Ravensburger. Card data displayed in Illumineer Vault is sourced from
              publicly available APIs (Lorcast, LorcanaJSON) and is used under fair use for the
              purpose of collection tracking.
            </p>
            <p className="mt-2">
              The Illumineer Vault application source code is licensed under the MIT License.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-foreground">5. Data &amp; Privacy</h2>
            <p>
              Your use of Illumineer Vault is also governed by our{' '}
              <Link to="/privacy" className="underline hover:text-foreground">Privacy Policy</Link>,
              which describes how we collect, use, and protect your data.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-foreground">6. Disclaimer of Warranties</h2>
            <p>
              Illumineer Vault is provided "as is" without warranty of any kind. We do not guarantee
              the accuracy of card data, availability of the service, or preservation of your data.
              Card data is sourced from third-party APIs and may contain errors or become unavailable.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-foreground">7. Limitation of Liability</h2>
            <p>
              Illumineer Vault, Verdant Codeworks, and its contributors shall not be liable for any
              damages arising from your use of the service, including but not limited to loss of data
              or interruption of service.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-foreground">8. Changes to Terms</h2>
            <p>
              We may update these terms from time to time. Continued use of Illumineer Vault after
              changes constitutes acceptance of the updated terms.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
