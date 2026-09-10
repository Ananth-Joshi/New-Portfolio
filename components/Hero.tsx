'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero({ data }: { data?: any }) {
  const name = data?.name || 'Alex';
  const role = data?.role || 'Software Engineer';
  const description = data?.description || 'I build robust software systems with a focus on clean architecture, beautiful interfaces, and calm user experiences.';
  const image_url = data?.image_url || 'https://picsum.photos/seed/hero/800/800';
  const resume_url = data?.resume_url || '/resume.pdf';

  return (
    <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-6 md:px-12 max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center lg:items-start gap-12 lg:gap-24">
      
      {/* Intro Text */}
      <div className="flex-1 w-full z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight leading-none mb-6">
            Hi, I&apos;m <br className="hidden md:block"/> 
            <span className="text-accent-orange italic">{name}</span>
            <br />
            {role}
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-md mb-10 leading-relaxed">
            {description}
          </p>
          
          <div className="flex items-center gap-4">
            <Link 
              href="#projects" 
              className="px-6 py-3 bg-foreground text-background font-medium rounded-full hover:bg-accent-orange transition-colors flex items-center gap-2 group"
            >
              Projects
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            <a 
              href={resume_url} 
              className="px-6 py-3 border border-white/20 font-medium rounded-full hover:border-foreground transition-colors"
            >
              Resume
            </a>
          </div>
        </motion.div>
      </div>

      {/* Visual Composition */}
      <div className="flex-1 w-full max-w-lg lg:max-w-none relative aspect-square lg:aspect-auto lg:h-[600px] flex items-center justify-center">
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Abstract Composition Shapes */}
          <div className="absolute top-[10%] left-[10%] w-[50%] h-[60%] bg-blue-500/20 rounded-2xl rotate-[-6deg] mix-blend-multiply" />
          <div className="absolute bottom-[15%] right-[10%] w-[60%] h-[50%] bg-orange-500/20 rounded-3xl rotate-[4deg] mix-blend-multiply" />
          <div className="absolute top-[30%] left-[30%] w-[50%] h-[40%] bg-green-500/20 rounded-full mix-blend-multiply opacity-80" />
          
          {/* Floating Image */}
          <motion.div 
            className="absolute top-[25%] left-[20%] w-[60%] h-[50%] rounded-xl overflow-hidden shadow-2xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Image 
              src={image_url} 
              alt="Hero visual" 
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          {/* Small decorative labels */}
          <motion.div 
            className="absolute top-[15%] right-[15%] bg-background px-4 py-2 rounded-full shadow-sm border border-white/10 text-xs font-medium tracking-wider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            EST. 2003
          </motion.div>
          <motion.div 
            className="absolute bottom-[20%] left-[5%] bg-foreground text-background px-4 py-2 rounded-full shadow-sm text-xs font-medium tracking-wider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            SYSTEMS / WEB
          </motion.div>
        </motion.div>
      </div>

    </section>
  );
}
