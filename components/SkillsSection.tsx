'use client';

import { skills } from '@/data/skills';
import { motion } from 'motion/react';
import Image from 'next/image';

export default function SkillsSection() {
  return (
    <section id="skills" className="py-32 px-6 md:px-12 bg-white/[0.02] my-12 border-y border-white/10">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <span className="text-sm font-medium tracking-widest text-white/50 uppercase mb-4 block">I Work With</span>
          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight leading-none max-w-4xl">
            Modern tools for modern problems.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-20">
          {Object.entries(skills).map(([category, items], index) => (
            <motion.div 
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col border-t border-white/10 pt-8"
            >
              <h3 className="text-sm font-medium uppercase tracking-wider text-accent-blue mb-8">
                {category}
              </h3>
              
              <div className="flex flex-wrap gap-4">
                {items.map((skill) => (
                  <div 
                    key={skill.name} 
                    className="flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-3 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 group"
                  >
                    <div className="relative w-6 h-6 opacity-70 group-hover:opacity-100 transition-opacity">
                      <Image 
                        src={`https://cdn.simpleicons.org/${skill.iconSlug}/white`} 
                        alt={skill.name}
                        fill
                        className="object-contain"
                        unoptimized
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <span className="font-medium text-white/80 group-hover:text-white transition-colors">{skill.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
