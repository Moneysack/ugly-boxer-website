import { neon } from '@neondatabase/serverless';

const DATABASE_URL = 'postgresql://neondb_owner:npg_Yc1OVG7lILqf@ep-gentle-band-agq0yv0p-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require';

const sql = neon(DATABASE_URL);

async function seed() {
  console.log('🌱 Starting database seed...\n');

  // Drop existing tables
  console.log('Dropping existing tables...');
  await sql`DROP TABLE IF EXISTS votes CASCADE`;
  await sql`DROP TABLE IF EXISTS prices CASCADE`;
  await sql`DROP TABLE IF EXISTS products CASCADE`;
  await sql`DROP TABLE IF EXISTS shops CASCADE`;

  // Create shops table
  console.log('Creating shops table...');
  await sql`
    CREATE TABLE shops (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      logo_url TEXT,
      affiliate_network VARCHAR(50),
      affiliate_id VARCHAR(100),
      is_premium BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `;

  // Create products table
  console.log('Creating products table...');
  await sql`
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
    )
  `;

  // Create prices table
  console.log('Creating prices table...');
  await sql`
    CREATE TABLE prices (
      id SERIAL PRIMARY KEY,
      product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
      shop_id INTEGER REFERENCES shops(id) ON DELETE CASCADE,
      price DECIMAL(10,2) NOT NULL,
      original_price DECIMAL(10,2),
      affiliate_url TEXT,
      in_stock BOOLEAN DEFAULT TRUE,
      updated_at TIMESTAMP DEFAULT NOW()
    )
  `;

  // Create votes table
  console.log('Creating votes table...');
  await sql`
    CREATE TABLE votes (
      id SERIAL PRIMARY KEY,
      product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
      session_id VARCHAR(255),
      vote_type VARCHAR(20) NOT NULL CHECK (vote_type IN ('ugly', 'not_ugly')),
      created_at TIMESTAMP DEFAULT NOW()
    )
  `;

  // Create indexes
  console.log('Creating indexes...');
  await sql`CREATE INDEX idx_votes_product ON votes(product_id)`;
  await sql`CREATE INDEX idx_votes_created ON votes(created_at)`;
  await sql`CREATE INDEX idx_prices_product ON prices(product_id)`;
  await sql`CREATE INDEX idx_products_motif ON products(motif)`;
  await sql`CREATE INDEX idx_products_category ON products(category)`;

  // Insert shops
  console.log('Inserting shops...');
  await sql`
    INSERT INTO shops (name, logo_url, affiliate_network, affiliate_id, is_premium) VALUES
      ('Amazon.de', '/images/shops/amazon.png', 'amazon', 'uglyboxer-21', false),
      ('Otto', '/images/shops/otto.png', 'awin', '12345', false),
      ('Zalando', '/images/shops/zalando.png', 'awin', '67890', true),
      ('SOXO', '/images/shops/soxo.png', 'direct', NULL, false),
      ('Etsy', '/images/shops/etsy.png', 'awin', '11111', false)
  `;

  // Insert products
  console.log('Inserting 50 products...');

  const products = [
    // Pizza Theme (5)
    ['Pizza Paradise Boxer', 'Pepperoni slices all over your most private areas', 'Pizza', 'Classic', ['Red', 'Yellow', 'Beige'], 'https://placehold.co/400x400/FF10F0/white?text=Pizza+Paradise'],
    ['Pizza Slice Madness', 'Giant pizza slices pattern - cheesy in every way', 'Pizza', 'Party', ['Orange', 'Red'], 'https://placehold.co/400x400/39FF14/black?text=Pizza+Madness'],
    ['I Love Pizza Briefs', 'Heart-shaped pizzas for the romantic foodie', 'Pizza', 'Classic', ['Pink', 'Red'], 'https://placehold.co/400x400/FF10F0/white?text=Love+Pizza'],
    ['Pizza Face Boxer', 'Smiling pizza faces that judge you', 'Pizza', 'Party', ['Yellow', 'Red', 'Green'], 'https://placehold.co/400x400/FFFF00/black?text=Pizza+Face'],
    ['Pizza Delivery Shorts', 'Pizza boxes and scooters - 30 min or free', 'Pizza', 'Classic', ['Blue', 'Red'], 'https://placehold.co/400x400/BF00FF/white?text=Pizza+Delivery'],

    // Alien Theme (5)
    ['Green Alien Invasion', 'Little green men everywhere - they come in peace', 'Alien', 'Party', ['Green', 'Black'], 'https://placehold.co/400x400/39FF14/black?text=Alien+Invasion'],
    ['UFO Abduction Boxer', 'Cows being abducted - udderly ridiculous', 'Alien', 'Party', ['Purple', 'Green', 'Black'], 'https://placehold.co/400x400/BF00FF/white?text=UFO+Abduction'],
    ['Area 51 Special', 'Top secret alien pattern - classified underwear', 'Alien', 'Classic', ['Grey', 'Green'], 'https://placehold.co/400x400/39FF14/black?text=Area+51'],
    ['ET Phone Home', 'Cute aliens with phones trying to call home', 'Alien', 'Classic', ['Blue', 'Green'], 'https://placehold.co/400x400/00FFFF/black?text=ET+Phone'],
    ['Space Invaders Retro', '8-bit alien invasion for your bits', 'Alien', 'Party', ['Black', 'Green', 'White'], 'https://placehold.co/400x400/39FF14/black?text=Space+Invaders'],

    // Animal Theme (10)
    ['Crazy Cat Lady', 'Too many cats pattern - never enough cats', 'Animal', 'Classic', ['Orange', 'White', 'Grey'], 'https://placehold.co/400x400/FF6700/white?text=Crazy+Cat'],
    ['Pug Life Boxer', 'Pugs in sunglasses living their best life', 'Animal', 'Party', ['Beige', 'Black'], 'https://placehold.co/400x400/FF10F0/white?text=Pug+Life'],
    ['Llama Drama', 'Dramatic llamas everywhere - so much drama', 'Animal', 'Party', ['White', 'Pink', 'Purple'], 'https://placehold.co/400x400/BF00FF/white?text=Llama+Drama'],
    ['Sloth Mode Activated', 'Lazy sloths hanging around doing nothing', 'Animal', 'Classic', ['Brown', 'Green'], 'https://placehold.co/400x400/39FF14/black?text=Sloth+Mode'],
    ['Flamingo Fever', 'Pink flamingos standing on one leg', 'Animal', 'Party', ['Pink', 'White'], 'https://placehold.co/400x400/FF10F0/white?text=Flamingo'],
    ['Corgi Butt Parade', 'Corgi butts in a row - the cutest parade', 'Animal', 'Party', ['Orange', 'White'], 'https://placehold.co/400x400/FF6700/white?text=Corgi+Butt'],
    ['Shark Attack Brief', 'Sharks with laser eyes - jaw-some!', 'Animal', 'Fitness', ['Blue', 'Grey'], 'https://placehold.co/400x400/00FFFF/black?text=Shark+Attack'],
    ['Unicorn Rainbow', 'Magical unicorns doing magical things', 'Animal', 'Party', ['Rainbow', 'White'], 'https://placehold.co/400x400/FF10F0/white?text=Unicorn'],
    ['Duck Face', 'Ducks making selfie faces - quack quack', 'Animal', 'Party', ['Yellow', 'Orange'], 'https://placehold.co/400x400/FFFF00/black?text=Duck+Face'],
    ['Dinosaur Roar', 'T-Rex trying to clap - arms too short', 'Animal', 'Classic', ['Green', 'Orange'], 'https://placehold.co/400x400/39FF14/black?text=Dino+Roar'],

    // Meme Theme (10)
    ['Doge Much Wow', 'Such pattern, very boxer, much comfort, wow', 'Meme', 'Party', ['Yellow', 'Brown'], 'https://placehold.co/400x400/FFFF00/black?text=Much+Wow'],
    ['Pepe Feels Good', 'Rare pepe collection for your rare regions', 'Meme', 'Party', ['Green', 'White'], 'https://placehold.co/400x400/39FF14/black?text=Feels+Good'],
    ['This Is Fine Boxer', 'Dog in burning room - everything is fine', 'Meme', 'Party', ['Orange', 'Red', 'Yellow'], 'https://placehold.co/400x400/FF6700/white?text=This+Is+Fine'],
    ['Surprised Pikachu', 'Shocked faces pattern - can not believe', 'Meme', 'Party', ['Yellow', 'Black'], 'https://placehold.co/400x400/FFFF00/black?text=Surprised'],
    ['Distracted Boyfriend', 'That meme, but on underwear - iconic', 'Meme', 'Party', ['Red', 'Blue'], 'https://placehold.co/400x400/FF10F0/white?text=Distracted'],
    ['Stonks Man Brief', 'Economy going up - stonks only go up', 'Meme', 'Classic', ['Green', 'Blue'], 'https://placehold.co/400x400/39FF14/black?text=STONKS'],
    ['Crying Jordan', 'MJ crying face tiled - for when you lose', 'Meme', 'Fitness', ['Grey', 'Blue'], 'https://placehold.co/400x400/00FFFF/black?text=Crying+Jordan'],
    ['Galaxy Brain', 'Expanding brain meme - big brain energy', 'Meme', 'Party', ['Purple', 'Blue', 'Pink'], 'https://placehold.co/400x400/BF00FF/white?text=Galaxy+Brain'],
    ['Ight Imma Head Out', 'SpongeBob leaving - mood', 'Meme', 'Party', ['Yellow', 'Brown'], 'https://placehold.co/400x400/FFFF00/black?text=Head+Out'],
    ['Woman Yelling at Cat', 'That dinner table meme - confused cat', 'Meme', 'Party', ['White', 'Orange'], 'https://placehold.co/400x400/FF6700/white?text=Cat+Meme'],

    // Food Theme (5)
    ['Taco Tuesday', 'Tacos raining down - every day is taco day', 'Food', 'Party', ['Yellow', 'Orange', 'Green'], 'https://placehold.co/400x400/FFFF00/black?text=Taco+Tuesday'],
    ['Sushi Roll Brief', 'Cute sushi faces rolling around', 'Food', 'Classic', ['White', 'Pink', 'Green'], 'https://placehold.co/400x400/FF10F0/white?text=Sushi+Roll'],
    ['Bacon Strip Boxer', 'Crispy bacon pattern - sizzling hot', 'Food', 'Classic', ['Red', 'Pink', 'Brown'], 'https://placehold.co/400x400/FF6700/white?text=Bacon'],
    ['Avocado Toast', 'Millennial favorite - extra smashed', 'Food', 'Classic', ['Green', 'Brown'], 'https://placehold.co/400x400/39FF14/black?text=Avocado'],
    ['Donut Worry', 'Sprinkled donuts - donut worry be happy', 'Food', 'Party', ['Pink', 'Rainbow'], 'https://placehold.co/400x400/FF10F0/white?text=Donut'],

    // Sports/Fitness Theme (5)
    ['Gym Bro Boxer', 'Dumbbells and protein - do you even lift?', 'Fitness', 'Fitness', ['Black', 'Red'], 'https://placehold.co/400x400/FF10F0/white?text=Gym+Bro'],
    ['Volleyball Spike', 'Balls and nets pattern - spike it!', 'Sports', 'Volleyball', ['Blue', 'Yellow', 'White'], 'https://placehold.co/400x400/FFFF00/black?text=Volleyball'],
    ['Beach Volleyball', 'Sand and sunset vibes - summer forever', 'Sports', 'Volleyball', ['Orange', 'Blue'], 'https://placehold.co/400x400/FF6700/white?text=Beach+VB'],
    ['Never Skip Leg Day', 'Chicken legs pattern - leg day reminder', 'Fitness', 'Fitness', ['Yellow', 'Black'], 'https://placehold.co/400x400/FFFF00/black?text=Leg+Day'],
    ['Yoga Pose Brief', 'Stick figures doing yoga - namaste', 'Fitness', 'Fitness', ['Purple', 'Blue'], 'https://placehold.co/400x400/BF00FF/white?text=Yoga'],

    // Graffiti/Art Theme (5)
    ['Street Art Chaos', 'Random graffiti tags - urban style', 'Graffiti', 'Party', ['Rainbow', 'Black'], 'https://placehold.co/400x400/FF10F0/white?text=Street+Art'],
    ['Neon Spray Paint', 'Dripping neon colors - fresh off the wall', 'Graffiti', 'Party', ['Pink', 'Green', 'Yellow'], 'https://placehold.co/400x400/39FF14/black?text=Neon+Spray'],
    ['Banksy Wannabe', 'Stencil art style - deep and meaningful', 'Graffiti', 'Classic', ['Black', 'White', 'Red'], 'https://placehold.co/400x400/FF10F0/white?text=Banksy'],
    ['Pop Art Boxer', 'Warhol style repeats - 15 min of fame', 'Graffiti', 'Party', ['Pink', 'Yellow', 'Blue'], 'https://placehold.co/400x400/FFFF00/black?text=Pop+Art'],
    ['Comic Book Pow', 'Action words explosion - POW BAM ZOOM', 'Graffiti', 'Party', ['Yellow', 'Red', 'Blue'], 'https://placehold.co/400x400/FF6700/white?text=POW'],

    // Random Ugly (5)
    ['Christmas in July', 'Santa in sunglasses - ho ho hot', 'Holiday', 'Party', ['Red', 'Green', 'White'], 'https://placehold.co/400x400/39FF14/black?text=Xmas+July'],
    ['Dad Joke Central', 'Puns written all over - groan worthy', 'Random', 'Classic', ['White', 'Black'], 'https://placehold.co/400x400/FFFF00/black?text=Dad+Jokes'],
    ['90s Geometric', 'Memphis design chaos - totally rad', 'Retro', 'Party', ['Pink', 'Teal', 'Yellow'], 'https://placehold.co/400x400/00FFFF/black?text=90s+Retro'],
    ['Rubber Ducky Army', 'Yellow ducks formation - quack attack', 'Random', 'Party', ['Yellow', 'Blue'], 'https://placehold.co/400x400/FFFF00/black?text=Rubber+Ducky'],
    ['Error 404 Brief', 'Underwear not found - glitch aesthetic', 'Tech', 'Classic', ['Blue', 'White'], 'https://placehold.co/400x400/00FFFF/black?text=404+Error'],
  ];

  for (const [name, description, motif, category, colors, image_url] of products) {
    await sql`
      INSERT INTO products (name, description, motif, category, colors, image_url)
      VALUES (${name}, ${description}, ${motif}, ${category}, ${colors}, ${image_url})
    `;
  }

  // Insert prices
  console.log('Inserting prices...');
  const prices = [
    [1, 1, 14.99, 19.99, 'https://amazon.de/dp/PIZZA1?tag=uglyboxer-21'],
    [1, 2, 16.99, null, 'https://otto.de/p/pizza1'],
    [1, 3, 15.49, 18.99, 'https://zalando.de/pizza1'],
    [2, 1, 12.99, null, 'https://amazon.de/dp/PIZZA2?tag=uglyboxer-21'],
    [2, 4, 11.99, 14.99, 'https://soxo.de/pizza2'],
    [3, 1, 13.99, null, 'https://amazon.de/dp/PIZZA3?tag=uglyboxer-21'],
    [3, 5, 18.99, null, 'https://etsy.com/listing/pizza3'],
    [4, 2, 15.99, null, 'https://otto.de/p/pizza4'],
    [5, 1, 11.99, 15.99, 'https://amazon.de/dp/PIZZA5?tag=uglyboxer-21'],
    [6, 1, 11.99, 14.99, 'https://amazon.de/dp/ALIEN1?tag=uglyboxer-21'],
    [6, 4, 10.99, null, 'https://soxo.de/alien1'],
    [7, 2, 18.99, null, 'https://otto.de/p/alien2'],
    [7, 5, 22.99, 27.99, 'https://etsy.com/listing/alien2'],
    [8, 1, 13.99, null, 'https://amazon.de/dp/ALIEN3?tag=uglyboxer-21'],
    [9, 3, 16.99, null, 'https://zalando.de/alien4'],
    [10, 1, 12.99, 16.99, 'https://amazon.de/dp/ALIEN5?tag=uglyboxer-21'],
    [11, 1, 14.99, null, 'https://amazon.de/dp/ANIMAL1?tag=uglyboxer-21'],
    [11, 2, 15.99, 19.99, 'https://otto.de/p/animal1'],
    [12, 4, 9.99, null, 'https://soxo.de/animal2'],
    [13, 5, 24.99, null, 'https://etsy.com/listing/animal3'],
    [14, 1, 11.99, null, 'https://amazon.de/dp/ANIMAL4?tag=uglyboxer-21'],
    [15, 3, 17.99, 22.99, 'https://zalando.de/animal5'],
    [16, 1, 13.99, null, 'https://amazon.de/dp/ANIMAL6?tag=uglyboxer-21'],
    [17, 2, 14.99, null, 'https://otto.de/p/animal7'],
    [18, 5, 29.99, null, 'https://etsy.com/listing/animal8'],
    [19, 1, 10.99, 13.99, 'https://amazon.de/dp/ANIMAL9?tag=uglyboxer-21'],
    [20, 4, 12.99, null, 'https://soxo.de/animal10'],
    [21, 1, 15.99, null, 'https://amazon.de/dp/MEME1?tag=uglyboxer-21'],
    [21, 5, 19.99, null, 'https://etsy.com/listing/meme1'],
    [22, 1, 14.99, 18.99, 'https://amazon.de/dp/MEME2?tag=uglyboxer-21'],
    [23, 2, 16.99, null, 'https://otto.de/p/meme3'],
    [24, 1, 12.99, null, 'https://amazon.de/dp/MEME4?tag=uglyboxer-21'],
    [25, 3, 18.99, 24.99, 'https://zalando.de/meme5'],
    [26, 1, 13.99, null, 'https://amazon.de/dp/MEME6?tag=uglyboxer-21'],
    [27, 4, 11.99, null, 'https://soxo.de/meme7'],
    [28, 5, 21.99, null, 'https://etsy.com/listing/meme8'],
    [29, 1, 14.99, null, 'https://amazon.de/dp/MEME9?tag=uglyboxer-21'],
    [30, 2, 15.99, 19.99, 'https://otto.de/p/meme10'],
    [31, 1, 12.99, null, 'https://amazon.de/dp/FOOD1?tag=uglyboxer-21'],
    [32, 3, 16.99, null, 'https://zalando.de/food2'],
    [33, 1, 11.99, 14.99, 'https://amazon.de/dp/FOOD3?tag=uglyboxer-21'],
    [34, 4, 13.99, null, 'https://soxo.de/food4'],
    [35, 5, 18.99, null, 'https://etsy.com/listing/food5'],
    [36, 1, 16.99, null, 'https://amazon.de/dp/SPORT1?tag=uglyboxer-21'],
    [36, 2, 17.99, 22.99, 'https://otto.de/p/sport1'],
    [37, 3, 19.99, null, 'https://zalando.de/sport2'],
    [38, 1, 15.99, null, 'https://amazon.de/dp/SPORT3?tag=uglyboxer-21'],
    [39, 4, 12.99, null, 'https://soxo.de/sport4'],
    [40, 1, 14.99, 18.99, 'https://amazon.de/dp/SPORT5?tag=uglyboxer-21'],
    [41, 5, 24.99, null, 'https://etsy.com/listing/graffiti1'],
    [42, 1, 13.99, null, 'https://amazon.de/dp/GRAFFITI2?tag=uglyboxer-21'],
    [43, 2, 15.99, 19.99, 'https://otto.de/p/graffiti3'],
    [44, 3, 17.99, null, 'https://zalando.de/graffiti4'],
    [45, 1, 12.99, null, 'https://amazon.de/dp/GRAFFITI5?tag=uglyboxer-21'],
    [46, 1, 14.99, 18.99, 'https://amazon.de/dp/RANDOM1?tag=uglyboxer-21'],
    [47, 4, 11.99, null, 'https://soxo.de/random2'],
    [48, 5, 19.99, null, 'https://etsy.com/listing/random3'],
    [49, 1, 10.99, null, 'https://amazon.de/dp/RANDOM4?tag=uglyboxer-21'],
    [50, 2, 13.99, 16.99, 'https://otto.de/p/random5'],
  ];

  for (const [product_id, shop_id, price, original_price, affiliate_url] of prices) {
    await sql`
      INSERT INTO prices (product_id, shop_id, price, original_price, affiliate_url)
      VALUES (${product_id}, ${shop_id}, ${price}, ${original_price}, ${affiliate_url})
    `;
  }

  // Insert seed votes
  console.log('Inserting seed votes...');
  const votes = [
    [6, 'seed-1', 'ugly'],
    [6, 'seed-2', 'ugly'],
    [6, 'seed-3', 'ugly'],
    [6, 'seed-4', 'ugly'],
    [6, 'seed-5', 'ugly'],
    [6, 'seed-6', 'not_ugly'],
    [21, 'seed-1', 'ugly'],
    [21, 'seed-2', 'ugly'],
    [21, 'seed-3', 'ugly'],
    [21, 'seed-4', 'ugly'],
    [21, 'seed-5', 'not_ugly'],
    [1, 'seed-1', 'ugly'],
    [1, 'seed-2', 'ugly'],
    [1, 'seed-3', 'ugly'],
    [1, 'seed-4', 'not_ugly'],
    [16, 'seed-1', 'ugly'],
    [16, 'seed-2', 'ugly'],
    [16, 'seed-3', 'ugly'],
    [23, 'seed-1', 'ugly'],
    [23, 'seed-2', 'ugly'],
    [23, 'seed-3', 'not_ugly'],
    [11, 'seed-1', 'ugly'],
    [11, 'seed-2', 'not_ugly'],
    [31, 'seed-1', 'ugly'],
    [37, 'seed-1', 'ugly'],
    [42, 'seed-1', 'ugly'],
    [48, 'seed-1', 'ugly'],
  ];

  for (const [product_id, session_id, vote_type] of votes) {
    await sql`
      INSERT INTO votes (product_id, session_id, vote_type)
      VALUES (${product_id}, ${session_id}, ${vote_type})
    `;
  }

  console.log('\n✅ Database seeded successfully!');
  console.log('   - 5 shops');
  console.log('   - 50 products');
  console.log('   - 60 prices');
  console.log('   - 27 seed votes');
}

seed().catch(console.error);
