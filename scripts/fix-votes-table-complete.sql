-- KOMPLETTE LÖSUNG: Votes Tabelle neu erstellen und PostgREST Cache aktualisieren
-- Führe dieses komplette Script im Supabase SQL Editor aus

-- 1. Alte Tabelle löschen (falls vorhanden)
DROP TABLE IF EXISTS votes CASCADE;

-- 2. Neue Tabelle erstellen
CREATE TABLE votes (
  id BIGSERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  session_id TEXT,
  vote_type TEXT NOT NULL CHECK (vote_type IN ('ugly', 'not_ugly')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Indizes erstellen für Performance
CREATE INDEX idx_votes_product_id ON votes(product_id);
CREATE INDEX idx_votes_created_at ON votes(created_at);
CREATE INDEX idx_votes_session_id ON votes(session_id);

-- 4. Row Level Security aktivieren
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;

-- 5. Policy: Jeder kann Votes lesen (wichtig für anon key!)
DROP POLICY IF EXISTS "Enable read access for all users" ON votes;
CREATE POLICY "Enable read access for all users"
  ON votes
  FOR SELECT
  TO public
  USING (true);

-- 6. Policy: Jeder kann Votes erstellen (wichtig für anon key!)
DROP POLICY IF EXISTS "Enable insert access for all users" ON votes;
CREATE POLICY "Enable insert access for all users"
  ON votes
  FOR INSERT
  TO public
  WITH CHECK (true);

-- 7. WICHTIG: Schema Cache neu laden
NOTIFY pgrst, 'reload schema';

-- 8. Test-Vote einfügen zum Prüfen
INSERT INTO votes (product_id, session_id, vote_type)
VALUES (1, 'test-setup', 'ugly');

-- 9. Prüfen ob es funktioniert hat
SELECT
  'SUCCESS! Votes table created with ' || COUNT(*) || ' test vote' as status
FROM votes;

-- Fertig! Wenn du "SUCCESS!" siehst, funktioniert alles.
