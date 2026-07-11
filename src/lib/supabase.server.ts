import { createClient } from "@supabase/supabase-js";

// We use the same env vars as the client for convenience. 
// They are safe to use here because this file only runs on the server.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://your-project.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "your-anon-key";

/**
 * Creates a Supabase client for use within Server Functions.
 * By passing the user's access token, Supabase will impersonate
 * the user and securely apply all Row Level Security (RLS) policies.
 */
export function getServerSupabaseClient(accessToken: string) {
  return createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  });
}
