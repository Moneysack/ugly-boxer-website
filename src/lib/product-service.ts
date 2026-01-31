import { supabase, SupabaseProduct } from './supabase';
import { Product, Price } from '@/types';
import { mapSupabaseToProduct } from './product-mapper';

/**
 * Fetches products from Supabase and enriches them with vote data from Supabase
 */
export async function getProducts(filters?: {
  motif?: string;
  category?: string;
  limit?: number;
}): Promise<Product[]> {
  try {
    // 1. Fetch products from Supabase
    let query = supabase.from('UglyBoxers').select('*');

    if (filters?.limit) {
      query = query.limit(filters.limit);
    }

    const { data: supabaseProducts, error } = await query;

    if (error || !supabaseProducts) {
      console.error('Error fetching from Supabase:', error);
      return [];
    }

    if (supabaseProducts.length === 0) {
      return [];
    }

    // 2. Get vote stats from Supabase for these products
    const productIds = supabaseProducts.map((p: SupabaseProduct) => p.id);

    const { data: votes } = await supabase
      .from('votes')
      .select('product_id, vote_type')
      .in('product_id', productIds);

    // 3. Aggregate votes by product
    const voteStatsMap = new Map<number, { vote_count: number; ugly_votes: number; ugliness_percent: number }>();

    votes?.forEach((vote) => {
      const current = voteStatsMap.get(vote.product_id) || { vote_count: 0, ugly_votes: 0, ugliness_percent: 0 };
      current.vote_count++;
      if (vote.vote_type === 'ugly') current.ugly_votes++;
      voteStatsMap.set(vote.product_id, current);
    });

    // Calculate ugliness percentages
    voteStatsMap.forEach((stats, productId) => {
      stats.ugliness_percent = stats.vote_count > 0
        ? (stats.ugly_votes / stats.vote_count) * 100
        : 0;
    });

    // 4. Map and merge data
    let products = supabaseProducts.map((sp: SupabaseProduct) =>
      mapSupabaseToProduct(sp, voteStatsMap.get(sp.id))
    );

    // 5. Apply client-side filters (since Supabase doesn't have these fields)
    if (filters?.motif) {
      products = products.filter((p) => p.motif === filters.motif);
    }
    if (filters?.category) {
      products = products.filter((p) => p.category === filters.category);
    }

    return products;
  } catch (error) {
    console.error('Error in getProducts:', error);
    return [];
  }
}

/**
 * Fetches a single product by ID from Supabase with vote stats from Supabase
 */
export async function getProductById(id: number): Promise<Product | null> {
  try {
    // 1. Fetch product from Supabase
    const { data, error } = await supabase
      .from('UglyBoxers')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      console.error('Error fetching product from Supabase:', error);
      return null;
    }

    // 2. Get vote stats from Supabase
    const { data: votes } = await supabase
      .from('votes')
      .select('vote_type')
      .eq('product_id', id);

    let stats = undefined;
    if (votes && votes.length > 0) {
      const vote_count = votes.length;
      const ugly_votes = votes.filter((v) => v.vote_type === 'ugly').length;
      const ugliness_percent = (ugly_votes / vote_count) * 100;

      stats = {
        vote_count,
        ugly_votes,
        ugliness_percent,
      };
    }

    return mapSupabaseToProduct(data, stats);
  } catch (error) {
    console.error('Error in getProductById:', error);
    return null;
  }
}

/**
 * Gets price/affiliate information for a product
 * Returns affiliate URL from Supabase formatted as a "price" entry
 */
export async function getProductPrices(productId: number): Promise<Price[]> {
  try {
    // Fetch affiliate URL from Supabase
    const { data } = await supabase
      .from('UglyBoxers')
      .select('affiliate_url, Name')
      .eq('id', productId)
      .single();

    if (data?.affiliate_url) {
      // Format as a single price entry
      return [
        {
          id: -1,
          product_id: productId,
          shop_id: -1,
          price: 0, // Price not available in Supabase
          original_price: null,
          affiliate_url: data.affiliate_url,
          in_stock: true,
          updated_at: new Date().toISOString(),
          shop: {
            id: -1,
            name: 'Amazon',
            logo_url: null,
            affiliate_network: 'amazon',
            affiliate_id: null,
            is_premium: false,
            created_at: new Date().toISOString(),
          },
        },
      ];
    }

    return [];
  } catch (error) {
    console.error('Error in getProductPrices:', error);
    return [];
  }
}
