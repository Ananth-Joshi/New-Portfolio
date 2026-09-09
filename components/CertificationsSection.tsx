'use client';

import { certifications } from '@/data/certifications';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';

export default function CertificationsSection() {
  const previewCerts = certifications.slice(0, 3);

  return (
    <section id="certifications" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight mb-4">Certifications</h2>
          <p className="text-white/60 max-w-md">Continued learning and validated expertise across cloud and frontend ecosystems.</p>
        </div>
        
        <Link 
          href="/certificates" 
          className="inline-flex items-center gap-2 font-medium border-b border-foreground pb-1 hover:text-accent-orange hover:border-accent-orange transition-colors group"
        >
          View all certificates
          <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {previewCerts.map((cert, index) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              href="/certificates"
              className="group block"
            >
              <div className="bg-white/5 border border-white/10 p-3 pb-8 rounded-lg shadow-sm group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300">
                <div className="relative w-full aspect-[4/3] rounded overflow-hidden mb-6 bg-white/[0.02]">
                  <Image
                    src={cert.image}
                    alt={cert.name}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="px-4">
                  <h3 className="text-lg font-medium mb-1 line-clamp-2">{cert.name}</h3>
                  <p className="text-sm text-white/60">{cert.organization}</p>
                  <div className="mt-4 pt-4 border-t border-white/10 text-xs font-medium text-white/50">
                    {cert.date}
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
