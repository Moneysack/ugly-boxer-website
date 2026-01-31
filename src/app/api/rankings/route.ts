import { NextResponse } from 'next/server';
import { getProducts } from '@/lib/product-service';

export async function GET() {
  try {
    // Get all products with vote stats
    const allProducts = await getProducts({ limit: 1000 });

    // Filter and rank by ugliness (only products with votes)
    const rankings = allProducts
      .filter((p) => (p.vote_count || 0) > 0)
      .sort((a, b) => {
        const aUgly = a.ugly_votes || 0;
        const bUgly = b.ugly_votes || 0;
        if (aUgly !== bUgly) return bUgly - aUgly;
        return (b.vote_count || 0) - (a.vote_count || 0);
      })
      .slice(0, 20);

    return NextResponse.json(rankings);
  } catch (error) {
    console.error('Error fetching rankings:', error);
    return NextResponse.json({ error: 'Failed to fetch rankings' }, { status: 500 });
  }
}
