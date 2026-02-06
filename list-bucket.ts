
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

async function listBucket() {
  const { data, error } = await supabase
    .storage
    .from('invoices-template')
    .list()

  if (error) {
    console.error('Error listing bucket:', error)
    return
  }

  console.log('Bucket "invoices-template" contents:')
  data?.forEach(file => {
    console.log(`- ${file.name} (${file.id ? 'file' : 'folder'})`)
    // If it's a folder, list inside
    if (!file.id) {
        listFolder(file.name)
    }
  })
}

async function listFolder(folder: string) {
    const { data, error } = await supabase
    .storage
    .from('invoices-template')
    .list(folder)
    
    if (error) { console.error(error); return; }
    console.log(`Contents of folder "${folder}":`)
    data?.forEach(f => console.log(`  - ${f.name}`))
}

listBucket()
