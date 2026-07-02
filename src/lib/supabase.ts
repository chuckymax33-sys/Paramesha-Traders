import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://your-project.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "your-anon-key";

// Lazily create the client — only in the browser.
// Supabase's realtime engine initialises WebSocket / global timers at module
// load time, which crashes in the Nitro/Node SSR environment.
let _client: ReturnType<typeof createClient> | null = null;

function getClient() {
  if (typeof window === "undefined") {
    // We're on the server — return a no-op proxy so import doesn't throw.
    // All real calls happen inside useEffect (client-only) anyway.
    return new Proxy({} as ReturnType<typeof createClient>, {
      get(_t, prop) {
        // Allow chaining: supabase.from("x").select("*") etc.
        const noop: any = () => noop;
        noop.then = undefined; // not a Promise
        return noop;
      },
    });
  }
  if (!_client) {
    _client = createClient(supabaseUrl, supabaseAnonKey);
  }
  return _client;
}

export const supabase = new Proxy({} as ReturnType<typeof createClient>, {
  get(_t, prop: string) {
    return (getClient() as any)[prop];
  },
});
