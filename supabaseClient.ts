
import { createClient } from '@supabase/supabase-js';

// Safely access env, defaulting to empty object if undefined to prevent crash
const env = (import.meta as any).env || {};

const supabaseUrl = env.VITE_SUPABASE_URL;
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL of Key ontbreekt. De app draait in demo-modus (mock data).');
}

// We gebruiken placeholders als de env vars er niet zijn. 
// Dit voorkomt dat 'createClient' een error gooit en de app crasht (wit scherm).
// De DataContext checkt of de echte URL er is voordat hij calls doet.
const urlToUse = supabaseUrl && supabaseUrl.startsWith('http') ? supabaseUrl : 'https://placeholder.supabase.co';
const keyToUse = supabaseAnonKey || 'placeholder-key';

export const supabase = createClient(urlToUse, keyToUse);
