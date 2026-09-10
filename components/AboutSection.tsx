'use client';

import { motion } from 'motion/react';

export default function AboutSection({ data }: { data?: any }) {
  const heading = data?.heading || 'About Me';
  const text = data?.text || "I'm a software engineer who cares deeply about the intersection of technical performance and user experience. I believe that the best code is the code you never have to think about, powering interfaces that feel completely natural.\n\nOver the past 5 years, I've worked across the stack from complex React frontends to highly concurrent Go backends. My current focus is building robust APIs and scaling web infrastructure.";

  // Split text by paragraphs
  const paragraphs = text.split('\n').filter((p: string) => p.trim());

  return (
    <section id="about" className="py-24 px-6 md:px-12 max-w-7xl mx-auto my-24 bg-blue-500/5 rounded-3xl">
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 p-8 md:p-12">
        
        {/* Left: Intro */}
        <div className="w-full lg:w-3/5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-4xl md:text-5xl tracking-tight mb-8">{heading}</h2>
            <div className="text-lg md:text-xl text-white/70 leading-relaxed space-y-6">
              {paragraphs.map((paragraph: string, index: number) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right: Facts */}
        <div className="w-full lg:w-2/5 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-6 p-8 bg-white/5 rounded-2xl shadow-sm border border-blue-500/20"
          >
            <div>
              <span className="block text-xs font-medium uppercase tracking-wider text-white/50 mb-1">Based in</span>
              <span className="text-lg font-medium">Mangalore, India</span>
            </div>
            <div>
              <span className="block text-xs font-medium uppercase tracking-wider text-white/50 mb-1">Focus</span>
              <span className="text-lg font-medium">Software Engineering</span>
            </div>
            <div>
              <span className="block text-xs font-medium uppercase tracking-wider text-white/50 mb-1">Interests</span>
              <span className="text-lg font-medium">Web / Backend / Systems</span>
            </div>
          </motion.div>
        </div>
        
      </div>
    </section>
  );
}
