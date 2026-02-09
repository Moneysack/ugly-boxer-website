import { Product } from '@/types';
import { ProductCard } from '@/components/ui/ProductCard';

interface ProductGridProps {
  products: Product[];
  showVotes?: boolean;
  showRank?: boolean;
}

export function ProductGrid({ products, showVotes = false, showRank = false }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-2xl neon-text-pink">No ugly underwear found!</p>
        <p className="text-gray-400 mt-2">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          showVotes={showVotes}
          rank={showRank ? index + 1 : undefined}
        />
      ))}
    </div>
  );
}
