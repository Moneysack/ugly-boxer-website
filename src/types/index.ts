// Product Types
export interface Product {
  id: number;
  name: string;
  description: string | null;
  motif: string;
  category: string | null;
  colors: string[];
  image_url: string;
  is_user_upload: boolean;
  created_at: string;
  // Computed fields from joins
  min_price?: number;
  vote_count?: number;
  ugly_votes?: number;
  ugliness_percent?: number;
}

export interface Shop {
  id: number;
  name: string;
  logo_url: string | null;
  affiliate_network: 'amazon' | 'awin' | 'direct' | null;
  affiliate_id: string | null;
  is_premium: boolean;
  created_at: string;
}

export interface Price {
  id: number;
  product_id: number;
  shop_id: number;
  price: number;
  original_price: number | null;
  affiliate_url: string | null;
  in_stock: boolean;
  updated_at: string;
  // Joined fields
  shop?: Shop;
}

export interface Vote {
  id: number;
  product_id: number;
  session_id: string | null;
  vote_type: 'ugly' | 'not_ugly';
  created_at: string;
}

// API Response Types
export interface ProductWithPrices extends Product {
  prices: Price[];
}

export interface RankedProduct extends Product {
  rank: number;
  total_votes: number;
  ugly_votes: number;
  ugliness_percent: number;
}

// Filter Types
export interface ProductFilters {
  motif?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'price' | 'ugliness' | 'newest' | 'votes';
}

// Vote Types
export type VoteType = 'ugly' | 'not_ugly';

export interface VotePayload {
  productId: number;
  voteType: VoteType;
  sessionId: string;
}

// Motif and Category Constants
export const MOTIFS = [
  'Pizza',
  'Alien',
  'Animal',
  'Meme',
  'Food',
  'Sports',
  'Fitness',
  'Graffiti',
  'Holiday',
  'Retro',
  'Tech',
  'Random',
] as const;

export const CATEGORIES = [
  'Classic',
  'Party',
  'Fitness',
  'Volleyball',
] as const;

export type Motif = typeof MOTIFS[number];
export type Category = typeof CATEGORIES[number];
