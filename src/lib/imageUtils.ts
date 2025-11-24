/**
 * Converts Google Drive sharing links to direct image URLs
 * @param url - Google Drive sharing URL
 * @returns Direct image URL or original URL if not a Google Drive link
 */
export const convertGoogleDriveUrl = (url: string): string => {
  if (!url) return url;
  
  // Match Google Drive file ID from various URL formats
  const patterns = [
    /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/,
    /drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return `https://drive.google.com/uc?export=view&id=${match[1]}`;
    }
  }
  
  // Return original URL if not a Google Drive link
  return url;
};
