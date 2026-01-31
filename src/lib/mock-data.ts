import { Product, Shop, Price, RankedProduct } from '@/types';

// Mock shops
export const mockShops: Shop[] = [
  { id: 1, name: 'Amazon.de', logo_url: '/images/shops/amazon.png', affiliate_network: 'amazon', affiliate_id: 'uglyboxer-21', is_premium: false, created_at: new Date().toISOString() },
  { id: 2, name: 'Otto', logo_url: '/images/shops/otto.png', affiliate_network: 'awin', affiliate_id: '12345', is_premium: false, created_at: new Date().toISOString() },
  { id: 3, name: 'Zalando', logo_url: '/images/shops/zalando.png', affiliate_network: 'awin', affiliate_id: '67890', is_premium: true, created_at: new Date().toISOString() },
  { id: 4, name: 'SOXO', logo_url: '/images/shops/soxo.png', affiliate_network: 'direct', affiliate_id: null, is_premium: false, created_at: new Date().toISOString() },
  { id: 5, name: 'Etsy', logo_url: '/images/shops/etsy.png', affiliate_network: 'awin', affiliate_id: '11111', is_premium: false, created_at: new Date().toISOString() },
];

// Mock products (50 products)
export const mockProducts: Product[] = [
  // Pizza Theme (5)
  { id: 1, name: 'Pizza Paradise Boxer', description: 'Pepperoni slices all over your most private areas', motif: 'Pizza', category: 'Classic', colors: ['Red', 'Yellow', 'Beige'], image_url: 'https://placehold.co/400x400/FF10F0/white?text=Pizza+Paradise', is_user_upload: false, created_at: new Date().toISOString(), min_price: 14.99, vote_count: 4, ugly_votes: 3, ugliness_percent: 75 },
  { id: 2, name: 'Pizza Slice Madness', description: 'Giant pizza slices pattern - cheesy in every way', motif: 'Pizza', category: 'Party', colors: ['Orange', 'Red'], image_url: 'https://placehold.co/400x400/39FF14/black?text=Pizza+Madness', is_user_upload: false, created_at: new Date().toISOString(), min_price: 11.99, vote_count: 2, ugly_votes: 1, ugliness_percent: 50 },
  { id: 3, name: 'I Love Pizza Briefs', description: 'Heart-shaped pizzas for the romantic foodie', motif: 'Pizza', category: 'Classic', colors: ['Pink', 'Red'], image_url: 'https://placehold.co/400x400/FF10F0/white?text=Love+Pizza', is_user_upload: false, created_at: new Date().toISOString(), min_price: 13.99 },
  { id: 4, name: 'Pizza Face Boxer', description: 'Smiling pizza faces that judge you', motif: 'Pizza', category: 'Party', colors: ['Yellow', 'Red', 'Green'], image_url: 'https://placehold.co/400x400/FFFF00/black?text=Pizza+Face', is_user_upload: false, created_at: new Date().toISOString(), min_price: 15.99 },
  { id: 5, name: 'Pizza Delivery Shorts', description: 'Pizza boxes and scooters - 30 min or free', motif: 'Pizza', category: 'Classic', colors: ['Blue', 'Red'], image_url: 'https://placehold.co/400x400/BF00FF/white?text=Pizza+Delivery', is_user_upload: false, created_at: new Date().toISOString(), min_price: 11.99 },

  // Alien Theme (5)
  { id: 6, name: 'Green Alien Invasion', description: 'Little green men everywhere - they come in peace', motif: 'Alien', category: 'Party', colors: ['Green', 'Black'], image_url: 'https://placehold.co/400x400/39FF14/black?text=Alien+Invasion', is_user_upload: false, created_at: new Date().toISOString(), min_price: 10.99, vote_count: 6, ugly_votes: 5, ugliness_percent: 83 },
  { id: 7, name: 'UFO Abduction Boxer', description: 'Cows being abducted - udderly ridiculous', motif: 'Alien', category: 'Party', colors: ['Purple', 'Green', 'Black'], image_url: 'https://placehold.co/400x400/BF00FF/white?text=UFO+Abduction', is_user_upload: false, created_at: new Date().toISOString(), min_price: 18.99 },
  { id: 8, name: 'Area 51 Special', description: 'Top secret alien pattern - classified underwear', motif: 'Alien', category: 'Classic', colors: ['Grey', 'Green'], image_url: 'https://placehold.co/400x400/39FF14/black?text=Area+51', is_user_upload: false, created_at: new Date().toISOString(), min_price: 13.99 },
  { id: 9, name: 'ET Phone Home', description: 'Cute aliens with phones trying to call home', motif: 'Alien', category: 'Classic', colors: ['Blue', 'Green'], image_url: 'https://placehold.co/400x400/00FFFF/black?text=ET+Phone', is_user_upload: false, created_at: new Date().toISOString(), min_price: 16.99 },
  { id: 10, name: 'Space Invaders Retro', description: '8-bit alien invasion for your bits', motif: 'Alien', category: 'Party', colors: ['Black', 'Green', 'White'], image_url: 'https://placehold.co/400x400/39FF14/black?text=Space+Invaders', is_user_upload: false, created_at: new Date().toISOString(), min_price: 12.99 },

  // Animal Theme (10)
  { id: 11, name: 'Crazy Cat Lady', description: 'Too many cats pattern - never enough cats', motif: 'Animal', category: 'Classic', colors: ['Orange', 'White', 'Grey'], image_url: 'https://placehold.co/400x400/FF6700/white?text=Crazy+Cat', is_user_upload: false, created_at: new Date().toISOString(), min_price: 14.99, vote_count: 2, ugly_votes: 1, ugliness_percent: 50 },
  { id: 12, name: 'Pug Life Boxer', description: 'Pugs in sunglasses living their best life', motif: 'Animal', category: 'Party', colors: ['Beige', 'Black'], image_url: 'https://placehold.co/400x400/FF10F0/white?text=Pug+Life', is_user_upload: false, created_at: new Date().toISOString(), min_price: 9.99 },
  { id: 13, name: 'Llama Drama', description: 'Dramatic llamas everywhere - so much drama', motif: 'Animal', category: 'Party', colors: ['White', 'Pink', 'Purple'], image_url: 'https://placehold.co/400x400/BF00FF/white?text=Llama+Drama', is_user_upload: false, created_at: new Date().toISOString(), min_price: 24.99 },
  { id: 14, name: 'Sloth Mode Activated', description: 'Lazy sloths hanging around doing nothing', motif: 'Animal', category: 'Classic', colors: ['Brown', 'Green'], image_url: 'https://placehold.co/400x400/39FF14/black?text=Sloth+Mode', is_user_upload: false, created_at: new Date().toISOString(), min_price: 11.99 },
  { id: 15, name: 'Flamingo Fever', description: 'Pink flamingos standing on one leg', motif: 'Animal', category: 'Party', colors: ['Pink', 'White'], image_url: 'https://placehold.co/400x400/FF10F0/white?text=Flamingo', is_user_upload: false, created_at: new Date().toISOString(), min_price: 17.99 },
  { id: 16, name: 'Corgi Butt Parade', description: 'Corgi butts in a row - the cutest parade', motif: 'Animal', category: 'Party', colors: ['Orange', 'White'], image_url: 'https://placehold.co/400x400/FF6700/white?text=Corgi+Butt', is_user_upload: false, created_at: new Date().toISOString(), min_price: 13.99, vote_count: 3, ugly_votes: 3, ugliness_percent: 100 },
  { id: 17, name: 'Shark Attack Brief', description: 'Sharks with laser eyes - jaw-some!', motif: 'Animal', category: 'Fitness', colors: ['Blue', 'Grey'], image_url: 'https://placehold.co/400x400/00FFFF/black?text=Shark+Attack', is_user_upload: false, created_at: new Date().toISOString(), min_price: 14.99 },
  { id: 18, name: 'Unicorn Rainbow', description: 'Magical unicorns doing magical things', motif: 'Animal', category: 'Party', colors: ['Rainbow', 'White'], image_url: 'https://placehold.co/400x400/FF10F0/white?text=Unicorn', is_user_upload: false, created_at: new Date().toISOString(), min_price: 29.99 },
  { id: 19, name: 'Duck Face', description: 'Ducks making selfie faces - quack quack', motif: 'Animal', category: 'Party', colors: ['Yellow', 'Orange'], image_url: 'https://placehold.co/400x400/FFFF00/black?text=Duck+Face', is_user_upload: false, created_at: new Date().toISOString(), min_price: 10.99 },
  { id: 20, name: 'Dinosaur Roar', description: 'T-Rex trying to clap - arms too short', motif: 'Animal', category: 'Classic', colors: ['Green', 'Orange'], image_url: 'https://placehold.co/400x400/39FF14/black?text=Dino+Roar', is_user_upload: false, created_at: new Date().toISOString(), min_price: 12.99 },

  // Meme Theme (10)
  { id: 21, name: 'Doge Much Wow', description: 'Such pattern, very boxer, much comfort, wow', motif: 'Meme', category: 'Party', colors: ['Yellow', 'Brown'], image_url: 'https://placehold.co/400x400/FFFF00/black?text=Much+Wow', is_user_upload: false, created_at: new Date().toISOString(), min_price: 15.99, vote_count: 5, ugly_votes: 4, ugliness_percent: 80 },
  { id: 22, name: 'Pepe Feels Good', description: 'Rare pepe collection for your rare regions', motif: 'Meme', category: 'Party', colors: ['Green', 'White'], image_url: 'https://placehold.co/400x400/39FF14/black?text=Feels+Good', is_user_upload: false, created_at: new Date().toISOString(), min_price: 14.99 },
  { id: 23, name: 'This Is Fine Boxer', description: 'Dog in burning room - everything is fine', motif: 'Meme', category: 'Party', colors: ['Orange', 'Red', 'Yellow'], image_url: 'https://placehold.co/400x400/FF6700/white?text=This+Is+Fine', is_user_upload: false, created_at: new Date().toISOString(), min_price: 16.99, vote_count: 3, ugly_votes: 2, ugliness_percent: 67 },
  { id: 24, name: 'Surprised Pikachu', description: 'Shocked faces pattern - can not believe', motif: 'Meme', category: 'Party', colors: ['Yellow', 'Black'], image_url: 'https://placehold.co/400x400/FFFF00/black?text=Surprised', is_user_upload: false, created_at: new Date().toISOString(), min_price: 12.99 },
  { id: 25, name: 'Distracted Boyfriend', description: 'That meme, but on underwear - iconic', motif: 'Meme', category: 'Party', colors: ['Red', 'Blue'], image_url: 'https://placehold.co/400x400/FF10F0/white?text=Distracted', is_user_upload: false, created_at: new Date().toISOString(), min_price: 18.99 },
  { id: 26, name: 'Stonks Man Brief', description: 'Economy going up - stonks only go up', motif: 'Meme', category: 'Classic', colors: ['Green', 'Blue'], image_url: 'https://placehold.co/400x400/39FF14/black?text=STONKS', is_user_upload: false, created_at: new Date().toISOString(), min_price: 13.99 },
  { id: 27, name: 'Crying Jordan', description: 'MJ crying face tiled - for when you lose', motif: 'Meme', category: 'Fitness', colors: ['Grey', 'Blue'], image_url: 'https://placehold.co/400x400/00FFFF/black?text=Crying+Jordan', is_user_upload: false, created_at: new Date().toISOString(), min_price: 11.99 },
  { id: 28, name: 'Galaxy Brain', description: 'Expanding brain meme - big brain energy', motif: 'Meme', category: 'Party', colors: ['Purple', 'Blue', 'Pink'], image_url: 'https://placehold.co/400x400/BF00FF/white?text=Galaxy+Brain', is_user_upload: false, created_at: new Date().toISOString(), min_price: 21.99 },
  { id: 29, name: 'Ight Imma Head Out', description: 'SpongeBob leaving - mood', motif: 'Meme', category: 'Party', colors: ['Yellow', 'Brown'], image_url: 'https://placehold.co/400x400/FFFF00/black?text=Head+Out', is_user_upload: false, created_at: new Date().toISOString(), min_price: 14.99 },
  { id: 30, name: 'Woman Yelling at Cat', description: 'That dinner table meme - confused cat', motif: 'Meme', category: 'Party', colors: ['White', 'Orange'], image_url: 'https://placehold.co/400x400/FF6700/white?text=Cat+Meme', is_user_upload: false, created_at: new Date().toISOString(), min_price: 15.99 },

  // Food Theme (5)
  { id: 31, name: 'Taco Tuesday', description: 'Tacos raining down - every day is taco day', motif: 'Food', category: 'Party', colors: ['Yellow', 'Orange', 'Green'], image_url: 'https://placehold.co/400x400/FFFF00/black?text=Taco+Tuesday', is_user_upload: false, created_at: new Date().toISOString(), min_price: 12.99, vote_count: 1, ugly_votes: 1, ugliness_percent: 100 },
  { id: 32, name: 'Sushi Roll Brief', description: 'Cute sushi faces rolling around', motif: 'Food', category: 'Classic', colors: ['White', 'Pink', 'Green'], image_url: 'https://placehold.co/400x400/FF10F0/white?text=Sushi+Roll', is_user_upload: false, created_at: new Date().toISOString(), min_price: 16.99 },
  { id: 33, name: 'Bacon Strip Boxer', description: 'Crispy bacon pattern - sizzling hot', motif: 'Food', category: 'Classic', colors: ['Red', 'Pink', 'Brown'], image_url: 'https://placehold.co/400x400/FF6700/white?text=Bacon', is_user_upload: false, created_at: new Date().toISOString(), min_price: 11.99 },
  { id: 34, name: 'Avocado Toast', description: 'Millennial favorite - extra smashed', motif: 'Food', category: 'Classic', colors: ['Green', 'Brown'], image_url: 'https://placehold.co/400x400/39FF14/black?text=Avocado', is_user_upload: false, created_at: new Date().toISOString(), min_price: 13.99 },
  { id: 35, name: 'Donut Worry', description: 'Sprinkled donuts - donut worry be happy', motif: 'Food', category: 'Party', colors: ['Pink', 'Rainbow'], image_url: 'https://placehold.co/400x400/FF10F0/white?text=Donut', is_user_upload: false, created_at: new Date().toISOString(), min_price: 18.99 },

  // Sports/Fitness Theme (5)
  { id: 36, name: 'Gym Bro Boxer', description: 'Dumbbells and protein - do you even lift?', motif: 'Fitness', category: 'Fitness', colors: ['Black', 'Red'], image_url: 'https://placehold.co/400x400/FF10F0/white?text=Gym+Bro', is_user_upload: false, created_at: new Date().toISOString(), min_price: 16.99 },
  { id: 37, name: 'Volleyball Spike', description: 'Balls and nets pattern - spike it!', motif: 'Sports', category: 'Volleyball', colors: ['Blue', 'Yellow', 'White'], image_url: 'https://placehold.co/400x400/FFFF00/black?text=Volleyball', is_user_upload: false, created_at: new Date().toISOString(), min_price: 19.99, vote_count: 1, ugly_votes: 1, ugliness_percent: 100 },
  { id: 38, name: 'Beach Volleyball', description: 'Sand and sunset vibes - summer forever', motif: 'Sports', category: 'Volleyball', colors: ['Orange', 'Blue'], image_url: 'https://placehold.co/400x400/FF6700/white?text=Beach+VB', is_user_upload: false, created_at: new Date().toISOString(), min_price: 15.99 },
  { id: 39, name: 'Never Skip Leg Day', description: 'Chicken legs pattern - leg day reminder', motif: 'Fitness', category: 'Fitness', colors: ['Yellow', 'Black'], image_url: 'https://placehold.co/400x400/FFFF00/black?text=Leg+Day', is_user_upload: false, created_at: new Date().toISOString(), min_price: 12.99 },
  { id: 40, name: 'Yoga Pose Brief', description: 'Stick figures doing yoga - namaste', motif: 'Fitness', category: 'Fitness', colors: ['Purple', 'Blue'], image_url: 'https://placehold.co/400x400/BF00FF/white?text=Yoga', is_user_upload: false, created_at: new Date().toISOString(), min_price: 14.99 },

  // Graffiti/Art Theme (5)
  { id: 41, name: 'Street Art Chaos', description: 'Random graffiti tags - urban style', motif: 'Graffiti', category: 'Party', colors: ['Rainbow', 'Black'], image_url: 'https://placehold.co/400x400/FF10F0/white?text=Street+Art', is_user_upload: false, created_at: new Date().toISOString(), min_price: 24.99 },
  { id: 42, name: 'Neon Spray Paint', description: 'Dripping neon colors - fresh off the wall', motif: 'Graffiti', category: 'Party', colors: ['Pink', 'Green', 'Yellow'], image_url: 'https://placehold.co/400x400/39FF14/black?text=Neon+Spray', is_user_upload: false, created_at: new Date().toISOString(), min_price: 13.99, vote_count: 1, ugly_votes: 1, ugliness_percent: 100 },
  { id: 43, name: 'Banksy Wannabe', description: 'Stencil art style - deep and meaningful', motif: 'Graffiti', category: 'Classic', colors: ['Black', 'White', 'Red'], image_url: 'https://placehold.co/400x400/FF10F0/white?text=Banksy', is_user_upload: false, created_at: new Date().toISOString(), min_price: 15.99 },
  { id: 44, name: 'Pop Art Boxer', description: 'Warhol style repeats - 15 min of fame', motif: 'Graffiti', category: 'Party', colors: ['Pink', 'Yellow', 'Blue'], image_url: 'https://placehold.co/400x400/FFFF00/black?text=Pop+Art', is_user_upload: false, created_at: new Date().toISOString(), min_price: 17.99 },
  { id: 45, name: 'Comic Book Pow', description: 'Action words explosion - POW BAM ZOOM', motif: 'Graffiti', category: 'Party', colors: ['Yellow', 'Red', 'Blue'], image_url: 'https://placehold.co/400x400/FF6700/white?text=POW', is_user_upload: false, created_at: new Date().toISOString(), min_price: 12.99 },

  // Random Ugly (5)
  { id: 46, name: 'Christmas in July', description: 'Santa in sunglasses - ho ho hot', motif: 'Holiday', category: 'Party', colors: ['Red', 'Green', 'White'], image_url: 'https://placehold.co/400x400/39FF14/black?text=Xmas+July', is_user_upload: false, created_at: new Date().toISOString(), min_price: 14.99 },
  { id: 47, name: 'Dad Joke Central', description: 'Puns written all over - groan worthy', motif: 'Random', category: 'Classic', colors: ['White', 'Black'], image_url: 'https://placehold.co/400x400/FFFF00/black?text=Dad+Jokes', is_user_upload: false, created_at: new Date().toISOString(), min_price: 11.99 },
  { id: 48, name: '90s Geometric', description: 'Memphis design chaos - totally rad', motif: 'Retro', category: 'Party', colors: ['Pink', 'Teal', 'Yellow'], image_url: 'https://placehold.co/400x400/00FFFF/black?text=90s+Retro', is_user_upload: false, created_at: new Date().toISOString(), min_price: 19.99, vote_count: 1, ugly_votes: 1, ugliness_percent: 100 },
  { id: 49, name: 'Rubber Ducky Army', description: 'Yellow ducks formation - quack attack', motif: 'Random', category: 'Party', colors: ['Yellow', 'Blue'], image_url: 'https://placehold.co/400x400/FFFF00/black?text=Rubber+Ducky', is_user_upload: false, created_at: new Date().toISOString(), min_price: 10.99 },
  { id: 50, name: 'Error 404 Brief', description: 'Underwear not found - glitch aesthetic', motif: 'Tech', category: 'Classic', colors: ['Blue', 'White'], image_url: 'https://placehold.co/400x400/00FFFF/black?text=404+Error', is_user_upload: false, created_at: new Date().toISOString(), min_price: 13.99 },
];

