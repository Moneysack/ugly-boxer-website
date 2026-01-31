-- UglyBoxer Database Schema
-- Run this in your Neon SQL Editor

-- Drop existing tables (if recreating)
DROP TABLE IF EXISTS votes CASCADE;
DROP TABLE IF EXISTS prices CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS shops CASCADE;

-- Create shops table
CREATE TABLE shops (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  logo_url TEXT,
  affiliate_network VARCHAR(50),
  affiliate_id VARCHAR(100),
  is_premium BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create products table
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  motif VARCHAR(100) NOT NULL,
  category VARCHAR(100),
  colors TEXT[],
  image_url TEXT NOT NULL,
  is_user_upload BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create prices table
CREATE TABLE prices (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  shop_id INTEGER REFERENCES shops(id) ON DELETE CASCADE,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  affiliate_url TEXT,
  in_stock BOOLEAN DEFAULT TRUE,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create votes table
CREATE TABLE votes (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  session_id VARCHAR(255),
  vote_type VARCHAR(20) NOT NULL CHECK (vote_type IN ('ugly', 'not_ugly')),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_votes_product ON votes(product_id);
CREATE INDEX idx_votes_created ON votes(created_at);
CREATE INDEX idx_prices_product ON prices(product_id);
CREATE INDEX idx_products_motif ON products(motif);
CREATE INDEX idx_products_category ON products(category);

-- ============================================
-- SEED DATA
-- ============================================

-- Insert shops
INSERT INTO shops (name, logo_url, affiliate_network, affiliate_id, is_premium) VALUES
  ('Amazon.de', '/images/shops/amazon.png', 'amazon', 'uglyboxer-21', false),
  ('Otto', '/images/shops/otto.png', 'awin', '12345', false),
  ('Zalando', '/images/shops/zalando.png', 'awin', '67890', true),
  ('SOXO', '/images/shops/soxo.png', 'direct', NULL, false),
  ('Etsy', '/images/shops/etsy.png', 'awin', '11111', false);

-- Insert 50 products
INSERT INTO products (name, description, motif, category, colors, image_url) VALUES
  -- Pizza Theme (5)
  ('Pizza Paradise Boxer', 'Pepperoni slices all over your most private areas', 'Pizza', 'Classic', ARRAY['Red', 'Yellow', 'Beige'], 'https://placehold.co/400x400/FF10F0/white?text=Pizza+Paradise'),
  ('Pizza Slice Madness', 'Giant pizza slices pattern - cheesy in every way', 'Pizza', 'Party', ARRAY['Orange', 'Red'], 'https://placehold.co/400x400/39FF14/black?text=Pizza+Madness'),
  ('I Love Pizza Briefs', 'Heart-shaped pizzas for the romantic foodie', 'Pizza', 'Classic', ARRAY['Pink', 'Red'], 'https://placehold.co/400x400/FF10F0/white?text=Love+Pizza'),
  ('Pizza Face Boxer', 'Smiling pizza faces that judge you', 'Pizza', 'Party', ARRAY['Yellow', 'Red', 'Green'], 'https://placehold.co/400x400/FFFF00/black?text=Pizza+Face'),
  ('Pizza Delivery Shorts', 'Pizza boxes and scooters - 30 min or free', 'Pizza', 'Classic', ARRAY['Blue', 'Red'], 'https://placehold.co/400x400/BF00FF/white?text=Pizza+Delivery'),

  -- Alien Theme (5)
  ('Green Alien Invasion', 'Little green men everywhere - they come in peace', 'Alien', 'Party', ARRAY['Green', 'Black'], 'https://placehold.co/400x400/39FF14/black?text=Alien+Invasion'),
  ('UFO Abduction Boxer', 'Cows being abducted - udderly ridiculous', 'Alien', 'Party', ARRAY['Purple', 'Green', 'Black'], 'https://placehold.co/400x400/BF00FF/white?text=UFO+Abduction'),
  ('Area 51 Special', 'Top secret alien pattern - classified underwear', 'Alien', 'Classic', ARRAY['Grey', 'Green'], 'https://placehold.co/400x400/39FF14/black?text=Area+51'),
  ('ET Phone Home', 'Cute aliens with phones trying to call home', 'Alien', 'Classic', ARRAY['Blue', 'Green'], 'https://placehold.co/400x400/00FFFF/black?text=ET+Phone'),
  ('Space Invaders Retro', '8-bit alien invasion for your bits', 'Alien', 'Party', ARRAY['Black', 'Green', 'White'], 'https://placehold.co/400x400/39FF14/black?text=Space+Invaders'),

  -- Animal Theme (10)
  ('Crazy Cat Lady', 'Too many cats pattern - never enough cats', 'Animal', 'Classic', ARRAY['Orange', 'White', 'Grey'], 'https://placehold.co/400x400/FF6700/white?text=Crazy+Cat'),
  ('Pug Life Boxer', 'Pugs in sunglasses living their best life', 'Animal', 'Party', ARRAY['Beige', 'Black'], 'https://placehold.co/400x400/FF10F0/white?text=Pug+Life'),
  ('Llama Drama', 'Dramatic llamas everywhere - so much drama', 'Animal', 'Party', ARRAY['White', 'Pink', 'Purple'], 'https://placehold.co/400x400/BF00FF/white?text=Llama+Drama'),
  ('Sloth Mode Activated', 'Lazy sloths hanging around doing nothing', 'Animal', 'Classic', ARRAY['Brown', 'Green'], 'https://placehold.co/400x400/39FF14/black?text=Sloth+Mode'),
  ('Flamingo Fever', 'Pink flamingos standing on one leg', 'Animal', 'Party', ARRAY['Pink', 'White'], 'https://placehold.co/400x400/FF10F0/white?text=Flamingo'),
  ('Corgi Butt Parade', 'Corgi butts in a row - the cutest parade', 'Animal', 'Party', ARRAY['Orange', 'White'], 'https://placehold.co/400x400/FF6700/white?text=Corgi+Butt'),
  ('Shark Attack Brief', 'Sharks with laser eyes - jaw-some!', 'Animal', 'Fitness', ARRAY['Blue', 'Grey'], 'https://placehold.co/400x400/00FFFF/black?text=Shark+Attack'),
  ('Unicorn Rainbow', 'Magical unicorns doing magical things', 'Animal', 'Party', ARRAY['Rainbow', 'White'], 'https://placehold.co/400x400/FF10F0/white?text=Unicorn'),
  ('Duck Face', 'Ducks making selfie faces - quack quack', 'Animal', 'Party', ARRAY['Yellow', 'Orange'], 'https://placehold.co/400x400/FFFF00/black?text=Duck+Face'),
  ('Dinosaur Roar', 'T-Rex trying to clap - arms too short', 'Animal', 'Classic', ARRAY['Green', 'Orange'], 'https://placehold.co/400x400/39FF14/black?text=Dino+Roar'),

  -- Meme Theme (10)
  ('Doge Much Wow', 'Such pattern, very boxer, much comfort, wow', 'Meme', 'Party', ARRAY['Yellow', 'Brown'], 'https://placehold.co/400x400/FFFF00/black?text=Much+Wow'),
  ('Pepe Feels Good', 'Rare pepe collection for your rare regions', 'Meme', 'Party', ARRAY['Green', 'White'], 'https://placehold.co/400x400/39FF14/black?text=Feels+Good'),
  ('This Is Fine Boxer', 'Dog in burning room - everything is fine', 'Meme', 'Party', ARRAY['Orange', 'Red', 'Yellow'], 'https://placehold.co/400x400/FF6700/white?text=This+Is+Fine'),
  ('Surprised Pikachu', 'Shocked faces pattern - can not believe', 'Meme', 'Party', ARRAY['Yellow', 'Black'], 'https://placehold.co/400x400/FFFF00/black?text=Surprised'),
  ('Distracted Boyfriend', 'That meme, but on underwear - iconic', 'Meme', 'Party', ARRAY['Red', 'Blue'], 'https://placehold.co/400x400/FF10F0/white?text=Distracted'),
  ('Stonks Man Brief', 'Economy going up - stonks only go up', 'Meme', 'Classic', ARRAY['Green', 'Blue'], 'https://placehold.co/400x400/39FF14/black?text=STONKS'),
  ('Crying Jordan', 'MJ crying face tiled - for when you lose', 'Meme', 'Fitness', ARRAY['Grey', 'Blue'], 'https://placehold.co/400x400/00FFFF/black?text=Crying+Jordan'),
  ('Galaxy Brain', 'Expanding brain meme - big brain energy', 'Meme', 'Party', ARRAY['Purple', 'Blue', 'Pink'], 'https://placehold.co/400x400/BF00FF/white?text=Galaxy+Brain'),
  ('Ight Imma Head Out', 'SpongeBob leaving - mood', 'Meme', 'Party', ARRAY['Yellow', 'Brown'], 'https://placehold.co/400x400/FFFF00/black?text=Head+Out'),
  ('Woman Yelling at Cat', 'That dinner table meme - confused cat', 'Meme', 'Party', ARRAY['White', 'Orange'], 'https://placehold.co/400x400/FF6700/white?text=Cat+Meme'),

  -- Food Theme (5)
  ('Taco Tuesday', 'Tacos raining down - every day is taco day', 'Food', 'Party', ARRAY['Yellow', 'Orange', 'Green'], 'https://placehold.co/400x400/FFFF00/black?text=Taco+Tuesday'),
  ('Sushi Roll Brief', 'Cute sushi faces rolling around', 'Food', 'Classic', ARRAY['White', 'Pink', 'Green'], 'https://placehold.co/400x400/FF10F0/white?text=Sushi+Roll'),
  ('Bacon Strip Boxer', 'Crispy bacon pattern - sizzling hot', 'Food', 'Classic', ARRAY['Red', 'Pink', 'Brown'], 'https://placehold.co/400x400/FF6700/white?text=Bacon'),
  ('Avocado Toast', 'Millennial favorite - extra smashed', 'Food', 'Classic', ARRAY['Green', 'Brown'], 'https://placehold.co/400x400/39FF14/black?text=Avocado'),
  ('Donut Worry', 'Sprinkled donuts - donut worry be happy', 'Food', 'Party', ARRAY['Pink', 'Rainbow'], 'https://placehold.co/400x400/FF10F0/white?text=Donut'),

  -- Sports/Fitness Theme (5)
  ('Gym Bro Boxer', 'Dumbbells and protein - do you even lift?', 'Fitness', 'Fitness', ARRAY['Black', 'Red'], 'https://placehold.co/400x400/FF10F0/white?text=Gym+Bro'),
  ('Volleyball Spike', 'Balls and nets pattern - spike it!', 'Sports', 'Volleyball', ARRAY['Blue', 'Yellow', 'White'], 'https://placehold.co/400x400/FFFF00/black?text=Volleyball'),
  ('Beach Volleyball', 'Sand and sunset vibes - summer forever', 'Sports', 'Volleyball', ARRAY['Orange', 'Blue'], 'https://placehold.co/400x400/FF6700/white?text=Beach+VB'),
  ('Never Skip Leg Day', 'Chicken legs pattern - leg day reminder', 'Fitness', 'Fitness', ARRAY['Yellow', 'Black'], 'https://placehold.co/400x400/FFFF00/black?text=Leg+Day'),
  ('Yoga Pose Brief', 'Stick figures doing yoga - namaste', 'Fitness', 'Fitness', ARRAY['Purple', 'Blue'], 'https://placehold.co/400x400/BF00FF/white?text=Yoga'),

  -- Graffiti/Art Theme (5)
  ('Street Art Chaos', 'Random graffiti tags - urban style', 'Graffiti', 'Party', ARRAY['Rainbow', 'Black'], 'https://placehold.co/400x400/FF10F0/white?text=Street+Art'),
  ('Neon Spray Paint', 'Dripping neon colors - fresh off the wall', 'Graffiti', 'Party', ARRAY['Pink', 'Green', 'Yellow'], 'https://placehold.co/400x400/39FF14/black?text=Neon+Spray'),
  ('Banksy Wannabe', 'Stencil art style - deep and meaningful', 'Graffiti', 'Classic', ARRAY['Black', 'White', 'Red'], 'https://placehold.co/400x400/FF10F0/white?text=Banksy'),
  ('Pop Art Boxer', 'Warhol style repeats - 15 min of fame', 'Graffiti', 'Party', ARRAY['Pink', 'Yellow', 'Blue'], 'https://placehold.co/400x400/FFFF00/black?text=Pop+Art'),
  ('Comic Book Pow', 'Action words explosion - POW BAM ZOOM', 'Graffiti', 'Party', ARRAY['Yellow', 'Red', 'Blue'], 'https://placehold.co/400x400/FF6700/white?text=POW'),

  -- Random Ugly (5)
  ('Christmas in July', 'Santa in sunglasses - ho ho hot', 'Holiday', 'Party', ARRAY['Red', 'Green', 'White'], 'https://placehold.co/400x400/39FF14/black?text=Xmas+July'),
  ('Dad Joke Central', 'Puns written all over - groan worthy', 'Random', 'Classic', ARRAY['White', 'Black'], 'https://placehold.co/400x400/FFFF00/black?text=Dad+Jokes'),
  ('90s Geometric', 'Memphis design chaos - totally rad', 'Retro', 'Party', ARRAY['Pink', 'Teal', 'Yellow'], 'https://placehold.co/400x400/00FFFF/black?text=90s+Retro'),
  ('Rubber Ducky Army', 'Yellow ducks formation - quack attack', 'Random', 'Party', ARRAY['Yellow', 'Blue'], 'https://placehold.co/400x400/FFFF00/black?text=Rubber+Ducky'),
  ('Error 404 Brief', 'Underwear not found - glitch aesthetic', 'Tech', 'Classic', ARRAY['Blue', 'White'], 'https://placehold.co/400x400/00FFFF/black?text=404+Error');

-- Insert prices for products (multiple shops per product)
INSERT INTO prices (product_id, shop_id, price, original_price, affiliate_url, in_stock) VALUES
  -- Pizza products
  (1, 1, 14.99, 19.99, 'https://amazon.de/dp/PIZZA1?tag=uglyboxer-21', true),
  (1, 2, 16.99, NULL, 'https://otto.de/p/pizza1', true),
  (1, 3, 15.49, 18.99, 'https://zalando.de/pizza1', true),
  (2, 1, 12.99, NULL, 'https://amazon.de/dp/PIZZA2?tag=uglyboxer-21', true),
  (2, 4, 11.99, 14.99, 'https://soxo.de/pizza2', true),
  (3, 1, 13.99, NULL, 'https://amazon.de/dp/PIZZA3?tag=uglyboxer-21', true),
  (3, 5, 18.99, NULL, 'https://etsy.com/listing/pizza3', true),
  (4, 2, 15.99, NULL, 'https://otto.de/p/pizza4', true),
  (5, 1, 11.99, 15.99, 'https://amazon.de/dp/PIZZA5?tag=uglyboxer-21', true),
  (5, 3, 14.99, NULL, 'https://zalando.de/pizza5', false),

  -- Alien products
  (6, 1, 11.99, 14.99, 'https://amazon.de/dp/ALIEN1?tag=uglyboxer-21', true),
  (6, 4, 10.99, NULL, 'https://soxo.de/alien1', true),
  (7, 2, 18.99, NULL, 'https://otto.de/p/alien2', true),
  (7, 5, 22.99, 27.99, 'https://etsy.com/listing/alien2', true),
  (8, 1, 13.99, NULL, 'https://amazon.de/dp/ALIEN3?tag=uglyboxer-21', true),
  (9, 3, 16.99, NULL, 'https://zalando.de/alien4', true),
  (10, 1, 12.99, 16.99, 'https://amazon.de/dp/ALIEN5?tag=uglyboxer-21', true),

  -- Animal products
  (11, 1, 14.99, NULL, 'https://amazon.de/dp/ANIMAL1?tag=uglyboxer-21', true),
  (11, 2, 15.99, 19.99, 'https://otto.de/p/animal1', true),
  (12, 4, 9.99, NULL, 'https://soxo.de/animal2', true),
  (13, 5, 24.99, NULL, 'https://etsy.com/listing/animal3', true),
  (14, 1, 11.99, NULL, 'https://amazon.de/dp/ANIMAL4?tag=uglyboxer-21', true),
  (15, 3, 17.99, 22.99, 'https://zalando.de/animal5', true),
  (16, 1, 13.99, NULL, 'https://amazon.de/dp/ANIMAL6?tag=uglyboxer-21', true),
  (17, 2, 14.99, NULL, 'https://otto.de/p/animal7', true),
  (18, 5, 29.99, NULL, 'https://etsy.com/listing/animal8', true),
  (19, 1, 10.99, 13.99, 'https://amazon.de/dp/ANIMAL9?tag=uglyboxer-21', true),
  (20, 4, 12.99, NULL, 'https://soxo.de/animal10', true),

  -- Meme products
  (21, 1, 15.99, NULL, 'https://amazon.de/dp/MEME1?tag=uglyboxer-21', true),
  (21, 5, 19.99, NULL, 'https://etsy.com/listing/meme1', true),
  (22, 1, 14.99, 18.99, 'https://amazon.de/dp/MEME2?tag=uglyboxer-21', true),
  (23, 2, 16.99, NULL, 'https://otto.de/p/meme3', true),
  (24, 1, 12.99, NULL, 'https://amazon.de/dp/MEME4?tag=uglyboxer-21', true),
  (25, 3, 18.99, 24.99, 'https://zalando.de/meme5', true),
  (26, 1, 13.99, NULL, 'https://amazon.de/dp/MEME6?tag=uglyboxer-21', true),
  (27, 4, 11.99, NULL, 'https://soxo.de/meme7', true),
  (28, 5, 21.99, NULL, 'https://etsy.com/listing/meme8', true),
  (29, 1, 14.99, NULL, 'https://amazon.de/dp/MEME9?tag=uglyboxer-21', true),
  (30, 2, 15.99, 19.99, 'https://otto.de/p/meme10', true),

  -- Food products
  (31, 1, 12.99, NULL, 'https://amazon.de/dp/FOOD1?tag=uglyboxer-21', true),
  (32, 3, 16.99, NULL, 'https://zalando.de/food2', true),
  (33, 1, 11.99, 14.99, 'https://amazon.de/dp/FOOD3?tag=uglyboxer-21', true),
  (34, 4, 13.99, NULL, 'https://soxo.de/food4', true),
  (35, 5, 18.99, NULL, 'https://etsy.com/listing/food5', true),

  -- Sports products
  (36, 1, 16.99, NULL, 'https://amazon.de/dp/SPORT1?tag=uglyboxer-21', true),
  (36, 2, 17.99, 22.99, 'https://otto.de/p/sport1', true),
  (37, 3, 19.99, NULL, 'https://zalando.de/sport2', true),
  (38, 1, 15.99, NULL, 'https://amazon.de/dp/SPORT3?tag=uglyboxer-21', true),
  (39, 4, 12.99, NULL, 'https://soxo.de/sport4', true),
  (40, 1, 14.99, 18.99, 'https://amazon.de/dp/SPORT5?tag=uglyboxer-21', true),

  -- Graffiti products
  (41, 5, 24.99, NULL, 'https://etsy.com/listing/graffiti1', true),
  (42, 1, 13.99, NULL, 'https://amazon.de/dp/GRAFFITI2?tag=uglyboxer-21', true),
  (43, 2, 15.99, 19.99, 'https://otto.de/p/graffiti3', true),
  (44, 3, 17.99, NULL, 'https://zalando.de/graffiti4', true),
  (45, 1, 12.99, NULL, 'https://amazon.de/dp/GRAFFITI5?tag=uglyboxer-21', true),

  -- Random products
  (46, 1, 14.99, 18.99, 'https://amazon.de/dp/RANDOM1?tag=uglyboxer-21', true),
  (47, 4, 11.99, NULL, 'https://soxo.de/random2', true),
  (48, 5, 19.99, NULL, 'https://etsy.com/listing/random3', true),
  (49, 1, 10.99, NULL, 'https://amazon.de/dp/RANDOM4?tag=uglyboxer-21', true),
  (50, 2, 13.99, 16.99, 'https://otto.de/p/random5', true);

-- Insert seed votes for initial ranking
INSERT INTO votes (product_id, session_id, vote_type, created_at) VALUES
  -- Most ugly: Green Alien Invasion (product 6)
  (6, 'seed-1', 'ugly', NOW() - INTERVAL '1 day'),
  (6, 'seed-2', 'ugly', NOW() - INTERVAL '1 day'),
  (6, 'seed-3', 'ugly', NOW() - INTERVAL '2 days'),
  (6, 'seed-4', 'ugly', NOW() - INTERVAL '2 days'),
  (6, 'seed-5', 'ugly', NOW() - INTERVAL '3 days'),
  (6, 'seed-6', 'not_ugly', NOW() - INTERVAL '3 days'),

  -- Second: Doge Much Wow (product 21)
  (21, 'seed-1', 'ugly', NOW() - INTERVAL '1 day'),
  (21, 'seed-2', 'ugly', NOW() - INTERVAL '2 days'),
  (21, 'seed-3', 'ugly', NOW() - INTERVAL '2 days'),
  (21, 'seed-4', 'ugly', NOW() - INTERVAL '3 days'),
  (21, 'seed-5', 'not_ugly', NOW() - INTERVAL '3 days'),

  -- Third: Pizza Paradise (product 1)
  (1, 'seed-1', 'ugly', NOW() - INTERVAL '1 day'),
  (1, 'seed-2', 'ugly', NOW() - INTERVAL '2 days'),
  (1, 'seed-3', 'ugly', NOW() - INTERVAL '3 days'),
  (1, 'seed-4', 'not_ugly', NOW() - INTERVAL '4 days'),

  -- Fourth: Corgi Butt Parade (product 16)
  (16, 'seed-1', 'ugly', NOW() - INTERVAL '1 day'),
  (16, 'seed-2', 'ugly', NOW() - INTERVAL '2 days'),
  (16, 'seed-3', 'ugly', NOW() - INTERVAL '3 days'),

  -- Fifth: This Is Fine (product 23)
  (23, 'seed-1', 'ugly', NOW() - INTERVAL '2 days'),
  (23, 'seed-2', 'ugly', NOW() - INTERVAL '3 days'),
  (23, 'seed-3', 'not_ugly', NOW() - INTERVAL '4 days'),

  -- Random votes for variety
  (11, 'seed-1', 'ugly', NOW() - INTERVAL '2 days'),
  (11, 'seed-2', 'not_ugly', NOW() - INTERVAL '3 days'),
  (31, 'seed-1', 'ugly', NOW() - INTERVAL '1 day'),
  (37, 'seed-1', 'ugly', NOW() - INTERVAL '2 days'),
  (42, 'seed-1', 'ugly', NOW() - INTERVAL '3 days'),
  (48, 'seed-1', 'ugly', NOW() - INTERVAL '4 days');

-- ============================================
-- USEFUL QUERIES
-- ============================================

-- Weekly Ugliness Ranking
-- SELECT
--   p.id, p.name, p.image_url, p.motif,
--   COUNT(v.id) as total_votes,
--   COUNT(CASE WHEN v.vote_type = 'ugly' THEN 1 END) as ugly_votes,
--   ROUND(COUNT(CASE WHEN v.vote_type = 'ugly' THEN 1 END)::numeric /
--         NULLIF(COUNT(v.id), 0) * 100, 1) as ugliness_percent
-- FROM products p
-- LEFT JOIN votes v ON p.id = v.product_id
--   AND v.created_at > NOW() - INTERVAL '7 days'
-- GROUP BY p.id
-- HAVING COUNT(v.id) > 0
-- ORDER BY ugly_votes DESC, total_votes DESC
-- LIMIT 10;

-- Product with prices
-- SELECT p.*,
--   MIN(pr.price) as min_price,
--   json_agg(json_build_object(
--     'shop', s.name,
--     'price', pr.price,
--     'url', pr.affiliate_url
--   )) as prices
-- FROM products p
-- LEFT JOIN prices pr ON p.id = pr.product_id
-- LEFT JOIN shops s ON pr.shop_id = s.id
-- WHERE p.id = 1
-- GROUP BY p.id;
