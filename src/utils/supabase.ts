import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://zhikurpgjuqsdalmdcjr.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_OsNMkEz3H6GwOtoJmozgmg_zbQYQMgw';

export const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Uploads profile picture file to Supabase Storage 'profile-pictures' bucket
 * or converts to Data URL string for saving directly in public.profiles.photo
 */
export async function uploadProfilePictureToSupabase(
  userId: string,
  file: File
): Promise<string> {
  try {
    const fileExt = file.name.split('.').pop() || 'jpg';
    const fileName = `${userId}-${Date.now()}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('profile-pictures')
      .upload(filePath, file, { upsert: true });

    if (!uploadError) {
      const { data } = supabase.storage.from('profile-pictures').getPublicUrl(filePath);
      if (data && data.publicUrl) {
        return data.publicUrl;
      }
    }
  } catch (err) {
    console.warn('Supabase storage upload fallback to base64 Data URL:', err);
  }

  // Fallback to Base64 Data URL string stored directly in Supabase profiles table
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(file);
  });
}

/**
 * Upserts profile information to Supabase database table 'profiles'
 */
export async function updateProfileInSupabase(userId: string, updatedData: any) {
  try {
    const { error } = await supabase
      .from('profiles')
      .upsert({
        user_id: userId,
        ...updatedData,
        updated_at: new Date().toISOString()
      }, { onConflict: 'user_id' });
    if (error) {
      console.warn('Supabase profile database upsert info:', error.message);
    }
  } catch (err) {
    console.warn('Supabase database sync offline fallback:', err);
  }
}
