/**
 * This function is use for store/Reader.ts, to easily get image URL
 * @param url image's URL
 * @returns new URL(url, import.meta.url).href
 */
export function getImage(url: string): string {
  return new URL(url.replace('@', 'src'), import.meta.url).href
};