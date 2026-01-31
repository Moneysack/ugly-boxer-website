import Image from 'next/image';
import Link from 'next/link';
import { Header, Footer } from '@/components/layout';
import { sql } from '@/lib/db';
import { notFound } from 'next/navigation';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

interface ProductWithPrices {
  id: number;
  name: string;
  description: string;
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
    // Get product with vote stats
    const products = await sql`
      SELECT
        p.*,
        COUNT(v.id) as vote_count,
        COUNT(CASE WHEN v.vote_type = 'ugly' THEN 1 END) as ugly_votes,
        ROUND(COUNT(CASE WHEN v.vote_type = 'ugly' THEN 1 END)::numeric /
              NULLIF(COUNT(v.id), 0) * 100, 1) as ugliness_percent
      FROM products p
      LEFT JOIN votes v ON p.id = v.product_id
      WHERE p.id = ${id}
      GROUP BY p.id
    `;

    if (products.length === 0) {
      return null;
    }

    const product = products[0];

    // Get prices with shop info
    const prices = await sql`
      SELECT
        pr.*,
        s.name as shop_name,
        s.is_premium as shop_is_premium
      FROM prices pr
      JOIN shops s ON pr.shop_id = s.id
      WHERE pr.product_id = ${id}
      ORDER BY pr.price ASC
    `;

    // Format prices with nested shop object
    const formattedPrices = prices.map(p => ({
      id: p.id,
      price: parseFloat(p.price),
      original_price: p.original_price ? parseFloat(p.original_price) : null,
      affiliate_url: p.affiliate_url,
      shop: {
        id: p.shop_id,
        name: p.shop_name,
        is_premium: p.shop_is_premium
      }
    }));

    return {
      ...product,
      vote_count: parseInt(product.vote_count) || 0,
      ugly_votes: parseInt(product.ugly_votes) || 0,
      ugliness_percent: parseFloat(product.ugliness_percent) || 0,
      prices: formattedPrices
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
    description: product.description || `Check out ${product.name} - one of the ugliest underwear on the internet!`,
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

              <p className="text-gray-300 text-lg mb-6">
                {product.description}
              </p>

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

              {/* Price Comparison */}
              <div className="ugly-card p-4">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  Price Comparison
                  {lowestPrice && (
                    <span className="price-tag ml-auto">
                      From {lowestPrice.toFixed(2)}
                    </span>
                  )}
                </h3>

                {prices.length > 0 ? (
                  <div className="space-y-3">
                    {prices
                      .sort((a, b) => a.price - b.price)
                      .map((priceItem, index) => (
                        <div
                          key={priceItem.id}
                          className={`flex items-center justify-between p-3 rounded-lg transition-all
                            ${index === 0 ? 'bg-[var(--ugly-green)]/10 border border-[var(--ugly-green)]' : 'bg-[var(--ugly-darker)]'}
                          `}
                        >
                          <div className="flex items-center gap-3">
                            {/* Best Price Badge */}
                            {index === 0 && (
                              <span className="ugly-badge bg-[var(--ugly-green)] text-black text-xs">
                                Best Price
                              </span>
                            )}
                            <span className="font-bold text-white">{priceItem.shop.name}</span>
                            {priceItem.shop.is_premium && (
                              <span className="text-yellow-500 text-xs">Premium</span>
                            )}
                          </div>

                          <div className="flex items-center gap-4">
                            {/* Price */}
                            <div className="text-right">
                              <div className="font-bold text-[var(--ugly-green)]">
                                {priceItem.price.toFixed(2)}
                              </div>
                              {priceItem.original_price && (
                                <div className="text-gray-500 text-sm line-through">
                                  {priceItem.original_price.toFixed(2)}
                                </div>
                              )}
                            </div>

                            {/* Buy Button */}
                            <a
                              href={priceItem.affiliate_url || '#'}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="neon-button neon-button-green text-sm py-2 px-4"
                            >
                              Buy
                            </a>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-400">No prices available yet</p>
                    <p className="text-gray-500 text-sm mt-2">
                      Check back soon or search for &quot;{product.name}&quot; directly
                    </p>
                  </div>
                )}

                {/* Affiliate Disclaimer */}
                <p className="text-gray-500 text-xs mt-4">
                  * We may earn a commission from purchases made through these links.
                  Prices may vary.
                </p>
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
