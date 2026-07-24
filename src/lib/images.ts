/**
 * Helper to build Unsplash delivery URLs from a photo id.
 * We request a sensible max width + auto format/quality so Next/Image has an
 * optimised source to work from rather than the multi-MB original.
 */
export function unsplash(id: string, w = 1920, q = 80) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=${q}`;
}
