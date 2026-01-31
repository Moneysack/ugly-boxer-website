-- Votes-Tabelle in Supabase erstellen
-- Führe dieses Script in deinem Supabase SQL Editor aus

-- 1. Votes-Tabelle erstellen
CREATE TABLE IF NOT EXISTS votes (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  session_id TEXT,
  vote_type TEXT NOT NULL CHECK (vote_type IN ('ugly', 'not_ugly')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Index für schnellere Abfragen
CREATE INDEX IF NOT EXISTS idx_votes_product_id ON votes(product_id);
CREATE INDEX IF NOT EXISTS idx_votes_created_at ON votes(created_at);
CREATE INDEX IF NOT EXISTS idx_votes_session_id ON votes(session_id);

-- 3. Foreign Key zu UglyBoxers (optional, falls du sicherstellen willst, dass product_id existiert)
-- ALTER TABLE votes ADD CONSTRAINT fk_votes_product
--   FOREIGN KEY (product_id) REFERENCES "UglyBoxers"(id) ON DELETE CASCADE;

-- 4. Row Level Security (RLS) aktivieren
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;

-- 5. Policy: Jeder kann Votes lesen
CREATE POLICY "Votes sind öffentlich lesbar"
  ON votes
  FOR SELECT
  TO public
  USING (true);

-- 6. Policy: Jeder kann Votes erstellen (für anonymous voting)
CREATE POLICY "Jeder kann voten"
  ON votes
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Fertig! Jetzt kannst du Votes in Supabase speichern.
