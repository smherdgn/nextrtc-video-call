// src/lib/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";

export const getSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl) {
    throw new Error(
      "Supabase URL is not defined in environment variables. Please set NEXT_PUBLIC_SUPABASE_URL."
    );
  }

  if (!supabaseServiceRoleKey && !anonKey) {
    throw new Error(
      "Neither Supabase Service Role Key nor Anon Key is defined."
    );
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey || anonKey || "");
};
