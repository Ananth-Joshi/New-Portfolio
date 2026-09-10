'use client';

import { motion } from 'motion/react';
import { Code } from 'lucide-react';

export default function SkillsSection({ technologies = [] }: { technologies?: any[] }) {
  if (!technologies.length) return null;

  // Group technologies by category
  const categories = technologies.reduce((acc, tech) => {
    if (!acc[tech.category]) acc[tech.category] = [];
    acc[tech.category].push(tech);
    return acc;
  }, {} as Record<string, any[]>);

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
          {Object.entries<any[]>(categories).map(([category, items], index) => (
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
                {items.map((skill: any) => {
                  return (
                    <div 
                      key={skill.id} 
                      className="flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-3 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 group"
                    >
                      {skill.iconPath ? (
                        <svg 
                          viewBox="0 0 24 24" 
                          className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" 
                          fill={`#${skill.iconHex}`}
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d={skill.iconPath} />
                        </svg>
                      ) : (
                        <Code className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
                      )}
                      
                      <span className="font-medium text-white/80 group-hover:text-white transition-colors">{skill.name}</span>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
