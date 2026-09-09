'use client';

import { motion } from 'motion/react';

export default function ExperienceSection({ experiences = [] }: { experiences?: any[] }) {
  if (!experiences.length) return null;

  return (
    <section id="experience" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="mb-20">
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight">Experience</h2>
      </div>

      <div className="relative border-l border-white/10 ml-3 md:ml-6">
        {experiences.map((exp, index) => (
          <motion.div 
            key={exp.id || index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="mb-16 last:mb-0 relative pl-8 md:pl-16 group"
          >
            {/* Timeline Dot */}
            <div className="absolute -left-[5px] top-[0.4rem] h-[9px] w-[9px] rounded-full bg-white/20 group-hover:bg-accent-green group-hover:scale-150 transition-all duration-300" />
            
            <div className="flex flex-col md:flex-row gap-4 md:gap-16">
              {/* Year Column */}
              <div className="w-full md:w-1/3 lg:w-1/4">
                <span className="text-xl font-serif text-white/40 group-hover:text-accent-green transition-colors">
                  {exp.start_date} {exp.end_date ? `— ${exp.end_date}` : ''}
                </span>
              </div>
              
              {/* Details Column */}
              <div className="w-full md:w-2/3 lg:w-3/4 flex flex-col">
                <div className="flex items-center gap-4 mb-1">
                  {exp.company_logo && (
                    <img src={exp.company_logo} alt={exp.company} className="h-8 w-8 object-contain rounded" />
                  )}
                  <h3 className="text-2xl font-medium">{exp.company}</h3>
                </div>
                <span className="text-accent-green font-medium mb-6">{exp.role}</span>
                <p className="text-white/70 text-lg leading-relaxed max-w-2xl">
                  {exp.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
