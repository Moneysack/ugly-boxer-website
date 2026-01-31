import { supabase, SupabaseProduct } from './supabase';
import { sql } from './db';
import { Product, Price } from '@/types';
import { mapSupabaseToProduct } from './product-mapper';

/**
 * Fetches products from Supabase and enriches them with vote data from Neon
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

    // 2. Get vote stats from Neon for these products
    const productIds = supabaseProducts.map((p: SupabaseProduct) => p.id);

    const voteStats = await sql`
      SELECT
        product_id,
        COUNT(*) as vote_count,
        COUNT(CASE WHEN vote_type = 'ugly' THEN 1 END) as ugly_votes,
        ROUND(COUNT(CASE WHEN vote_type = 'ugly' THEN 1 END)::numeric /
              NULLIF(COUNT(*), 0) * 100, 1) as ugliness_percent
      FROM votes
      WHERE product_id = ANY(${productIds})
      GROUP BY product_id
    `;

    // 3. Create lookup map for vote stats
    const voteStatsMap = new Map(
      voteStats.map((v: any) => [
        v.product_id,
        {
          vote_count: parseInt(v.vote_count) || 0,
          ugly_votes: parseInt(v.ugly_votes) || 0,
          ugliness_percent: parseFloat(v.ugliness_percent) || 0,
        },
      ])
    );

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
 * Fetches a single product by ID from Supabase with vote stats from Neon
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

    // 2. Get vote stats from Neon
    const voteStats = await sql`
      SELECT
        COUNT(*) as vote_count,
        COUNT(CASE WHEN vote_type = 'ugly' THEN 1 END) as ugly_votes,
        ROUND(COUNT(CASE WHEN vote_type = 'ugly' THEN 1 END)::numeric /
              NULLIF(COUNT(*), 0) * 100, 1) as ugliness_percent
      FROM votes
      WHERE product_id = ${id}
    `;

    const stats = voteStats[0]
      ? {
          vote_count: parseInt(voteStats[0].vote_count) || 0,
          ugly_votes: parseInt(voteStats[0].ugly_votes) || 0,
          ugliness_percent: parseFloat(voteStats[0].ugliness_percent) || 0,
        }
      : undefined;

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
