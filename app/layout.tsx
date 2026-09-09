import type {Metadata} from 'next';
import './globals.css';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import Particles from '@/components/Particles';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
});

export const metadata: Metadata = {
  title: 'Portfolio | Software Engineer',
  description: 'An editorial-inspired personal developer portfolio.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable}`}>
      <body className="font-sans antialiased selection:bg-orange-200" suppressHydrationWarning>
        <Particles/>
        {children}
      </body>
    </html>
  );
}
