import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { createClient } from '@/lib/supabase/server';
import Image from 'next/image';
import Link from 'next/link';

export default async function CertificatesPage() {
  const supabase = await createClient();

  const { data: hero } = await supabase
    .from('hero')
    .select('resume_url')
    .eq('id', 1)
    .single();

  const { data: certificates } = await supabase
    .from('certifications')
    .select('*')
    .order('date', { ascending: false });

  return (
    <>
      <Navbar resumeUrl={hero?.resume_url || '/resume.pdf'} />

      <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-20 max-w-2xl">
          <h1 className="font-serif text-5xl md:text-7xl tracking-tight mb-6">
            Certificate Gallery
          </h1>

          <p className="text-xl text-white/70">
            A visual collection of my professional certifications and ongoing
            education.
          </p>
        </div>

        {/* Certificates */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates?.map((cert) => (
            <Link
              key={cert.id}
              href={cert.certificate_url || '#'}
              target={cert.certificate_url ? '_blank' : undefined}
              rel={cert.certificate_url ? 'noopener noreferrer' : undefined}
              className="group block"
            >
              <div className="bg-white/5 border border-white/10 p-3 pb-8 rounded-lg shadow-sm group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300">

                {/* Certificate Image */}
                <div className="relative w-full aspect-[4/3] rounded overflow-hidden mb-6 bg-white/[0.02]">
                  {cert.image_url ? (
                    <Image
                      src={cert.image_url}
                      alt={cert.name}
                      fill
                      className="object-contain group-hover:scale-[1.02] transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/20">
                      No Image
                    </div>
                  )}
                </div>

                {/* Certificate Details */}
                <div className="px-4">
                  <h3 className="text-lg font-medium mb-1 line-clamp-2">
                    {cert.name}
                  </h3>

                  <p className="text-sm text-white/60">
                    {cert.organization}
                  </p>

                  <div className="mt-4 pt-4 border-t border-white/10 text-xs font-medium text-white/50">
                    {cert.date}
                  </div>
                </div>

              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {!certificates?.length && (
          <div className="py-20 text-center text-white/40">
            No certificates available yet.
          </div>
        )}

      </main>

      <Footer />
    </>
  );
}

