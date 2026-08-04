import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://zhikurpgjuqsdalmdcjr.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_OsNMkEz3H6GwOtoJmozgmg_zbQYQMgw';

export const supabase = createClient(supabaseUrl, supabaseKey);
