import { supabase, SupabaseProduct } from './supabase';
import { Product, Price } from '@/types';
import { mapSupabaseToProduct } from './product-mapper';

/**
 * Fetches products from Supabase (NO VOTING)
 */
export async function getProducts(filters?: {
  motif?: string;
  category?: string;
  limit?: number;
}): Promise<Product[]> {
  try {
    // Fetch products from Supabase
    let query = supabase.from('uglyboxer.com').select('*');

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

    // Map products (no vote stats)
    let products = supabaseProducts.map((sp: SupabaseProduct) =>
      mapSupabaseToProduct(sp)
    );

    // Apply client-side filters
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
 * Fetches a single product by ID from Supabase (NO VOTING)
 */
export async function getProductById(id: number): Promise<Product | null> {
  try {
    const { data, error } = await supabase
      .from('uglyboxer.com')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      console.error('Error fetching product from Supabase:', error);
      return null;
    }

    return mapSupabaseToProduct(data);
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
      .from('uglyboxer.com')
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
