import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

let client: ReturnType<typeof createClient<Database>> | null = null;

export function createBrowserSupabaseClient() {
  if (client) return client;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  client = createClient<Database>(supabaseUrl, supabaseAnonKey);
  return client;
}
