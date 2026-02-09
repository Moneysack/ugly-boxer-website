'use client';

import { useState, useCallback } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence, PanInfo } from 'framer-motion';
import Image from 'next/image';
import { Product, VoteType } from '@/types';

interface VotingSwiperProps {
  products: Product[];
  onVote: (productId: number, voteType: VoteType) => void;
}

export function VotingSwiper({ products, onVote }: VotingSwiperProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exitDirection, setExitDirection] = useState<'left' | 'right' | null>(null);

  const currentProduct = products[currentIndex];
  const nextProduct = products[currentIndex + 1];

  const handleVote = useCallback((voteType: VoteType) => {
    if (!currentProduct) return;

    setExitDirection(voteType === 'ugly' ? 'right' : 'left');
    onVote(currentProduct.id, voteType);

    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      setExitDirection(null);
    }, 300);
  }, [currentProduct, onVote]);

  if (!currentProduct) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] text-center px-4">
        <span className="text-6xl mb-4">🎉</span>
        <h2 className="text-3xl neon-text-pink mb-4">You voted on everything!</h2>
        <p className="text-gray-400 mb-8">
          Come back later for more ugly underwear to judge
        </p>
        <a href="/ranking" className="neon-button neon-button-green">
          See Rankings
        </a>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Instructions */}
      <div className="flex justify-between mb-4 px-4">
        <div className="flex items-center gap-2 text-red-500">
          <span className="text-2xl">👎</span>
          <span className="text-sm uppercase tracking-wide">Swipe Left</span>
        </div>
        <div className="flex items-center gap-2 text-[var(--ugly-green)]">
          <span className="text-sm uppercase tracking-wide">Swipe Right</span>
          <span className="text-2xl">🤮</span>
        </div>
      </div>

      {/* Card Stack */}
      <div className="relative h-[500px]">
        {/* Next card (underneath) */}
        {nextProduct && (
          <div className="absolute inset-0">
            <StaticCard product={nextProduct} />
          </div>
        )}

        {/* Current card (swipeable) */}
        <AnimatePresence mode="wait">
          <SwipeCard
            key={currentProduct.id}
            product={currentProduct}
            onVote={handleVote}
            exitDirection={exitDirection}
          />
        </AnimatePresence>
      </div>

      {/* Vote Buttons (for non-touch users) */}
      <div className="flex justify-center gap-8 mt-6">
        <button
          onClick={() => handleVote('not_ugly')}
          className="w-16 h-16 rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center text-3xl hover:bg-red-500 hover:scale-110 transition-all"
          aria-label="Not ugly"
        >
          👎
        </button>
        <button
          onClick={() => handleVote('ugly')}
          className="w-16 h-16 rounded-full bg-[var(--ugly-green)]/20 border-2 border-[var(--ugly-green)] flex items-center justify-center text-3xl hover:bg-[var(--ugly-green)] hover:scale-110 transition-all"
          aria-label="Ugly!"
        >
          🤮
        </button>
      </div>

      {/* Progress */}
      <div className="mt-6 text-center">
        <span className="text-gray-400">
          {currentIndex + 1} / {products.length}
        </span>
      </div>
    </div>
  );
}

interface SwipeCardProps {
  product: Product;
  onVote: (voteType: VoteType) => void;
  exitDirection: 'left' | 'right' | null;
}

function SwipeCard({ product, onVote, exitDirection }: SwipeCardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-30, 30]);
  const uglyOpacity = useTransform(x, [0, 100], [0, 1]);
  const notUglyOpacity = useTransform(x, [-100, 0], [1, 0]);

  const handleDragEnd = (_: never, info: PanInfo) => {
    const threshold = 100;
    if (info.offset.x > threshold) {
      onVote('ugly');
    } else if (info.offset.x < -threshold) {
      onVote('not_ugly');
    }
  };

  return (
    <motion.div
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
      style={{ x, rotate }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      initial={{ scale: 1, opacity: 1 }}
      exit={{
        x: exitDirection === 'right' ? 300 : exitDirection === 'left' ? -300 : 0,
        opacity: 0,
        transition: { duration: 0.3 },
      }}
    >
      <div className="ugly-card h-full relative overflow-hidden">
        {/* Ugly overlay */}
        <motion.div
          className="absolute inset-0 bg-[var(--ugly-green)]/30 z-10 flex items-center justify-center pointer-events-none"
          style={{ opacity: uglyOpacity }}
        >
          <span className="text-8xl rotate-12">🤮</span>
        </motion.div>

        {/* Not ugly overlay */}
        <motion.div
          className="absolute inset-0 bg-red-500/30 z-10 flex items-center justify-center pointer-events-none"
          style={{ opacity: notUglyOpacity }}
        >
          <span className="text-8xl -rotate-12">👎</span>
        </motion.div>

        {/* Image */}
        <div className="relative h-3/4">
          <Image
            src={product.image_url}
            alt={`${product.name} - Vote: Ugly or Not?`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute top-4 right-4">
            <span className="ugly-badge bg-[var(--ugly-purple)] text-white">
              {product.motif}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="text-xl font-bold text-white mb-1">{product.name}</h3>
          <p className="text-gray-400 text-sm line-clamp-2">{product.description}</p>
          {product.min_price && (
            <span className="price-tag mt-2">From €{product.min_price.toFixed(2)}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function StaticCard({ product }: { product: Product }) {
  return (
    <div className="ugly-card h-full opacity-50 scale-95">
      <div className="relative h-3/4">
        <Image
          src={product.image_url}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-white">{product.name}</h3>
      </div>
    </div>
  );
}
