import { Footer } from '@/components/layout/Footer';
import { SEO } from '@/components/seo/SEO';
import { useParallax } from '@/hooks/useParallax';
import { ParallaxLayer } from '@/components/landing/ParallaxLayer';
import { HeroSection } from '@/components/landing/HeroSection';
import { FeatureSection } from '@/components/landing/FeatureSection';
import { BrowseMockup } from '@/components/landing/BrowseMockup';
import { CollectionsMockup } from '@/components/landing/CollectionsMockup';
import { TrackingMockup } from '@/components/landing/TrackingMockup';
import { CTASection } from '@/components/landing/CTASection';

export function HomePage() {
  const { scrollY, reducedMotion } = useParallax();

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <SEO
        description="Track your Disney Lorcana card collection. Browse cards, build collections by set, color, and character."
        canonicalUrl="/"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: 'Illumineer Vault',
          description: 'Track your Disney Lorcana card collection. Browse cards, build collections by set, color, and character.',
          url: 'https://illumineer-vault.com',
          applicationCategory: 'GameApplication',
          operatingSystem: 'Web',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
          creator: {
            '@type': 'Organization',
            name: 'Verdant Codeworks',
          },
        }}
      />

      {/* Parallax ambient glow orbs */}
      <div className="pointer-events-none absolute inset-0">
        <ParallaxLayer scrollY={scrollY} speed={-0.05} reducedMotion={reducedMotion}>
          <div className="absolute left-1/2 top-[20%] -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-magic/8 blur-[120px]" />
        </ParallaxLayer>
        <ParallaxLayer scrollY={scrollY} speed={-0.1} reducedMotion={reducedMotion}>
          <div className="absolute left-[20%] top-[50%] h-[400px] w-[400px] rounded-full bg-enchant/6 blur-[100px]" />
        </ParallaxLayer>
        <ParallaxLayer scrollY={scrollY} speed={-0.03} reducedMotion={reducedMotion}>
          <div className="absolute right-[15%] top-[70%] h-[300px] w-[300px] rounded-full bg-primary/8 blur-[80px]" />
        </ParallaxLayer>
        <ParallaxLayer scrollY={scrollY} speed={-0.07} reducedMotion={reducedMotion}>
          <div className="absolute left-[40%] top-[120%] h-[500px] w-[500px] rounded-full bg-magic/6 blur-[140px]" />
        </ParallaxLayer>
      </div>

      {/* Hero */}
      <HeroSection scrollY={scrollY} reducedMotion={reducedMotion} />

      {/* Feature: Browse Cards */}
      <FeatureSection
        title="Browse the Complete Card Catalog"
        description="Search and filter through every Lorcana card ever released."
        bullets={[
          'Powerful search by name',
          'Filter by set, ink color, type, and rarity',
          'Responsive card grid with details on hover',
        ]}
        mockup={<BrowseMockup />}
        accentColor="enchant"
      />

      {/* Feature: Organize Collections */}
      <FeatureSection
        title="Build & Organize Collections"
        description="Create custom collections based on any combination of filters."
        bullets={[
          'Filter by set, character, franchise, artist, and more',
          'Track multiple collections independently',
          'See card counts and match previews',
        ]}
        mockup={<CollectionsMockup />}
        reversed
        accentColor="magic"
      />

      {/* Feature: Track Progress */}
      <FeatureSection
        title="Track Every Card You Own"
        description="Mark cards as owned, track quantities, and watch your completion grow."
        bullets={[
          'Visual owned vs. unowned states',
          'Quantity tracking with count badges',
          'Completion progress by set with collapsible groups',
        ]}
        mockup={<TrackingMockup />}
        accentColor="primary"
      />

      {/* CTA */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
