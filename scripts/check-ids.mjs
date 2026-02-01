import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://phrgujeebiwzgfihyang.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBocmd1amVlYml3emdmaWh5YW5nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk4OTUxMjcsImV4cCI6MjA4NTQ3MTEyN30.Oyv2m2Q1MUeN9lB-F7qpJ-rSz71gaOIIZSGQ93mD3IQ'
);

console.log('🔍 Checking for ID column...\n');

// Try selecting id explicitly
const { data, error } = await supabase
  .from('uglyboxer.com')
  .select('id, Name, img_url, affiliate_url')
  .limit(3);

if (error) {
  console.log('❌ Error:', error);
} else {
  console.log('✅ Data:', JSON.stringify(data, null, 2));
}
