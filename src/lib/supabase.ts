import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase URL or Anon Key is missing. Database features will be disabled or mocked.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type GalleryImage = {
    id: string;
    src: string;
    alt: string;
    category: string;
    span?: string;
    created_at?: string;
};

export type NewsItem = {
    id: string;
    title: string;
    date: string;
    excerpt: string;
    image: string;
    created_at?: string;
};

export type CreativeHubItem = {
    id: string;
    type: 'radio' | 'tv';
    title: string;
    subtitle?: string;
    views?: string;
    duration?: string;
    image?: string;
    url?: string;
    created_at?: string;
};
