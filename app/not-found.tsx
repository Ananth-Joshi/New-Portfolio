import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] px-6 text-center">
      <h2 className="text-4xl font-serif mb-4 text-foreground">404 - Not Found</h2>
      <p className="text-foreground/70 mb-8 max-w-md">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Link 
        href="/"
        className="px-6 py-3 bg-white/10 text-foreground rounded-full hover:bg-white/20 transition-colors border border-white/10"
      >
        Return Home
      </Link>
    </div>
  );
}
