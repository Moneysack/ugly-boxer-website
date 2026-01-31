'use client';

import { useState, useMemo, Suspense, useEffect } from 'react';
import { Header, Footer } from '@/components/layout';
import { ProductGrid } from '@/components/features';
import { MOTIFS, CATEGORIES, Product } from '@/types';
import { useSearchParams } from 'next/navigation';

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialMotif = searchParams.get('motif') || '';
  const initialCategory = searchParams.get('category') || '';

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMotif, setSelectedMotif] = useState(initialMotif);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 30]);
  const [sortBy, setSortBy] = useState<'price' | 'newest' | 'ugliness'>('newest');

  // Fetch products from API
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (selectedMotif) params.set('motif', selectedMotif);
        if (selectedCategory) params.set('category', selectedCategory);

        const res = await fetch(`/api/products?${params.toString()}`);
        const data = await res.json();
        setProducts(data.map((p: Record<string, unknown>) => ({
          ...p,
          min_price: p.min_price ? parseFloat(p.min_price as string) : undefined,
          vote_count: parseInt(p.vote_count as string) || 0,
          ugly_votes: parseInt(p.ugly_votes as string) || 0,
          ugliness_percent: parseFloat(p.ugliness_percent as string) || 0
        })));
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      }
      setLoading(false);
    }
    fetchProducts();
  }, [selectedMotif, selectedCategory]);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Filter by price (client-side for real-time updates)
    filtered = filtered.filter(p => {
      const price = p.min_price || 0;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Sort
    switch (sortBy) {
      case 'price':
        filtered.sort((a, b) => (a.min_price || 0) - (b.min_price || 0));
        break;
      case 'ugliness':
        filtered.sort((a, b) => (b.ugliness_percent || 0) - (a.ugliness_percent || 0));
        break;
      case 'newest':
      default:
        // Already in order from API
        break;
    }

    return filtered;
  }, [products, priceRange, sortBy]);

  const clearFilters = () => {
    setSelectedMotif('');
    setSelectedCategory('');
    setPriceRange([0, 30]);
    setSortBy('newest');
  };

  return (
    <>
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl neon-text-pink mb-4">
          Browse Ugly Underwear
        </h1>
        <p className="text-gray-400 text-lg">
          {filteredProducts.length} hideous options to choose from
        </p>
      </div>

      {/* Filters */}
      <div className="ugly-card p-4 mb-8">
        <div className="flex flex-wrap gap-4 items-center">
          {/* Motif Filter */}
          <div className="flex-1 min-w-[150px]">
            <label className="text-gray-400 text-sm mb-1 block">Motif</label>
            <select
              value={selectedMotif}
              onChange={(e) => setSelectedMotif(e.target.value)}
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
              onChange={(e) => setSelectedCategory(e.target.value)}
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
              Price: €{priceRange[0]} - €{priceRange[1]}
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
      {loading ? (
        <div className="text-center py-12">
          <div className="text-4xl animate-pulse-neon mb-4">🩲</div>
          <p className="text-gray-400">Loading ugly underwear...</p>
        </div>
      ) : (
        <ProductGrid products={filteredProducts} showVotes />
      )}
    </>
  );
}

function LoadingFallback() {
  return (
    <div className="text-center py-12">
      <div className="text-4xl animate-pulse-neon mb-4">🩲</div>
      <p className="text-gray-400">Loading ugly underwear...</p>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <Suspense fallback={<LoadingFallback />}>
            <ProductsContent />
          </Suspense>
        </div>
      </main>

      <Footer />
    </div>
  );
}