// Mock prices
export const mockPrices: (Price & { shop: Shop })[] = [
  { id: 1, product_id: 1, shop_id: 1, price: 14.99, original_price: 19.99, affiliate_url: 'https://amazon.de/dp/PIZZA1?tag=uglyboxer-21', in_stock: true, updated_at: new Date().toISOString(), shop: mockShops[0] },
  { id: 2, product_id: 1, shop_id: 2, price: 16.99, original_price: null, affiliate_url: 'https://otto.de/p/pizza1', in_stock: true, updated_at: new Date().toISOString(), shop: mockShops[1] },
  { id: 3, product_id: 1, shop_id: 3, price: 15.49, original_price: 18.99, affiliate_url: 'https://zalando.de/pizza1', in_stock: true, updated_at: new Date().toISOString(), shop: mockShops[2] },
  { id: 4, product_id: 6, shop_id: 1, price: 11.99, original_price: 14.99, affiliate_url: 'https://amazon.de/dp/ALIEN1?tag=uglyboxer-21', in_stock: true, updated_at: new Date().toISOString(), shop: mockShops[0] },
  { id: 5, product_id: 6, shop_id: 4, price: 10.99, original_price: null, affiliate_url: 'https://soxo.de/alien1', in_stock: true, updated_at: new Date().toISOString(), shop: mockShops[3] },
  { id: 6, product_id: 21, shop_id: 1, price: 15.99, original_price: null, affiliate_url: 'https://amazon.de/dp/MEME1?tag=uglyboxer-21', in_stock: true, updated_at: new Date().toISOString(), shop: mockShops[0] },
  { id: 7, product_id: 21, shop_id: 5, price: 19.99, original_price: null, affiliate_url: 'https://etsy.com/listing/meme1', in_stock: true, updated_at: new Date().toISOString(), shop: mockShops[4] },
];

// Get ranked products for leaderboard
export function getMockRankedProducts(): RankedProduct[] {
  return mockProducts
    .filter(p => p.vote_count && p.vote_count > 0)
    .sort((a, b) => (b.ugly_votes || 0) - (a.ugly_votes || 0))
    .map((p, index) => ({
      ...p,
      rank: index + 1,
      total_votes: p.vote_count || 0,
      ugly_votes: p.ugly_votes || 0,
      ugliness_percent: p.ugliness_percent || 0,
    }));
}

// Get products for voting (random order, exclude already voted)
export function getMockVotingProducts(excludeIds: number[] = []): Product[] {
  return mockProducts
    .filter(p => !excludeIds.includes(p.id))
    .sort(() => Math.random() - 0.5);
}

// Get prices for a product
export function getMockPricesForProduct(productId: number): (Price & { shop: Shop })[] {
  return mockPrices.filter(p => p.product_id === productId);
}
