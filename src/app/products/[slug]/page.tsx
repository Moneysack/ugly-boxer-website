import Image from 'next/image';
import Link from 'next/link';
import { Header, Footer } from '@/components/layout';
import { SectionAd } from '@/components/ads/SectionAd';
import { getProductById, getProductPrices, getProducts, getRelatedProducts } from '@/lib/product-service';
import { RelatedProducts } from '@/components/features/RelatedProducts';
import { extractIdFromSlug, generateSlug } from '@/lib/slug-utils';
import { notFound, redirect } from 'next/navigation';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 86400;

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    slug: `${product.id}-${generateSlug(product.name)}`,
  }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const id = extractIdFromSlug(slug);
  if (!id) return { title: 'Product Not Found' };

  const product = await getProductById(id);
  if (!product) return { title: 'Product Not Found' };

  const canonicalSlug = `${product.id}-${generateSlug(product.name)}`;
  const description = `${product.name} - Ugly ${product.motif} underwear. Vote and buy on Amazon! One of the ugliest boxers on UglyBoxer.`;

  return {
    title: `${product.name} - Ugly ${product.motif} Underwear`,
    description,
    alternates: {
      canonical: `/products/${canonicalSlug}`,
    },
    openGraph: {
      title: `${product.name} | UglyBoxer`,
      description,
      images: [{ url: product.image_url, width: 679, height: 679, alt: `${product.name} - Ugly ${product.motif} Boxers` }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | UglyBoxer`,
      description,
      images: [product.image_url],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const id = extractIdFromSlug(slug);

  if (!id) {
    notFound();
  }

  const product = await getProductById(id);
  if (!product) {
    notFound();
  }

  // Redirect to canonical slug URL if needed (e.g., /products/42 → /products/42-sharky)
  const canonicalSlug = `${product.id}-${generateSlug(product.name)}`;
  if (slug !== canonicalSlug) {
    redirect(`/products/${canonicalSlug}`);
  }

  const [prices, relatedProducts] = await Promise.all([
    getProductPrices(id),
    getRelatedProducts(product, 6),
  ]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.image_url,
    description: `${product.name} - Ugly ${product.motif} underwear on UglyBoxer`,
    brand: { '@type': 'Brand', name: 'UglyBoxer' },
    ...(prices.length > 0 && prices[0].affiliate_url ? {
      offers: {
        '@type': 'Offer',
        url: prices[0].affiliate_url,
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
        seller: { '@type': 'Organization', name: 'Amazon' },
      },
    } : {}),
    ...(product.vote_count && product.vote_count > 0 ? {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: ((product.ugliness_percent || 0) / 20).toFixed(1),
        bestRating: 5,
        ratingCount: product.vote_count,
      },
    } : {}),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://uglyboxer.com' },
      { '@type': 'ListItem', position: 2, name: 'Products', item: 'https://uglyboxer.com/products' },
      { '@type': 'ListItem', position: 3, name: product.name, item: `https://uglyboxer.com/products/${canonicalSlug}` },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

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
                  alt={`${product.name} - Ugly ${product.motif} Boxers on UglyBoxer`}
                  fill
                  className="object-cover"
                  priority
                />

                {/* Badges - clickable for cross-linking */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <Link href={`/products?motif=${product.motif}`}>
                    <span className="ugly-badge bg-[var(--ugly-purple)] text-white cursor-pointer hover:opacity-80 transition-opacity">
                      {product.motif}
                    </span>
                  </Link>
                  {product.category && (
                    <Link href={`/products?category=${product.category}`}>
                      <span className="ugly-badge bg-[var(--ugly-green)] text-black cursor-pointer hover:opacity-80 transition-opacity">
                        {product.category}
                      </span>
                    </Link>
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
                        {(product.vote_count || 0) - (product.ugly_votes || 0)}
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
                      Buy on Amazon
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

              {/* Ad under action buttons */}
              <div className="mt-6">
                <SectionAd slot="PRODUCT_MID" format="rectangle" />
              </div>
            </div>
          </div>

          {/* Ad between product info and related products */}
          <SectionAd slot="PRODUCT_BOTTOM" format="horizontal" />

          {/* Related Products - Cross-linking */}
          <RelatedProducts products={relatedProducts} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
