import { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { getProducts } from '@/lib/product-service';
import { ProductsFilter } from '@/components/features/ProductsFilter';

export const revalidate = 3600;

interface ProductsPageProps {
  searchParams: Promise<{ motif?: string; category?: string }>;
}

export async function generateMetadata({ searchParams }: ProductsPageProps): Promise<Metadata> {
  const params = await searchParams;
  const motif = params.motif;
  const category = params.category;

  let title = 'Browse Ugly Underwear';
  let description = 'Discover the ugliest boxers on the internet. Filter by motif, category and price. Vote and buy on Amazon!';

  if (motif) {
    title = `${motif} Underwear - Ugly ${motif} Boxers`;
    description = `All ugly ${motif} boxers on UglyBoxer. Browse, vote and buy on Amazon!`;
  }
  if (category) {
    title = `${category} Boxers - Ugly Underwear`;
    description = `Ugly ${category} boxers on UglyBoxer. Browse, vote and buy!`;
  }

  return {
    title,
    description,
    alternates: { canonical: '/products' },
  };
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;

  // Fetch ALL products server-side (no limit) for SEO
  const allProducts = await getProducts({
    motif: params.motif,
    category: params.category,
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl neon-text-pink mb-4">
              Browse Ugly Underwear
            </h1>
            <p className="text-gray-400 text-lg">
              {allProducts.length} hideous options to choose from
            </p>
          </div>

          {/* Client component handles interactive filtering/sorting */}
          <ProductsFilter
            initialProducts={allProducts}
            initialMotif={params.motif || ''}
            initialCategory={params.category || ''}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
