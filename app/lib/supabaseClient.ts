// app/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nobcnkrghciznrpeczhw.supabase.co'; // Replace with your Supabase project URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vYmNua3JnaGNpem5ycGVjemh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3OTkzNTksImV4cCI6MjA2MzM3NTM1OX0.SMMrbkwDSLmbVgJRRHs8EarWoEwrpx7LN-L5ES-IhDI'; // Replace with your Supabase anon key

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  realtime: {
    params: {
      eventsPerSecond: 10, // Adjust if needed
    },
  },
});