'use client';

import { useState, useEffect } from 'react';
import { Header, Footer } from '@/components/layout';
import { VotingSwiper } from '@/components/features';
import { Product, VoteType } from '@/types';

export default function VotePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [votedIds, setVotedIds] = useState<number[]>([]);
  const [voteCount, setVoteCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load voted IDs from localStorage
    const saved = localStorage.getItem('uglyboxer_voted');
    const savedIds = saved ? JSON.parse(saved) : [];
    setVotedIds(savedIds);

    // Load vote count
    const count = localStorage.getItem('uglyboxer_vote_count');
    setVoteCount(count ? parseInt(count) : 0);

    // Fetch products from API and exclude already voted
    async function fetchProducts() {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        const formattedProducts = data.map((p: Record<string, unknown>) => ({
          ...p,
          min_price: p.min_price ? parseFloat(p.min_price as string) : undefined,
          vote_count: parseInt(p.vote_count as string) || 0,
          ugly_votes: parseInt(p.ugly_votes as string) || 0,
          ugliness_percent: parseFloat(p.ugliness_percent as string) || 0
        }));
        // Shuffle and exclude already voted
        const shuffled = formattedProducts
          .filter((p: Product) => !savedIds.includes(p.id))
          .sort(() => Math.random() - 0.5);
        setProducts(shuffled);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
      setLoading(false);
    }
    fetchProducts();
  }, []);

  const handleVote = async (productId: number, voteType: VoteType) => {
    // Save vote locally
    const newVotedIds = [...votedIds, productId];
    setVotedIds(newVotedIds);
    localStorage.setItem('uglyboxer_voted', JSON.stringify(newVotedIds));

    // Update vote count
    const newCount = voteCount + 1;
    setVoteCount(newCount);
    localStorage.setItem('uglyboxer_vote_count', newCount.toString());

    // In production, send to API
    try {
      await fetch('/api/votes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId,
          voteType,
          sessionId: getSessionId(),
        }),
      });
    } catch {
      // Silently fail - vote is saved locally
      console.log('Vote saved locally');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow py-8 px-4">
        <div className="max-w-lg mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl neon-text-pink mb-2">
              Vote: Ugly or Not?
            </h1>
            <p className="text-gray-400">
              Swipe right for UGLY 🤮 | Swipe left for NOT UGLY 👎
            </p>
          </div>

          {/* Vote Counter */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 ugly-badge bg-[var(--ugly-purple)] text-white px-4 py-2">
              <span className="text-xl">🔥</span>
              <span className="font-bold">{voteCount} votes cast</span>
            </div>
          </div>

          {/* Voting Swiper */}
          {loading ? (
            <div className="text-center py-12">
              <div className="text-6xl animate-pulse-neon mb-4">🩲</div>
              <p className="text-gray-400">Loading ugly underwear...</p>
            </div>
          ) : (
            <VotingSwiper products={products} onVote={handleVote} />
          )}

          {/* Tips */}
          <div className="mt-8 text-center text-gray-500 text-sm">
            <p>💡 Tip: Use the buttons below the card if you prefer clicking!</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

// Generate a persistent session ID
function getSessionId(): string {
  let sessionId = localStorage.getItem('uglyboxer_session');
  if (!sessionId) {
    sessionId = 'session_' + Math.random().toString(36).substring(2, 15);
    localStorage.setItem('uglyboxer_session', sessionId);
  }
  return sessionId;
}
