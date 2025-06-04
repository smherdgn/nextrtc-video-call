import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  throw new Error("Supabase URL is not defined in environment variables. Please set NEXT_PUBLIC_SUPABASE_URL.");
}
if (!supabaseServiceRoleKey) {
  // This key is used for server-side operations that require elevated privileges (like inserting logs or bypassing RLS for admin views)
  // For client-side operations (if any directly to Supabase), you'd use NEXT_PUBLIC_SUPABASE_ANON_KEY.
  console.warn("Supabase Service Role Key is not defined. Server-side Supabase operations might fail or be restricted. Please set SUPABASE_SERVICE_ROLE_KEY.");
}

// Initialize Supabase client.
// For server-side data operations (like logging), we should use the service_role key
// as it can bypass Row Level Security if needed (though our policies grant it specific access).
// If you were to interact with Supabase from the client-side directly for some features,
// you would initialize another client instance with the anon key.
export const supabase = createClient(supabaseUrl, supabaseServiceRoleKey || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '');

// If you need a separate client for anon key usage (e.g., for client-side RLS-protected reads)
// export const supabaseAnon = createClient(supabaseUrl, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '');

if (!supabaseServiceRoleKey && process.env.NODE_ENV === 'production') {
    console.error("CRITICAL: Supabase Service Role Key is NOT set in a production environment. Logging and admin features will likely fail.");
}
