import { cache } from 'react';
import { supabase, SupabaseProduct } from './supabase';
import { Product, Price } from '@/types';
import { mapSupabaseToProduct } from './product-mapper';

/**
 * Fetches products from Supabase with React cache() for request deduplication.
 */
export const getProducts = cache(async (filters?: {
  motif?: string;
  category?: string;
  limit?: number;
}): Promise<Product[]> => {
  try {
    let query = supabase.from('uglyboxer.com').select('*');

    const limit = filters?.limit || 1000;
    query = query.limit(limit);

    const { data: supabaseProducts, error } = await query;

    if (error || !supabaseProducts) {
      console.error('Error fetching from Supabase:', error);
      return [];
    }

    if (supabaseProducts.length === 0) {
      return [];
    }

    let products = supabaseProducts.map((sp: SupabaseProduct) =>
      mapSupabaseToProduct(sp)
    );

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
});

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
    const { data } = await supabase
      .from('uglyboxer.com')
      .select('affiliate_url, Name')
      .eq('id', productId)
      .single();

    if (data?.affiliate_url) {
      return [
        {
          id: -1,
          product_id: productId,
          shop_id: -1,
          price: 0,
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

/**
 * Gets related products based on motif/category/color matching.
 * Returns up to `limit` products, excluding the current product.
 */
export async function getRelatedProducts(
  currentProduct: Product,
  limit: number = 6
): Promise<Product[]> {
  const allProducts = await getProducts();
  const others = allProducts.filter((p) => p.id !== currentProduct.id);

  const scored = others.map((p) => {
    let score = 0;
    if (p.motif === currentProduct.motif) score += 3;
    if (p.category === currentProduct.category) score += 2;
    const sharedColors = p.colors.filter((c) => currentProduct.colors.includes(c));
    score += sharedColors.length;
    return { product: p, score };
  });

  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return Math.random() - 0.5;
  });

  return scored.slice(0, limit).map((s) => s.product);
}
