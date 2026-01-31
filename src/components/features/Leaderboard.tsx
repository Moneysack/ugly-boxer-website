'use client';

import Image from 'next/image';
import Link from 'next/link';
import { RankedProduct } from '@/types';

interface LeaderboardProps {
  products: RankedProduct[];
  title?: string;
}

export function Leaderboard({ products, title = 'Weekly Ugliness Ranking' }: LeaderboardProps) {
  return (
    <div>
      <h2 className="text-3xl neon-text-pink mb-6 text-center">{title}</h2>

      <div className="space-y-4">
        {products.map((product) => (
          <LeaderboardItem key={product.id} product={product} />
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">No votes yet. Be the first to judge!</p>
          <Link href="/ranking/vote" className="neon-button neon-button-green mt-4 inline-block">
            Start Voting
          </Link>
        </div>
      )}
    </div>
  );
}

function LeaderboardItem({ product }: { product: RankedProduct }) {
  const isTopThree = product.rank <= 3;

  return (
    <Link href={`/products/${product.id}`}>
      <div className={`
        flex items-center gap-4 p-4 rounded-xl transition-all
        ${isTopThree ? 'ugly-card' : 'bg-[var(--ugly-dark)] border border-[var(--ugly-dark)] hover:border-[var(--ugly-pink)]'}
      `}>
        {/* Rank */}
        <div className={`
          flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl
          ${product.rank === 1 ? 'bg-[var(--ugly-yellow)] text-black animate-pulse-neon' : ''}
          ${product.rank === 2 ? 'bg-gray-300 text-black' : ''}
          ${product.rank === 3 ? 'bg-amber-600 text-white' : ''}
          ${product.rank > 3 ? 'bg-[var(--ugly-darker)] text-[var(--ugly-pink)] border-2 border-[var(--ugly-pink)]' : ''}
        `}>
          #{product.rank}
        </div>

        {/* Image */}
        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex-grow min-w-0">
          <h3 className="font-bold text-white truncate">{product.name}</h3>
          <div className="flex items-center gap-2 text-sm">
            <span className="ugly-badge bg-[var(--ugly-purple)] text-white text-xs">
              {product.motif}
            </span>
            <span className="text-gray-400">{product.total_votes} votes</span>
          </div>
        </div>

        {/* Ugliness Score */}
        <div className="flex-shrink-0 text-right">
          <div className={`
            text-2xl font-bold
            ${product.ugliness_percent >= 80 ? 'neon-text-green' : ''}
            ${product.ugliness_percent >= 50 && product.ugliness_percent < 80 ? 'text-[var(--ugly-yellow)]' : ''}
            ${product.ugliness_percent < 50 ? 'text-gray-400' : ''}
          `}>
            {product.ugliness_percent.toFixed(0)}%
          </div>
          <div className="text-xs text-gray-400 uppercase">Ugly</div>
        </div>

        {/* Crown for #1 */}
        {product.rank === 1 && (
          <span className="text-3xl animate-wiggle">👑</span>
        )}
      </div>
    </Link>
  );
}
