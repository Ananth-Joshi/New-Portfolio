import * as icons from 'simple-icons';

export default function SimpleIcon({ slug, className }: { slug: string, className?: string }) {
  if (!slug) return null;
  
  // Find icon by slug
  let foundIcon = null;
  for (const key in icons) {
    if (key === 'default') continue;
    const icon = (icons as any)[key];
    if (icon && icon.slug === slug) {
      foundIcon = icon;
      break;
    }
  }

  if (!foundIcon) {
    return <span className={className}>[Icon not found]</span>;
  }

  return (
    <svg 
      viewBox="0 0 24 24" 
      className={className} 
      fill={`#${foundIcon.hex}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={foundIcon.path} />
    </svg>
  );
}
