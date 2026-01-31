import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
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

    // Save vote to database
    await sql`
      INSERT INTO votes (product_id, session_id, vote_type)
      VALUES (${productId}, ${sessionId || null}, ${voteType})
    `;

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
    // Get weekly rankings from database
    const rankings = await sql`
      SELECT
        product_id,
        COUNT(*) as total_votes,
        COUNT(CASE WHEN vote_type = 'ugly' THEN 1 END) as ugly_votes,
        ROUND(COUNT(CASE WHEN vote_type = 'ugly' THEN 1 END)::numeric /
              NULLIF(COUNT(*), 0) * 100, 1) as ugliness_percent
      FROM votes
      WHERE created_at > NOW() - INTERVAL '7 days'
      GROUP BY product_id
      ORDER BY ugly_votes DESC
      LIMIT 20
    `;

    return NextResponse.json(rankings);
  } catch (error) {
    console.error('Error fetching votes:', error);
    return NextResponse.json({ error: 'Failed to fetch votes' }, { status: 500 });
  }
}
