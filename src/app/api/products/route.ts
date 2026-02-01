import { NextResponse } from 'next/server';
import { getProducts } from '@/lib/product-service';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const motif = searchParams.get('motif') || undefined;
  const category = searchParams.get('category') || undefined;
  const limit = parseInt(searchParams.get('limit') || '1000');

  try {
    const products = await getProducts({ motif, category, limit });
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
