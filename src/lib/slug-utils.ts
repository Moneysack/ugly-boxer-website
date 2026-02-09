/**
 * Generates a URL-safe slug from a product name.
 * "Pizza Guy" -> "pizza-guy"
 * "Gummi Bear" -> "gummi-bear"
 * "SharkFart" -> "sharkfart"
 */
export function generateSlug(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[äöüß]/g, (match) => {
      const map: Record<string, string> = { 'ä': 'ae', 'ö': 'oe', 'ü': 'ue', 'ß': 'ss' };
      return map[match] || match;
    })
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Extracts the numeric ID from a slug like "42-pizza-guy".
 * Returns null if no numeric prefix is found.
 */
export function extractIdFromSlug(slug: string): number | null {
  const match = slug.match(/^(\d+)/);
  return match ? parseInt(match[1], 10) : null;
}
