import * as icons from 'simple-icons';

export function getIconBySlug(slug: string) {
  if (!slug) return null;
  for (const key in icons) {
    if (key === 'default') continue;
    const icon = (icons as any)[key];
    if (icon && icon.slug === slug) {
      return { path: icon.path, hex: icon.hex };
    }
  }
  return null;
}
