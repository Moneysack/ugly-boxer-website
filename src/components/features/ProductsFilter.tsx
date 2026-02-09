'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { ProductGrid } from '@/components/features';
import { MOTIFS, CATEGORIES, Product } from '@/types';

interface ProductsFilterProps {
  initialProducts: Product[];
  initialMotif: string;
  initialCategory: string;
}

const PRODUCTS_PER_PAGE = 24;

export function ProductsFilter({ initialProducts, initialMotif, initialCategory }: ProductsFilterProps) {
  const router = useRouter();
  const [selectedMotif, setSelectedMotif] = useState(initialMotif);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState<'newest' | 'price' | 'ugliness'>('newest');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 30]);
  const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_PAGE);

  const handleMotifChange = (motif: string) => {
    setSelectedMotif(motif);
    setVisibleCount(PRODUCTS_PER_PAGE);
    const params = new URLSearchParams();
    if (motif) params.set('motif', motif);
    if (selectedCategory) params.set('category', selectedCategory);
    router.push(`/products${params.toString() ? '?' + params.toString() : ''}`);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setVisibleCount(PRODUCTS_PER_PAGE);
    const params = new URLSearchParams();
    if (selectedMotif) params.set('motif', selectedMotif);
    if (category) params.set('category', category);
    router.push(`/products${params.toString() ? '?' + params.toString() : ''}`);
  };

  const clearFilters = () => {
    setSelectedMotif('');
    setSelectedCategory('');
    setPriceRange([0, 30]);
    setSortBy('newest');
    setVisibleCount(PRODUCTS_PER_PAGE);
    router.push('/products');
  };

  const sortedProducts = useMemo(() => {
    let filtered = [...initialProducts];

    filtered = filtered.filter(p => {
      const price = p.min_price || 0;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    switch (sortBy) {
      case 'price':
        filtered.sort((a, b) => (a.min_price || 0) - (b.min_price || 0));
        break;
      case 'ugliness':
        filtered.sort((a, b) => (b.ugliness_percent || 0) - (a.ugliness_percent || 0));
        break;
      default:
        break;
    }

    return filtered;
  }, [initialProducts, sortBy, priceRange]);

  const visibleProducts = sortedProducts.slice(0, visibleCount);
  const hasMore = visibleCount < sortedProducts.length;

  return (
    <>
      {/* Filters */}
      <div className="ugly-card p-4 mb-8">
        <div className="flex flex-wrap gap-4 items-center">
          {/* Motif Filter */}
          <div className="flex-1 min-w-[150px]">
            <label className="text-gray-400 text-sm mb-1 block">Motif</label>
            <select
              value={selectedMotif}
              onChange={(e) => handleMotifChange(e.target.value)}
              className="w-full bg-[var(--ugly-darker)] border border-[var(--ugly-pink)] rounded-lg px-3 py-2 text-white"
            >
              <option value="">All Motifs</option>
              {MOTIFS.map(motif => (
                <option key={motif} value={motif}>{motif}</option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div className="flex-1 min-w-[150px]">
            <label className="text-gray-400 text-sm mb-1 block">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full bg-[var(--ugly-darker)] border border-[var(--ugly-pink)] rounded-lg px-3 py-2 text-white"
            >
              <option value="">All Categories</option>
              {CATEGORIES.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div className="flex-1 min-w-[150px]">
            <label className="text-gray-400 text-sm mb-1 block">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="w-full bg-[var(--ugly-darker)] border border-[var(--ugly-pink)] rounded-lg px-3 py-2 text-white"
            >
              <option value="newest">Newest</option>
              <option value="price">Price: Low to High</option>
              <option value="ugliness">Most Ugly</option>
            </select>
          </div>

          {/* Price Range */}
          <div className="flex-1 min-w-[200px]">
            <label className="text-gray-400 text-sm mb-1 block">
              Price: &euro;{priceRange[0]} - &euro;{priceRange[1]}
            </label>
            <input
              type="range"
              min="0"
              max="30"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              className="w-full accent-[var(--ugly-pink)]"
            />
          </div>

          {/* Clear Filters */}
          <button
            onClick={clearFilters}
            className="neon-button neon-button-pink text-sm py-2"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <ProductGrid products={visibleProducts} showVotes />

      {/* Load More */}
      {hasMore && (
        <div className="text-center mt-8">
          <button
            onClick={() => setVisibleCount((c) => c + PRODUCTS_PER_PAGE)}
            className="neon-button neon-button-green"
          >
            Load More ({sortedProducts.length - visibleCount} remaining)
          </button>
        </div>
      )}
    </>
  );
}
