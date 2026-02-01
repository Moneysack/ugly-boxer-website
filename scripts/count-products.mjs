import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://phrgujeebiwzgfihyang.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBocmd1amVlYml3emdmaWh5YW5nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk4OTUxMjcsImV4cCI6MjA4NTQ3MTEyN30.Oyv2m2Q1MUeN9lB-F7qpJ-rSz71gaOIIZSGQ93mD3IQ'
);

const { count, error } = await supabase
  .from('uglyboxer.com')
  .select('*', { count: 'exact', head: true });

if (error) {
  console.log('Error:', error);
} else {
  console.log(`Total products in database: ${count}`);
}
