'use server'

import * as icons from 'simple-icons';

export async function searchIcons(query: string) {
  if (!query) return [];
  const q = query.toLowerCase();
  
  const results = [];
  for (const key in icons) {
    if (key === 'default') continue;
    const icon = (icons as any)[key];
    if (icon && icon.title && (icon.title.toLowerCase().includes(q) || icon.slug.includes(q))) {
      results.push({
        title: icon.title,
        slug: icon.slug,
        path: icon.path,
        hex: icon.hex
      });
      if (results.length >= 50) break;
    }
  }
  return results;
}
