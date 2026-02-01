import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fdsiwwqfxchborhtnwoh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkc2l3d3FmeGNoYm9yaHRud29oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2ODQ4NDUsImV4cCI6MjA4NTI2MDg0NX0.YswmRdGLdiMidzG91VTu522GIsjsIOdZa064U-xmtvY';

const supabase = createClient(supabaseUrl, supabaseKey);

console.log('🔍 Supabase Diagnose\n');
console.log('=' .repeat(60));

// Test 1: Check UglyBoxers table (should work)
console.log('\n1️⃣ Testing UglyBoxers table...');
const { data: products, error: productsError } = await supabase
  .from('UglyBoxers')
  .select('id, Name')
  .limit(3);

if (productsError) {
  console.log('❌ Error:', productsError.message);
} else {
  console.log('✅ UglyBoxers table works!');
  console.log('   Products found:', products?.length);
}

// Test 2: Check votes table
console.log('\n2️⃣ Testing votes table...');
const { data: votes, error: votesError } = await supabase
  .from('votes')
  .select('*')
  .limit(1);

if (votesError) {
  console.log('❌ Error:', votesError.message);
  console.log('   Error code:', votesError.code);
} else {
  console.log('✅ votes table works!');
  console.log('   Votes found:', votes?.length);
}

// Test 3: Try to insert a test vote
console.log('\n3️⃣ Testing vote insertion...');
const { data: insertData, error: insertError } = await supabase
  .from('votes')
  .insert({
    product_id: 1,
    session_id: 'diagnostic-test-' + Date.now(),
    vote_type: 'ugly',
  })
  .select();

if (insertError) {
  console.log('❌ Insert Error:', insertError.message);
  console.log('   Error code:', insertError.code);
  console.log('   Details:', insertError.details);
  console.log('   Hint:', insertError.hint);
} else {
  console.log('✅ Vote insertion works!');
  console.log('   Inserted:', insertData);
}

console.log('\n' + '='.repeat(60));
console.log('\n📋 DIAGNOSE ABGESCHLOSSEN\n');

if (votesError || insertError) {
  console.log('⚠️  PROBLEM GEFUNDEN:');
  console.log('Die votes Tabelle existiert nicht im PostgREST Schema Cache.\n');
  console.log('LÖSUNG:');
  console.log('1. Gehe zu deinem Supabase Dashboard');
  console.log('2. Öffne den SQL Editor');
  console.log('3. Führe diesen Befehl aus:\n');
  console.log('   NOTIFY pgrst, \'reload schema\';');
  console.log('\nODER:\n');
  console.log('1. Gehe zu Settings → Database → Connection pooling');
  console.log('2. Klicke auf "Restart" beim Transaction pooler\n');
}
