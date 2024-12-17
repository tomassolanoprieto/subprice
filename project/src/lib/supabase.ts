import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  console.error('Missing Supabase URL');
  throw new Error('Please set VITE_SUPABASE_URL in your environment variables');
}

if (!supabaseAnonKey) {
  console.error('Missing Supabase Anon Key');
  throw new Error('Please set VITE_SUPABASE_ANON_KEY in your environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);