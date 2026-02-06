
const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

const envPath = path.join(__dirname, '.env.local')
let supabaseUrl = ''
let supabaseKey = ''
try {
    const envContent = fs.readFileSync(envPath, 'utf-8')
    envContent.split('\n').forEach(line => {
        if (line.startsWith('NEXT_PUBLIC_SUPABASE_URL=')) supabaseUrl = line.split('=')[1].replace(/"/g, '').trim()
        if (line.startsWith('NEXT_PUBLIC_SUPABASE_ANON_KEY=')) supabaseKey = line.split('=')[1].replace(/"/g, '').trim()
    })
} catch (e) {}

const supabase = createClient(supabaseUrl, supabaseKey)

async function run() {
  console.log('--- checking filenames (Target: style.css) ---')
  const { data, error } = await supabase.storage.from('invoices-template').list('templateToclas')
  
  if (error) {
      console.log('List Error: ' + error.message)
      return
  }

  if (data) {
      console.log(`Found ${data.length} items.`)
      const styleFile = data.find(f => f.name === 'style.css')
      
      if (styleFile) {
          console.log(`[FILE] style.css FOUND. Size: ${styleFile.metadata ? styleFile.metadata.size : '?'}`)
          
          console.log('--- Downloading style.css ---')
          const { data: downData, error: downError } = await supabase.storage
            .from('invoices-template')
            .download('templateToclas/style.css')
            
          if (downError) {
              console.log('Download Failed: ' + downError.message)
          } else {
              console.log('Download SUCCESS! Size: ' + downData.size)
          }

      } else {
          console.log('style.css NOT FOUND in list!')
          data.forEach(f => console.log(`   - ${f.name}`))
      }
  } else {
      console.log('No data returned')
  }
}
run()
