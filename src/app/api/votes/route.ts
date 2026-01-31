import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { VotePayload } from '@/types';

export async function POST(request: Request) {
  try {
    const body: VotePayload = await request.json();
    const { productId, voteType, sessionId } = body;

    // Validate input
    if (!productId || !voteType || !['ugly', 'not_ugly'].includes(voteType)) {
      return NextResponse.json(
        { error: 'Invalid vote data' },
        { status: 400 }
      );
    }

    // Save vote to Supabase
    const { error } = await supabase
      .from('votes')
      .insert({
        product_id: productId,
        session_id: sessionId || null,
        vote_type: voteType,
      });

    if (error) {
      console.error('Supabase error saving vote:', error);
      return NextResponse.json(
        { error: 'Failed to save vote' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving vote:', error);
    return NextResponse.json(
      { error: 'Failed to save vote' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Get weekly rankings from Supabase
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    const { data: votes, error } = await supabase
      .from('votes')
      .select('product_id, vote_type')
      .gte('created_at', weekAgo.toISOString());

    if (error) {
      console.error('Supabase error fetching votes:', error);
      return NextResponse.json({ error: 'Failed to fetch votes' }, { status: 500 });
    }

    // Aggregate votes by product
    const votesByProduct = new Map<number, { total: number; ugly: number }>();

    votes?.forEach((vote) => {
      const current = votesByProduct.get(vote.product_id) || { total: 0, ugly: 0 };
      current.total++;
      if (vote.vote_type === 'ugly') current.ugly++;
      votesByProduct.set(vote.product_id, current);
    });

    // Format rankings
    const rankings = Array.from(votesByProduct.entries())
      .map(([product_id, stats]) => ({
        product_id,
        total_votes: stats.total,
        ugly_votes: stats.ugly,
        ugliness_percent: ((stats.ugly / stats.total) * 100).toFixed(1),
      }))
      .sort((a, b) => b.ugly_votes - a.ugly_votes)
      .slice(0, 20);

    return NextResponse.json(rankings);
  } catch (error) {
    console.error('Error fetching votes:', error);
    return NextResponse.json({ error: 'Failed to fetch votes' }, { status: 500 });
  }
}
