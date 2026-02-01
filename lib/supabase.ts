import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Singleton instances
let supabaseAdminInstance: SupabaseClient | null = null;
let supabaseBrowserInstance: SupabaseClient | null = null;

/**
 * Get Supabase Admin client (lazy initialization)
 * Para uso no servidor com service role key
 */
export function getSupabaseAdmin(): SupabaseClient {
    if (!supabaseAdminInstance) {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

        if (!supabaseUrl || !serviceRoleKey) {
            throw new Error(
                'Variáveis de ambiente do Supabase não configuradas. Configure NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY'
            );
        }

        supabaseAdminInstance = createClient(supabaseUrl, serviceRoleKey, {
            auth: {
                autoRefreshToken: false,
                persistSession: false,
            },
        });
    }

    return supabaseAdminInstance;
}

/**
 * Get Supabase Browser client (lazy initialization)
 * Para uso no browser com anon key
 */
export function getSupabaseBrowser(): SupabaseClient {
    if (!supabaseBrowserInstance) {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

        if (!supabaseUrl || !anonKey) {
            throw new Error(
                'Variáveis de ambiente do Supabase não configuradas. Configure NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY'
            );
        }

        supabaseBrowserInstance = createClient(supabaseUrl, anonKey);
    }

    return supabaseBrowserInstance;
}

// Export legacy names for backward compatibility
export const supabaseAdmin = getSupabaseAdmin();
export const supabaseBrowser = getSupabaseBrowser();

/**
 * Upload de arquivo para o Supabase Storage
 */
export async function uploadFileToSupabase(
    file: File,
    bucket: string,
    path: string
) {
    const client = getSupabaseAdmin();
    const { data, error } = await client.storage
        .from(bucket)
        .upload(path, file, {
            cacheControl: '3600',
            upsert: false,
        });

    if (error) throw error;
    return data;
}

/**
 * Download de arquivo do Supabase Storage
 */
export async function downloadFileFromSupabase(
    bucket: string,
    path: string
): Promise<Blob> {
    const client = getSupabaseAdmin();
    const { data, error } = await client.storage.from(bucket).download(path);

    if (error) throw error;
    return data;
}

/**
 * Deletar arquivo do Supabase Storage
 */
export async function deleteFileFromSupabase(bucket: string, path: string) {
    const client = getSupabaseAdmin();
    const { error } = await client.storage.from(bucket).remove([path]);

    if (error) throw error;
}
