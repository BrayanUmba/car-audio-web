import { createClient } from "@supabase/supabase-js";

// Cliente con service_role — bypasea RLS.
// Usar SOLO en Route Handlers y Server Actions del lado servidor.
// NUNCA importar en Client Components.
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}
