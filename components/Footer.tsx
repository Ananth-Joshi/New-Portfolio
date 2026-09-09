import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="py-12 border-t border-white/10 px-6 md:px-12 bg-background">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start">
          <span className="font-serif text-lg font-medium">A. Developer</span>
          <span className="text-sm text-white/50 mt-1">© {new Date().getFullYear()} All rights reserved.</span>
        </div>
        
        <div className="flex gap-6">
          <a href="#" className="text-sm font-medium hover:text-accent-blue transition-colors">GitHub</a>
          <a href="#" className="text-sm font-medium hover:text-accent-blue transition-colors">LinkedIn</a>
          <a href="#" className="text-sm font-medium hover:text-accent-blue transition-colors">Twitter</a>
        </div>
      </div>
    </footer>
  );
}
