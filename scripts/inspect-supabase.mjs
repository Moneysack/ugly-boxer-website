import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fdsiwwqfxchborhtnwoh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkc2l3d3FmeGNoYm9yaHRud29oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2ODQ4NDUsImV4cCI6MjA4NTI2MDg0NX0.YswmRdGLdiMidzG91VTu522GIsjsIOdZa064U-xmtvY';

const supabase = createClient(supabaseUrl, supabaseKey);

console.log('🔍 Inspecting Supabase Database...\n');
console.log(`URL: ${supabaseUrl}\n`);

// List of common table names to try
const possibleTables = [
  'UglyBoxers',    // Most likely name
  'ugly boxers',   // User mentioned this earlier
  'uglyBoxers',    // camelCase variant
  'ugly_boxers',   // snake_case variant
  'products',
  'underwear',
  'boxers',
  'items',
  'product',
  'uglyboxer'
];

console.log('📋 Attempting to query common table names:\n');

for (const tableName of possibleTables) {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .limit(3);

    if (error) {
      console.log(`❌ Table "${tableName}": Not found or no access`);
    } else if (data && data.length > 0) {
      console.log(`\n✅ Found Table: "${tableName}"`);
      console.log('─'.repeat(60));
      console.log(`📊 Row count (sample): ${data.length} rows`);
      console.log(`\n🔑 Columns detected:`);

      const columns = Object.keys(data[0]);
      columns.forEach(col => {
        const sampleValue = data[0][col];
        const type = typeof sampleValue;
        const valuePreview = sampleValue !== null
          ? String(sampleValue).substring(0, 50)
          : 'null';
        console.log(`   - ${col}: ${type} (example: "${valuePreview}")`);
      });

      console.log(`\n📄 Sample Data (first 3 rows):`);
      console.log(JSON.stringify(data, null, 2));
      console.log('─'.repeat(60));
    } else {
      console.log(`⚠️  Table "${tableName}": Exists but is empty`);
    }
  } catch (err) {
    console.log(`💥 Error querying "${tableName}":`, err.message);
  }
}

console.log('\n\n🎯 Summary:');
console.log('If you see a table marked with ✅, that\'s your product table!');
console.log('Copy the column names and use them in the next step.\n');
