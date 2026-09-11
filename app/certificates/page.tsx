import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { certifications } from '@/data/certifications';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/server';

export default async function CertificatesPage() {
  
  const supabase = await createClient();

  const { data: hero } = await supabase
    .from('hero')
    .select('resume_url')
    .eq('id', 1)
    .single();

  return (
    <>
      <Navbar resumeUrl={hero?.resume_url || '/resume.pdf'} />
      <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="mb-20 max-w-2xl">
          <h1 className="font-serif text-5xl md:text-7xl tracking-tight mb-6">Certificate Gallery</h1>
          <p className="text-xl text-white/70">A visual collection of my professional certifications and ongoing education.</p>
        </div>

        {/* Masonry-like grid using CSS columns for simplicity */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {certifications.map((cert) => (
            <div key={cert.id} className="break-inside-avoid bg-white/5 border border-white/10 p-4 rounded-xl shadow-sm hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="relative w-full rounded overflow-hidden bg-white/[0.02] mb-6">
                <Image
                  src={cert.image}
                  alt={cert.name}
                  width={800}
                  height={1000} // Dynamic height works well with columns
                  className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="text-xl font-medium mb-2">{cert.name}</h3>
              <p className="text-white/60">{cert.organization}</p>
              <div className="mt-4 pt-4 border-t border-white/10 text-sm font-medium text-white/50">
                {cert.date}
              </div>
            </div>
          ))}
          
          {/* Add a few extra dummy certs to show off the masonry look */}
          <div className="break-inside-avoid bg-blue-500/10 border border-blue-500/20 p-8 rounded-xl flex items-center justify-center min-h-[300px]">
            <p className="text-blue-400 font-serif text-lg italic text-center max-w-[200px]">
              Currently studying for AWS Certified Data Engineer...
            </p>
          </div>
          
           <div className="break-inside-avoid bg-white/5 border border-white/10 p-4 rounded-xl shadow-sm hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="relative w-full rounded overflow-hidden bg-white/[0.02] mb-6">
                <Image
                  src="https://picsum.photos/seed/cert5/800/1200"
                  alt="Dummy Cert"
                  width={800}
                  height={1200}
                  className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="text-xl font-medium mb-2">Advanced TypeScript Patterns</h3>
              <p className="text-white/60">Frontend Masters</p>
              <div className="mt-4 pt-4 border-t border-white/10 text-sm font-medium text-white/50">
                Nov 2021
              </div>
            </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
