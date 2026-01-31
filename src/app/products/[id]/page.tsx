import Image from 'next/image';
import Link from 'next/link';
import { Header, Footer } from '@/components/layout';
import { getProductById, getProductPrices } from '@/lib/product-service';
import { notFound } from 'next/navigation';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

interface ProductWithPrices {
  id: number;
  name: string;
  description: string | null;
  motif: string;
  category: string;
  colors: string[];
  image_url: string;
  vote_count: number;
  ugly_votes: number;
  ugliness_percent: number;
  prices: {
    id: number;
    price: number;
    original_price: number | null;
    affiliate_url: string;
    shop: {
      id: number;
      name: string;
      is_premium: boolean;
    };
  }[];
}

async function getProduct(id: number): Promise<ProductWithPrices | null> {
  try {
    // Get product from Supabase with vote stats from Neon
    const product = await getProductById(id);

    if (!product) {
      return null;
    }

    // Get Amazon affiliate link from Supabase
    const prices = await getProductPrices(id);

    return {
      ...product,
      prices,
    } as ProductWithPrices;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProduct(parseInt(id));

  if (!product) {
    return { title: 'Product Not Found' };
  }

  return {
    title: `${product.name} - UglyBoxer`,
    description: product.description || `Check out ${product.name} - one of the ugliest underwear on the internet! Vote and buy on Amazon.`,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProduct(parseInt(id));

  if (!product) {
    notFound();
  }

  const prices = product.prices || [];
  const lowestPrice = prices.length > 0 ? Math.min(...prices.map(p => p.price)) : null;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm">
            <Link href="/" className="text-gray-400 hover:text-[var(--ugly-pink)]">Home</Link>
            <span className="text-gray-600 mx-2">/</span>
            <Link href="/products" className="text-gray-400 hover:text-[var(--ugly-pink)]">Products</Link>
            <span className="text-gray-600 mx-2">/</span>
            <span className="text-[var(--ugly-pink)]">{product.name}</span>
          </nav>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Image */}
            <div className="ugly-card overflow-hidden">
              <div className="relative aspect-square">
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <span className="ugly-badge bg-[var(--ugly-purple)] text-white">
                    {product.motif}
                  </span>
                  {product.category && (
                    <span className="ugly-badge bg-[var(--ugly-green)] text-black">
                      {product.category}
                    </span>
                  )}
                </div>

                {/* Ugliness Score */}
                {product.ugliness_percent !== undefined && product.ugliness_percent > 0 && (
                  <div className="absolute bottom-4 right-4 bg-black/80 px-4 py-2 rounded-full">
                    <span className="text-2xl font-bold neon-text-green">
                      {product.ugliness_percent.toFixed(0)}%
                    </span>
                    <span className="text-gray-400 text-sm ml-1">Ugly</span>
                  </div>
                )}
              </div>
            </div>

            {/* Info */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold neon-text-pink mb-4">
                {product.name}
              </h1>

              {product.description && (
                <p className="text-gray-300 text-lg mb-6">
                  {product.description}
                </p>
              )}

              {/* Colors */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-gray-400 text-sm uppercase tracking-wide mb-2">Colors</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color, i) => (
                      <span
                        key={i}
                        className="ugly-badge bg-[var(--ugly-dark)] text-white border border-[var(--ugly-pink)]"
                      >
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Vote Stats */}
              {product.vote_count !== undefined && product.vote_count > 0 && (
                <div className="ugly-card p-4 mb-6">
                  <h3 className="text-gray-400 text-sm uppercase tracking-wide mb-3">Community Votes</h3>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold neon-text-green">{product.ugly_votes}</div>
                      <div className="text-gray-400 text-sm">Ugly</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-red-500">
                        {product.vote_count - (product.ugly_votes || 0)}
                      </div>
                      <div className="text-gray-400 text-sm">Not Ugly</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">{product.vote_count}</div>
                      <div className="text-gray-400 text-sm">Total</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Buy on Amazon */}
              <div className="ugly-card p-6">
                {prices.length > 0 && prices[0].affiliate_url ? (
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-white mb-4">
                      Available on Amazon
                    </h3>
                    <a
                      href={prices[0].affiliate_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="neon-button neon-button-green text-lg py-4 px-8 inline-block w-full"
                    >
                      🛒 Buy on Amazon
                    </a>
                    <p className="text-gray-500 text-xs mt-4">
                      * We may earn a commission from purchases made through this link.
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-400">Currently not available</p>
                    <p className="text-gray-500 text-sm mt-2">
                      Check back soon or search for &quot;{product.name}&quot; on Amazon
                    </p>
                  </div>
                )}
              </div>

              {/* Back to voting */}
              <div className="mt-6 flex gap-4">
                <Link href="/ranking/vote" className="neon-button neon-button-pink flex-1 text-center">
                  Vote on More
                </Link>
                <Link href="/products" className="neon-button neon-button-green flex-1 text-center">
                  Browse More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
