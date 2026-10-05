import { createClient } from '@supabase/supabase-js'
import { SUPABASE_URL, SUPABASE_SERVICE_KEY } from './env.js'

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_ANON_KEY in your .env files')
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

export default supabase;