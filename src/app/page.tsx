import Link from 'next/link';
import { Header, Footer } from '@/components/layout';
import { ProductGrid } from '@/components/features';
import { Leaderboard } from '@/components/features';
import { getProducts } from '@/lib/product-service';
import { Product, RankedProduct } from '@/types';

async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const products = await getProducts({ limit: 8 });
    // Shuffle for random featured products
    return products.sort(() => Math.random() - 0.5);
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
}

async function getRankedProducts(): Promise<RankedProduct[]> {
  try {
    const allProducts = await getProducts({ limit: 100 });

    // Filter and rank by ugliness
    const rankings = allProducts
      .filter((p) => (p.vote_count || 0) > 0)
      .sort((a, b) => {
        const aUgly = a.ugly_votes || 0;
        const bUgly = b.ugly_votes || 0;
        if (aUgly !== bUgly) return bUgly - aUgly;
        return (b.vote_count || 0) - (a.vote_count || 0);
      })
      .slice(0, 5);

    return rankings as RankedProduct[];
  } catch (error) {
    console.error('Error fetching rankings:', error);
    return [];
  }
}

export default async function HomePage() {
  const [featuredProducts, rankedProducts] = await Promise.all([
    getFeaturedProducts(),
    getRankedProducts()
  ]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 px-4 text-center overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-10 left-10 text-8xl opacity-20 animate-float">🩲</div>
            <div className="absolute bottom-10 right-10 text-8xl opacity-20 animate-float" style={{ animationDelay: '1s' }}>🤮</div>
            <div className="absolute top-1/2 left-1/4 text-6xl opacity-10 animate-wiggle">🍕</div>
            <div className="absolute top-1/3 right-1/4 text-6xl opacity-10 animate-wiggle" style={{ animationDelay: '0.5s' }}>👽</div>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="neon-text-pink">Find the UGLIEST</span>
              <br />
              <span className="neon-text-green">Underwear!</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Vote on the most hideous boxers, compare prices, and embrace
              the chaos of terrible fashion choices. 🩲
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/ranking/vote" className="neon-button neon-button-green text-lg">
                🤮 Start Voting
              </Link>
              <Link href="/products" className="neon-button neon-button-pink text-lg">
                Browse All
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-8 max-w-md mx-auto">
              <StatBox number="50+" label="Ugly Boxers" />
              <StatBox number="5" label="Shops" />
              <StatBox number="∞" label="Bad Taste" />
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section className="py-16 px-4 bg-[var(--ugly-dark)]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl neon-text-pink text-center mb-12">
              How It Works
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <StepCard
                number="1"
                emoji="👆"
                title="Swipe & Vote"
                description="Swipe right if it's ugly, left if it's not. TikTok-style voting on the ugliest underwear."
              />
              <StepCard
                number="2"
                emoji="🏆"
                title="See Rankings"
                description="Watch the ugliest underwear climb to the top of our weekly leaderboard."
              />
              <StepCard
                number="3"
                emoji="💰"
                title="Compare Prices"
                description="Found something ugly enough? Compare prices across 5+ shops and buy it!"
              />
            </div>
          </div>
        </section>

        {/* Leaderboard Preview */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl neon-text-green">🏆 Top Ugly</h2>
              <Link href="/ranking" className="text-[var(--ugly-pink)] hover:underline">
                See Full Ranking →
              </Link>
            </div>

            <Leaderboard products={rankedProducts} title="" />
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 px-4 bg-[var(--ugly-dark)]">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl neon-text-pink">🔥 Featured Ugly</h2>
              <Link href="/products" className="text-[var(--ugly-green)] hover:underline">
                Browse All →
              </Link>
            </div>

            <ProductGrid products={featuredProducts} />
          </div>
        </section>

        {/* Categories */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl neon-text-pink text-center mb-12">
              Browse by Category
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <CategoryCard href="/products?motif=Pizza" emoji="🍕" label="Pizza" />
              <CategoryCard href="/products?motif=Alien" emoji="👽" label="Alien" />
              <CategoryCard href="/products?motif=Animal" emoji="🐱" label="Animals" />
              <CategoryCard href="/products?motif=Meme" emoji="😂" label="Memes" />
              <CategoryCard href="/products?motif=Food" emoji="🌮" label="Food" />
              <CategoryCard href="/products?motif=Fitness" emoji="💪" label="Fitness" />
              <CategoryCard href="/products?motif=Graffiti" emoji="🎨" label="Art" />
              <CategoryCard href="/products?category=Volleyball" emoji="🏐" label="Volleyball" />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl neon-text-green mb-6">
              Ready to Judge?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Your vote matters! Help us find the ugliest underwear on the internet.
            </p>
            <Link href="/ranking/vote" className="neon-button neon-button-green text-xl">
              Start Voting Now 🤮
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function StatBox({ number, label }: { number: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-3xl md:text-4xl font-bold neon-text-green">{number}</div>
      <div className="text-gray-400 text-sm uppercase tracking-wide">{label}</div>
    </div>
  );
}

function StepCard({
  number,
  emoji,
  title,
  description,
}: {
  number: string;
  emoji: string;
  title: string;
  description: string;
}) {
  return (
    <div className="ugly-card p-6 text-center">
      <div className="w-12 h-12 rounded-full bg-[var(--ugly-pink)] text-black font-bold text-xl flex items-center justify-center mx-auto mb-4">
        {number}
      </div>
      <div className="text-5xl mb-4">{emoji}</div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}

function CategoryCard({
  href,
  emoji,
  label,
}: {
  href: string;
  emoji: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="ugly-card p-6 text-center hover:neon-box-pink transition-all group"
    >
      <div className="text-4xl mb-2 group-hover:animate-wiggle">{emoji}</div>
      <div className="font-bold text-white group-hover:text-[var(--ugly-pink)]">{label}</div>
    </Link>
  );
}
