'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';

export default function ProjectsSection({ projects = [] }: { projects?: any[] }) {
  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  if (!projects.length) return null;

  return (
    <section id="projects" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="mb-20">
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight">Featured Work</h2>
      </div>

      <div className="flex flex-col gap-32">
        {featuredProjects.map((project, index) => {
          const isEven = index % 2 === 0;
          
          return (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className={`flex flex-col gap-10 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center`}
            >
              {/* Image Area */}
              <div className="w-full lg:w-3/5 group">
                <div className={`relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden rounded-2xl bg-white/5`}>
                  <motion.div 
                    className="absolute inset-4 sm:inset-8 shadow-xl overflow-hidden rounded-xl"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    {project.image_url && (
                      <Image
                        src={project.image_url}
                        alt={project.title}
                        fill
                        className="object-contain"
                        referrerPolicy="no-referrer"
                      />
                    )}
                  </motion.div>
                </div>
              </div>

              {/* Content Area */}
              <div className="w-full lg:w-2/5 flex flex-col items-start px-4 lg:px-8">
                <span className="text-4xl font-serif text-white/20 mb-4">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="text-3xl font-medium mb-6">{project.title}</h3>
                <p className="text-white/70 text-lg mb-8 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-10">
                  {project.technologies?.map((tech: string) => (
                    <span key={tech} className="text-xs font-medium uppercase tracking-wider text-white/50 border border-white/10 px-3 py-1 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>

                {project.demo_url || project.github_url ? (
                  <Link 
                    href={project.demo_url || project.github_url || '#'}
                    className="font-medium text-lg border-b border-foreground pb-1 hover:text-accent-blue hover:border-accent-blue transition-colors flex items-center gap-2 group"
                  >
                    View project
                    <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                  </Link>
                ) : null}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Other Projects */}
      {otherProjects.length > 0 && (
        <div className="mt-40 border-t border-white/10 pt-20">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-12">
            <h3 className="font-serif text-3xl mb-4 md:mb-0">Other Projects</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherProjects.map((project, i) => (
              <div key={project.id} className="p-8 bg-white/5 border border-white/10 rounded-2xl hover:shadow-lg transition-shadow group flex flex-col">
                <h4 className="text-xl font-medium mb-3 group-hover:text-accent-purple transition-colors">{project.title}</h4>
                <p className="text-white/70 mb-6 text-sm flex-1">{project.description}</p>
                <div className="flex flex-wrap gap-x-3 gap-y-2 text-xs text-white/50 font-medium mt-auto">
                  {project.technologies?.map((tech: string) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
