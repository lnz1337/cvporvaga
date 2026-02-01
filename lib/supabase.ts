import { createClient } from '@supabase/supabase-js';

// Supabase client para uso no servidor (com service role key)
export const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    }
);

// Supabase client para uso no browser (com anon key)
export const supabaseBrowser = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

/**
 * Upload de arquivo para o Supabase Storage
 */
export async function uploadFileToSupabase(
    file: File,
    bucket: string,
    path: string
) {
    const { data, error } = await supabaseAdmin.storage
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
    const { data, error } = await supabaseAdmin.storage
        .from(bucket)
        .download(path);

    if (error) throw error;
    return data;
}

/**
 * Deletar arquivo do Supabase Storage
 */
export async function deleteFileFromSupabase(bucket: string, path: string) {
    const { error } = await supabaseAdmin.storage.from(bucket).remove([path]);

    if (error) throw error;
}
