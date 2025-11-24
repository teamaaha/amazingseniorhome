/**
 * Optimizes Supabase storage image URLs with transformations
 * @param url - Original image URL from Supabase storage
 * @param options - Transformation options
 * @returns Optimized image URL with transformations
 */
export const optimizeSupabaseImage = (
  url: string | null,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'jpeg' | 'png';
  } = {}
): string | null => {
  if (!url) return null;
  
  // Check if it's a Supabase storage URL
  if (!url.includes('supabase.co/storage')) return url;
  
  const { width = 800, quality = 75, format = 'webp' } = options;
  
  // Build transformation query params
  const params = new URLSearchParams();
  params.append('width', width.toString());
  params.append('quality', quality.toString());
  if (format) params.append('format', format);
  
  // Add transformations to the URL
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}${params.toString()}`;
};

/**
 * Get optimized thumbnail for blog cards
 */
export const getBlogThumbnail = (url: string | null): string | null => {
  return optimizeSupabaseImage(url, {
    width: 600,
    quality: 70,
    format: 'webp'
  });
};

/**
 * Get optimized full-size image for blog detail page
 */
export const getBlogFullImage = (url: string | null): string | null => {
  return optimizeSupabaseImage(url, {
    width: 1200,
    quality: 80,
    format: 'webp'
  });
};
