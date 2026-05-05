import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Inicializa apenas se as chaves existirem para evitar crash no servidor
export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : {
      from: () => ({
        select: () => ({
          order: () => Promise.resolve({ data: [], error: null }),
          eq: () => ({ 
            single: () => Promise.resolve({ data: null, error: null }), 
            maybeSingle: () => Promise.resolve({ data: null, error: null }) 
          }),
          or: () => ({ 
            limit: () => ({ maybeSingle: () => Promise.resolve({ data: null, error: null }) }) 
          }),
        }),
      }),
      channel: () => ({
        on: () => ({
          subscribe: () => ({})
        }),
        subscribe: () => ({})
      }),
      removeChannel: () => ({})
    } as any;
