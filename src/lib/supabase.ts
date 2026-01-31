import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

// TypeScript interface for Supabase product data
export interface SupabaseProduct {
  id: number;           // Added via ALTER TABLE
  Name: string;         // Note: Capital N!
  img_url: string;      // Amazon CDN URLs
  affiliate_url: string; // Amazon Affiliate Links
}

// Helper to check Supabase connection
export const isSupabaseConnected = () => {
  return !!supabaseUrl && !!supabaseKey;
};
