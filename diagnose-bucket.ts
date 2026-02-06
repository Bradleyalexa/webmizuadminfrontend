
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase env vars')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function runDiagnosis() {
  console.log('--- Supabase Storage Diagnosis ---')
  console.log('URL:', supabaseUrl)
  
  // 1. List Buckets to verify ID and Public status
  const { data: buckets, error: bucketError } = await supabase.storage.listBuckets()
  if (bucketError) {
      console.error('Failed to list buckets:', bucketError)
  } else {
      console.log('Buckets found:', buckets.length)
      const target = buckets.find(b => b.name === 'invoices-template' || b.id === 'invoices-template')
      if (target) {
          console.log('TARGET BUCKET FOUND:')
          console.log(`- ID: ${target.id}`)
          console.log(`- Name: ${target.name}`)
          console.log(`- Public: ${target.public}`)
          console.log(`- Created: ${target.created_at}`)
      } else {
          console.error('CRITICAL: Bucket "invoices-template" NOT FOUND in bucket list!')
          console.log('Available buckets:', buckets.map(b => b.name).join(', '))
      }
  }

  // 2. Try to Download the file directly (using Anon Key - simulating Public access)
  console.log('\n--- Checking Public Access (Anon Key) ---')
  const { data: publicData, error: publicError } = await supabase.storage
    .from('invoices-template')
    .download('templateToclas/index.html')
    
  if (publicError) {
      console.log('Direct Download Failed (Expected if Private):', publicError.message)
  } else {
      console.log('SUCCESS! Direct Download worked (Bucket matches Anon permissions).')
  }
}

runDiagnosis()
