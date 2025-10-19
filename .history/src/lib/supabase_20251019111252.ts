import { createClient } from '@supabase/supabase-js';

// Demo Supabase configuration for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://demo.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'demo-anon-key';

// Create a mock Supabase client for development
const createMockSupabase = () => ({
  from: (table: string) => ({
    select: (query?: string) => ({
      eq: (column: string, value: any) => ({
        single: () => Promise.resolve({ data: null, error: { message: 'Mock data' } }),
        order: (column: string, options?: any) => Promise.resolve({ data: [], error: null })
      }),
      order: (column: string, options?: any) => Promise.resolve({ data: [], error: null }),
      then: (callback: any) => Promise.resolve({ data: [], error: null })
    }),
    insert: (data: any) => ({
      select: (query?: string) => ({
        single: () => Promise.resolve({ data: data[0], error: null })
      })
    }),
    update: (data: any) => ({
      eq: (column: string, value: any) => ({
        select: (query?: string) => ({
          single: () => Promise.resolve({ data: { ...data, id: 'mock-id' }, error: null })
        })
      })
    }),
    delete: () => ({
      eq: (column: string, value: any) => Promise.resolve({ error: null })
    })
  }),
  storage: {
    from: (bucket: string) => ({
      upload: (path: string, file: File) => Promise.resolve({ error: null }),
      getPublicUrl: (path: string) => ({ publicUrl: `mock-url/${path}` })
    })
  }
});

// Check if we have real Supabase credentials
const hasRealCredentials = supabaseUrl !== 'https://demo.supabase.co' && supabaseAnonKey !== 'demo-anon-key';

export const supabase = hasRealCredentials 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createMockSupabase() as any;
