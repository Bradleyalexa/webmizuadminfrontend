
const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// Read env
const envPath = path.join(__dirname, '.env.local')
let supabaseUrl = '', supabaseKey = ''
try {
    const envContent = fs.readFileSync(envPath, 'utf-8')
    envContent.split('\n').forEach(line => {
        if (line.startsWith('NEXT_PUBLIC_SUPABASE_URL=')) supabaseUrl = line.split('=')[1].replace(/"/g, '').trim()
        if (line.startsWith('NEXT_PUBLIC_SUPABASE_ANON_KEY=')) supabaseKey = line.split('=')[1].replace(/"/g, '').trim()
    })
} catch (e) {}

if (!supabaseUrl || !supabaseKey) { console.error('No Env'); process.exit(1); }
const supabase = createClient(supabaseUrl, supabaseKey)

async function verifyImages() {
    console.log('--- Checking Image Assets ---')
    const bucket = 'invoices-public'
    const folder = 'templateToclas/images'
    
    // Check specific known image
    const testImage = 'layer_239.png'
    const fullPath = `${folder}/${testImage}`
    
    const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(fullPath)
    console.log(`Checking: ${fullPath}`)
    console.log(`URL: ${publicUrl}`)
    
    try {
        const res = await fetch(publicUrl)
        if (res.ok) {
            console.log(`✅ Image found! (${res.status})`)
            console.log(`Type: ${res.headers.get('content-type')}`)
            console.log(`Size: ${res.headers.get('content-length')}`)
        } else {
            console.log(`❌ Image NOT FOUND (${res.status})`)
            console.log('   -> Meaning: The "images" folder is empty or missing from the bucket.')
        }
    } catch (e) { console.log('Fetch Error:', e.message) }
    
    // List folder contents to be sure
    console.log('\nList "templateToclas/images":')
    const { data: list, error } = await supabase.storage.from(bucket).list('templateToclas/images')
    if (error) console.log('List Error:', error.message)
    else {
        if (list.length === 0) console.log('   [EMPTY] - No files found here.')
        list.forEach(f => console.log(`   - ${f.name} (${f.metadata?.mimetype})`))
    }
}

verifyImages()
