import { Header, Footer } from '@/components/layout';
import { Leaderboard } from '@/components/features';
import { sql } from '@/lib/db';
import { RankedProduct } from '@/types';
import Link from 'next/link';

export const metadata = {
  title: 'Ugliness Rankings - UglyBoxer',
  description: 'See the ugliest underwear ranked by the community. Weekly leaderboard of the most hideous boxers.',
};

async function getRankedProducts(): Promise<RankedProduct[]> {
  try {
    const rankings = await sql`
      SELECT
        p.*,
        COUNT(v.id) as total_votes,
        COUNT(CASE WHEN v.vote_type = 'ugly' THEN 1 END) as ugly_votes,
        ROUND(COUNT(CASE WHEN v.vote_type = 'ugly' THEN 1 END)::numeric /
              NULLIF(COUNT(v.id), 0) * 100, 1) as ugliness_percent
      FROM products p
      LEFT JOIN votes v ON p.id = v.product_id
        AND v.created_at > NOW() - INTERVAL '7 days'
      GROUP BY p.id
      HAVING COUNT(v.id) > 0
      ORDER BY ugly_votes DESC, total_votes DESC
      LIMIT 20
    `;
    return rankings.map(r => ({
      ...r,
      total_votes: parseInt(r.total_votes) || 0,
      ugly_votes: parseInt(r.ugly_votes) || 0,
      ugliness_percent: parseFloat(r.ugliness_percent) || 0
    })) as RankedProduct[];
  } catch (error) {
    console.error('Error fetching rankings:', error);
    return [];
  }
}

export default async function RankingPage() {
  const rankedProducts = await getRankedProducts();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl neon-text-pink mb-4">
              🏆 Weekly Ugliness Rankings
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              The community has spoken! Here are the ugliest underwear of the week,
              ranked by your votes.
            </p>
          </div>

          {/* Vote CTA */}
          <div className="ugly-card p-6 mb-8 text-center">
            <p className="text-lg mb-4">
              Help decide the ugliest underwear! Your vote shapes the rankings.
            </p>
            <Link href="/ranking/vote" className="neon-button neon-button-green">
              🤮 Vote Now
            </Link>
          </div>

          {/* Leaderboard */}
          <Leaderboard products={rankedProducts} />

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-4 text-center">
            <div className="ugly-card p-4">
              <div className="text-2xl font-bold neon-text-green">
                {rankedProducts.reduce((sum, p) => sum + p.total_votes, 0)}
              </div>
              <div className="text-gray-400 text-sm">Total Votes</div>
            </div>
            <div className="ugly-card p-4">
              <div className="text-2xl font-bold neon-text-pink">
                {rankedProducts.length}
              </div>
              <div className="text-gray-400 text-sm">Products Ranked</div>
            </div>
            <div className="ugly-card p-4">
              <div className="text-2xl font-bold neon-text-green">
                {rankedProducts[0]?.ugliness_percent.toFixed(0) || 0}%
              </div>
              <div className="text-gray-400 text-sm">Top Ugliness</div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
