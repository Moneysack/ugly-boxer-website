import { Product } from '@/types';
import { SupabaseProduct } from './supabase';

/**
 * Infers motif category from product name
 */
function inferMotif(name: string): string {
  const lowerName = name.toLowerCase();

  // Animal themes
  if (lowerName.includes('shark') || lowerName.includes('sharky')) return 'Animal';
  if (lowerName.includes('leo') || lowerName.includes('leopard') || lowerName.includes('tiger')) return 'Animal';
  if (lowerName.includes('duck') || lowerName.includes('ducky')) return 'Animal';
  if (lowerName.includes('cat') || lowerName.includes('dog') || lowerName.includes('pug')) return 'Animal';
  if (lowerName.includes('llama') || lowerName.includes('sloth') || lowerName.includes('flamingo')) return 'Animal';
  if (lowerName.includes('unicorn') || lowerName.includes('dinosaur') || lowerName.includes('corgi')) return 'Animal';

  // Food themes
  if (lowerName.includes('pizza')) return 'Pizza';
  if (lowerName.includes('taco') || lowerName.includes('sushi') || lowerName.includes('bacon')) return 'Food';
  if (lowerName.includes('avocado') || lowerName.includes('donut')) return 'Food';

  // Other themes
  if (lowerName.includes('alien') || lowerName.includes('ufo')) return 'Alien';
  if (lowerName.includes('meme') || lowerName.includes('doge')) return 'Meme';
  if (lowerName.includes('gym') || lowerName.includes('fitness') || lowerName.includes('workout')) return 'Fitness';
  if (lowerName.includes('volleyball') || lowerName.includes('sport')) return 'Sports';
  if (lowerName.includes('graffiti') || lowerName.includes('street art')) return 'Graffiti';
  if (lowerName.includes('christmas') || lowerName.includes('halloween')) return 'Holiday';
  if (lowerName.includes('retro') || lowerName.includes('90s') || lowerName.includes('vintage')) return 'Retro';
  if (lowerName.includes('tech') || lowerName.includes('error') || lowerName.includes('404')) return 'Tech';

  // Default
  return 'Random';
}

/**
 * Infers category from product name
 */
function inferCategory(name: string): string {
  const lowerName = name.toLowerCase();

  if (lowerName.includes('volleyball')) return 'Volleyball';
  if (lowerName.includes('fitness') || lowerName.includes('gym') || lowerName.includes('sport')) return 'Fitness';
  if (lowerName.includes('party') || lowerName.includes('fun')) return 'Party';

  return 'Classic';
}

/**
 * Extracts color information from product name
 */
function extractColors(name: string): string[] {
  const lowerName = name.toLowerCase();
  const colors: string[] = [];

  const colorMap: Record<string, string> = {
    'red': 'Red',
    'blue': 'Blue',
    'green': 'Green',
    'yellow': 'Yellow',
    'pink': 'Pink',
    'purple': 'Purple',
    'orange': 'Orange',
    'black': 'Black',
    'white': 'White',
    'grey': 'Grey',
    'gray': 'Grey',
    'brown': 'Brown',
    'gold': 'Gold',
    'silver': 'Silver',
  };

  for (const [key, value] of Object.entries(colorMap)) {
    if (lowerName.includes(key)) {
      colors.push(value);
    }
  }

  // Return default if no colors found
  return colors.length > 0 ? colors : ['Multicolor'];
}

/**
 * Maps a Supabase product to the application's Product type
 */
export function mapSupabaseToProduct(
  supabaseProduct: SupabaseProduct,
  voteStats?: {
    vote_count?: number;
    ugly_votes?: number;
    ugliness_percent?: number;
  }
): Product {
  return {
    id: supabaseProduct.id,
    name: supabaseProduct.Name, // Supabase uses capital N
    description: null, // Not available in Supabase
    motif: inferMotif(supabaseProduct.Name),
    category: inferCategory(supabaseProduct.Name),
    colors: extractColors(supabaseProduct.Name),
    image_url: supabaseProduct.img_url,
    is_user_upload: false,
    created_at: new Date().toISOString(), // No created_at in Supabase
    min_price: undefined, // Will be populated from affiliate_url if needed
    vote_count: voteStats?.vote_count,
    ugly_votes: voteStats?.ugly_votes,
    ugliness_percent: voteStats?.ugliness_percent,
  };
}
