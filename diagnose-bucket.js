
const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// Setup Logging
const logPath = path.join(__dirname, 'diagnosis.txt')
fs.writeFileSync(logPath, `Diagnosis Started at ${new Date().toISOString()}\n`)

function log(msg) {
    console.log(msg)
    // Safely stringify objects if needed
    if (typeof msg === 'object') msg = JSON.stringify(msg, null, 2)
    fs.appendFileSync(logPath, msg + '\n')
}

// 1. Read .env.local manually
const envPath = path.join(__dirname, '.env.local')
let supabaseUrl = ''
let supabaseKey = ''

try {
    const envContent = fs.readFileSync(envPath, 'utf-8')
    envContent.split('\n').forEach(line => {
        if (line.startsWith('NEXT_PUBLIC_SUPABASE_URL=')) {
            supabaseUrl = line.split('=')[1].replace(/"/g, '').trim()
        }
        if (line.startsWith('NEXT_PUBLIC_SUPABASE_ANON_KEY=')) {
            supabaseKey = line.split('=')[1].replace(/"/g, '').trim()
        }
    })
} catch (e) {
    log('Failed to read .env.local: ' + e.message)
}

if (!supabaseUrl || !supabaseKey) {
  log('Missing Supabase env vars in .env.local')
  process.exit(1)
}

log('--- Supabase Storage Diagnosis (Node.js) ---')
log('URL: ' + supabaseUrl)

const supabase = createClient(supabaseUrl, supabaseKey)

async function runDiagnosis() {
  log('\n1. Listing Buckets...')
  const { data: buckets, error: bucketError } = await supabase.storage.listBuckets()
  let bucketId = 'invoices-template'
  
  if (bucketError) {
      log('Failed to list buckets: ' + bucketError.message)
  } else {
      const target = buckets.find(b => b.name === 'invoices-template' || b.id === 'invoices-template')
      if (target) {
          log('✅ TARGET BUCKET FOUND:')
          log(`   - ID: ${target.id}`)
          log(`   - Name: ${target.name}`)
          log(`   - Public: ${target.public}`)
          bucketId = target.id
      } else {
          log('❌ CRITICAL: Bucket "invoices-template" NOT FOUND!')
          log('   Available Buckets: ' + buckets.map(b => b.name).join(', '))
      }
  }

  // 2. Details of index.html
  log('\n2. Inspecting "templateToclas" contents...')
  const { data: listData, error: listError } = await supabase.storage
    .from(bucketId)
    .list('templateToclas')

  if (listError) {
      log('   List Failed: ' + listError.message)
  } else {
      log(`   Found ${listData.length} files.`)
      const indexFile = listData.find(f => f.name.includes('index.html'))
      if (indexFile) {
           log('   ✅ "index.html" FOUND (Fuzzy Match):')
           log(`      - Exact Name: "${indexFile.name}"`)
           log(`      - Size: ${indexFile.metadata ? indexFile.metadata.size : 'Unknown'}`)
           log(`      - Mime: ${indexFile.metadata ? indexFile.metadata.mimetype : 'Unknown'}`)
           log(`      - ID: ${indexFile.id}`)
           
           // Check for weird characters
           if (indexFile.name !== 'index.html') {
               log('      ⚠️ WARNING: Name is NOT exactly "index.html". Char codes: ' + indexFile.name.split('').map(c => c.charCodeAt(0)).join(','))
           }
      } else {
           log('   ❌ index.html NOT FOUND in list!')
           listData.forEach(f => log(`      - "${f.name}"`))
      }
  }

  // 3. Download Attempt
  log('\n3. Downloading "templateToclas/index.html" (Anonymous)...')
  const { data: downData, error: downError } = await supabase.storage
     .from(bucketId)
     .download('templateToclas/index.html')

  if (downError) {
      log('   Download Failed: ' + downError.message)
  } else {
      log('   ✅ Download Success! Size: ' + downData.size)
  }
}

runDiagnosis()
