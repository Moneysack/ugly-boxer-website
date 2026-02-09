import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { generateSlug } from '@/lib/slug-utils';

interface ProductCardProps {
  product: Product;
  showVotes?: boolean;
  rank?: number;
}

export function ProductCard({ product, showVotes = false, rank }: ProductCardProps) {
  const minPrice = product.min_price;

  return (
    <Link href={`/products/${product.id}-${generateSlug(product.name)}`}>
      <article className="ugly-card group cursor-pointer relative">
        {/* Rank Badge */}
        {rank && (
          <div className="absolute top-3 left-3 z-10">
            <span className={`
              inline-flex items-center justify-center w-10 h-10 rounded-full font-bold text-lg
              ${rank === 1 ? 'bg-[var(--ugly-yellow)] text-black neon-box-pink' : ''}
              ${rank === 2 ? 'bg-gray-300 text-black' : ''}
              ${rank === 3 ? 'bg-amber-600 text-white' : ''}
              ${rank > 3 ? 'bg-[var(--ugly-dark)] text-white border-2 border-[var(--ugly-pink)]' : ''}
            `}>
              #{rank}
            </span>
          </div>
        )}

        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-[var(--ugly-dark)]">
          <Image
            src={product.image_url}
            alt={`${product.name} - ${product.motif} Underwear`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />

          {/* Motif Badge */}
          <div className="absolute top-3 right-3">
            <span className="ugly-badge bg-[var(--ugly-purple)] text-white">
              {product.motif}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-[var(--ugly-pink)] transition-colors">
            {product.name}
          </h3>

          {/* Colors */}
          <div className="flex gap-1 mb-3">
            {product.colors.slice(0, 4).map((color, i) => (
              <span
                key={i}
                className="w-4 h-4 rounded-full border border-white/30"
                style={{ backgroundColor: getColorHex(color) }}
                title={color}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-xs text-gray-400">+{product.colors.length - 4}</span>
            )}
          </div>

          {/* Price and Votes */}
          <div className="flex items-center justify-between">
            {minPrice ? (
              <span className="price-tag">
                €{minPrice.toFixed(2)}
              </span>
            ) : (
              <span className="text-gray-400 text-sm">Price varies</span>
            )}

            {showVotes && product.vote_count !== undefined && (
              <div className="flex items-center gap-2">
                <span className="text-[var(--ugly-pink)] font-bold">
                  {product.ugliness_percent?.toFixed(0)}% Ugly
                </span>
                <span className="text-gray-400 text-xs">
                  ({product.vote_count} votes)
                </span>
              </div>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}

// Helper function to convert color names to hex
function getColorHex(colorName: string): string {
  const colorMap: Record<string, string> = {
    Red: '#FF0000',
    Yellow: '#FFFF00',
    Beige: '#F5F5DC',
    Orange: '#FF6700',
    Pink: '#FF10F0',
    Green: '#39FF14',
    Black: '#000000',
    White: '#FFFFFF',
    Purple: '#BF00FF',
    Blue: '#0066FF',
    Grey: '#808080',
    Gray: '#808080',
    Brown: '#8B4513',
    Rainbow: 'linear-gradient(90deg, red, orange, yellow, green, blue, violet)',
    Teal: '#008080',
  };

  return colorMap[colorName] || '#808080';
}
