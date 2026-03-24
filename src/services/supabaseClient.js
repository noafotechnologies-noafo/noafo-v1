import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log("Supabase URL:", supabaseUrl);
console.log("Anon Key Exists:", !!supabaseAnonKey);

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase ENV variables missing. Ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set inside your Vercel/local config.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
