
const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

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
} catch (e) {}

if (!supabaseUrl || !supabaseKey) { console.error('No Env'); process.exit(1); }

const supabase = createClient(supabaseUrl, supabaseKey)

async function verify() {
    console.log('--- Verifying Public Access (invoices-public) ---')
    
    const bucketName = 'invoices-public'

    // 1. Check Bucket Config
    const { data: bucket, error: bError } = await supabase.storage.getBucket(bucketName)
    if (bError) {
        console.log(`❌ Could not get bucket '${bucketName}':`, bError.message)
    } else {
        console.log(`Bucket '${bucketName}' Public Status: [${bucket.public ? 'TRUE' : 'FALSE'}]`)
    }

    // 2. Test Path A: templateToclas/index.html (Expected)
    const { data: { publicUrl: urlA } } = supabase.storage.from(bucketName).getPublicUrl('templateToclas/index.html')
    console.log(`\nTesting Path A (Expected): ${urlA}`)
    try {
        const resA = await fetch(urlA)
        if (resA.ok) console.log('✅ Path A is Accessible!')
        else console.log(`❌ Path A Failed (${resA.status}).`)
    } catch (e) { console.log('Error A:', e.message) }

    // 3. Test Path B: index.html (Root) (Suspected Misplacement)
    const { data: { publicUrl: urlB } } = supabase.storage.from(bucketName).getPublicUrl('index.html')
    console.log(`\nTesting Path B (Root): ${urlB}`)
    try {
        const resB = await fetch(urlB)
        if (resB.ok) console.log('✅ Path B is Accessible! (Files are at ROOT, not in folder)')
        else console.log(`❌ Path B Failed (${resB.status}).`)
    } catch (e) { console.log('Error B:', e.message) }
}

verify()
