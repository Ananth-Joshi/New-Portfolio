'use client';
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center min-h-[50vh] px-6 text-center">
          <h2 className="text-4xl font-serif mb-4 text-white">Something went wrong!</h2>
          <button 
            onClick={() => reset()}
            className="px-6 py-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors border border-white/10"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
