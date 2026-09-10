'use client';

import { motion } from 'motion/react';

export default function ContactSection() {
  return (
    <section className="px-6 md:px-12 py-32 mb-12 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="bg-foreground text-background rounded-3xl p-12 md:p-24 flex flex-col items-center text-center relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-[-10%] left-[-5%] w-64 h-64 bg-accent-orange/20 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-5%] w-64 h-64 bg-accent-blue/20 rounded-full blur-3xl" />
        
        <h2 className="font-serif text-5xl md:text-7xl tracking-tight mb-6 relative z-10">
          Have a project in mind?<br/>
          <span className="italic text-background/60">Let&apos;s talk.</span>
        </h2>
        
        <p className="text-lg text-background/70 mb-16 relative z-10 max-w-md">
          I&apos;m currently available for freelance projects and open to full-time opportunities.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 relative z-10">
          <a 
            href="mailto:ananthj82@gmail.com" 
            className="px-8 py-4 bg-background text-foreground font-medium rounded-full hover:scale-105 transition-transform shadow-lg"
          >
            Email me
          </a>
          <a 
            href="https://www.linkedin.com/in/ananth-a-joshi" 
            className="px-8 py-4 border border-background/20 font-medium rounded-full hover:border-background/40 transition-colors"
          >
            LinkedIn
          </a>
          <a 
            href="https://github.com/Ananth-Joshi" 
            className="px-8 py-4 border border-background/20 font-medium rounded-full hover:border-background/40 transition-colors"
          >
            GitHub
          </a>
        </div>
      </motion.div>
    </section>
  );
}
