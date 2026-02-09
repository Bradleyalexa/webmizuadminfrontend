
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env.local
const envPath = path.resolve(__dirname, '.env.local');
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
} else {
  console.warn('Warning: .env.local not found at', envPath);
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase env vars');
  console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl);
  console.error('NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseKey ? '******' : 'undefined');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function runDiagnosis() {
  console.log('--- Supabase Storage Diagnosis: Customer Products ---');
  console.log('URL:', supabaseUrl);
  
  // 1. List Buckets
  const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();
  
  if (bucketError) {
      console.error('Failed to list buckets:', bucketError);
  } else {
      console.log('Buckets found:', buckets.length);
      const target = buckets.find(b => b.name === 'customer-product' || b.name === 'customer-products');
      
      if (target) {
          console.log('TARGET BUCKET FOUND:');
          console.log(`- ID: ${target.id}`);
          console.log(`- Name: ${target.name}`);
          console.log(`- Public: ${target.public}`);
          console.log(`- Created: ${target.created_at}`);
          
          // List files in the bucket
          const { data: files, error: fileError } = await supabase.storage.from(target.name).list();
          if (fileError) {
              console.error('Failed to list files:', fileError);
          } else {
              console.log(`Files in ${target.name}:`, files.length);
              if (files.length > 0) {
                  console.log('Sample files:');
                  files.slice(0, 10).forEach(f => console.log(` - ${f.name}`));
              }
          }

      } else {
          console.error('CRITICAL: Bucket "customer-product" (or plural) NOT FOUND in bucket list!');
          console.log('Available buckets:', buckets.map(b => b.name).join(', '));
      }
  }
}

runDiagnosis();
