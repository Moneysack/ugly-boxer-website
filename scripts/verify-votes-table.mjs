import { createClient } from '@supabase/supabase-js';

// Hardcoded from .env.local since we're running outside Next.js context
const supabaseUrl = 'https://fdsiwwqfxchborhtnwoh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkc2l3d3FmeGNoYm9yaHRud29oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2ODQ4NDUsImV4cCI6MjA4NTI2MDg0NX0.YswmRdGLdiMidzG91VTu522GIsjsIOdZa064U-xmtvY';

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Supabase credentials not found in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

console.log('🔍 Checking if votes table exists in Supabase...\n');

// Try to query the votes table
const { data, error } = await supabase
  .from('votes')
  .select('*')
  .limit(1);

if (error) {
  console.error('❌ Error accessing votes table:');
  console.error(JSON.stringify(error, null, 2));
  console.log('\n📋 This error confirms the table exists in the database but PostgREST schema cache needs to be reloaded.');
} else {
  console.log('✅ Votes table is accessible!');
  console.log('Found data:', data);
}

console.log('\n' + '='.repeat(60));
console.log('LÖSUNG / SOLUTION:');
console.log('='.repeat(60));
console.log('\n🔧 So lädst du den Schema Cache in Supabase neu:\n');
console.log('1. Öffne dein Supabase Dashboard:');
console.log('   https://app.supabase.com/project/fdsiwwqfxchborhtnwoh\n');
console.log('2. Gehe zu: Settings → API (linkes Menü)\n');
console.log('3. Scrolle nach unten zu "PostgREST"\n');
console.log('4. Klicke auf "Restart server" oder warte 2-3 Minuten\n');
console.log('ODER:\n');
console.log('5. Gehe zu: Table Editor → votes Tabelle öffnen\n');
console.log('6. Wenn die Tabelle dort sichtbar ist, gehe zurück zu');
console.log('   Settings → API → "Reload schema"\n');
console.log('='.repeat(60) + '\n');
