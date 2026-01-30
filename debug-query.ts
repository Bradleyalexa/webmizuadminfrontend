
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gdfhhfcdomtpkelvmhui.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdkZmhoZmNkb210cGtlbHZtaHVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUzNzQ0NzMsImV4cCI6MjA4MDk1MDQ3M30.AgXjTyFb7htcxTsEGLaJDcvslvpKgYYjIx3KZgz28B0'

const supabase = createClient(supabaseUrl, supabaseKey)

async function testQuery() {
    console.log("Starting test query...")

    // 1. Get a technician
    // Fetch one from DB
    const { data: techs, error: techError } = await supabase.from('technicians').select('id, name').limit(1)
    if (techError) {
        console.error("Tech Fetch Error:", techError)
        return
    }
    if (!techs || techs.length === 0) {
        console.log("No technicians found in DB")
        return
    }
    const techId = techs[0].id
    console.log(`Testing with Technician: ${techs[0].name} (${techId})`)

    // 2. Get a valid date range (wide range)
    const startDate = '2024-01-01'
    const endDate = '2030-12-31'

    // 3. Run simplified query (just service_log)
    console.log("Running SIMPLE query (no joins)...")
    const simple = await supabase
      .from('service_log')
      .select('id, technician_id, service_date')
      .eq('technician_id', techId)
    
    console.log(`Simple Query Rows: ${simple.data?.length}`)
    if (simple.error) console.error("Simple Query Error:", simple.error)

    // 4. Run COMPLEX query (with joins)
    console.log("Running COMPLEX query (with joins)...")
    const complex = await supabase
    .from('service_log')
    .select(`
        *,
        jobs (name),
        customer_products (
            product_catalog_id,
            customer_id,
            customers (
               name,
               address
            )
        )
    `)
    .eq('technician_id', techId)
    .gte('service_date', startDate)
    .lte('service_date', endDate)
    
    if (complex.error) {
        console.error("COMPLEX Query Error:", complex.error)
    } else {
        console.log(`COMPLEX Query Success. Rows: ${complex.data?.length}`)
        if (complex.data && complex.data.length > 0) {
            // Check if customer_products is populated
            const first = complex.data[0]
            console.log("First Row customer_products:", JSON.stringify(first.customer_products, null, 2))
            if (first.customer_products === null) {
                console.warn("WARNING: customer_products is NULL. Verify Foreign Key or Data integrity.")
            }
        }
    }
}

testQuery()
