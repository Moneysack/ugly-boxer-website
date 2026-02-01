-- FIX: ID-Spalte in uglyboxer.com Tabelle hinzufügen und auto-increment aktivieren

-- 1. Zuerst prüfen ob es eine id-Spalte gibt und sie ist null
-- Wenn id-Spalte existiert aber alle null sind:
ALTER TABLE "uglyboxer.com"
DROP COLUMN IF EXISTS id;

-- 2. Neue ID-Spalte mit Auto-Increment hinzufügen
ALTER TABLE "uglyboxer.com"
ADD COLUMN id SERIAL PRIMARY KEY;

-- 3. Prüfen ob es funktioniert hat
SELECT id, "Name", img_url FROM "uglyboxer.com" ORDER BY id LIMIT 5;

-- Fertig! Jetzt sollten alle Produkte IDs haben (1, 2, 3, 4, 5, ...)
