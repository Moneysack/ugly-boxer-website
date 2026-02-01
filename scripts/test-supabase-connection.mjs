import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://phrgujeebiwzgfihyang.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBocmd1amVlYml3emdmaWh5YW5nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk4OTUxMjcsImV4cCI6MjA4NTQ3MTEyN30.Oyv2m2Q1MUeN9lB-F7qpJ-rSz71gaOIIZSGQ93mD3IQ';

const supabase = createClient(supabaseUrl, supabaseKey);

console.log('🔍 Testing Supabase connection...\n');

// Test 1: Try to fetch from uglyboxer.com table
console.log('1️⃣ Fetching from uglyboxer.com table:');
const { data, error } = await supabase
  .from('uglyboxer.com')
  .select('*')
  .limit(5);

if (error) {
  console.log('❌ Error:', error);
} else {
  console.log('✅ Success! Found', data?.length, 'rows');
  console.log('Data:', JSON.stringify(data, null, 2));
}

// Test 2: List all tables
console.log('\n2️⃣ Trying to list tables...');
const { data: tables, error: tablesError } = await supabase
  .from('information_schema.tables')
  .select('table_name')
  .eq('table_schema', 'public');

if (tablesError) {
  console.log('❌ Error listing tables:', tablesError);
} else {
  console.log('✅ Available tables:', tables?.map(t => t.table_name));
}
