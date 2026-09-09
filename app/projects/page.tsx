import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { featuredProjects, otherProjects } from '@/data/projects';
import Image from 'next/image';

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="mb-20">
          <h1 className="font-serif text-5xl md:text-7xl tracking-tight mb-6">All Projects</h1>
          <p className="text-xl text-white/70 max-w-2xl">A complete archive of things I&apos;ve built, open-sourced, or experimented with.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-32">
          {featuredProjects.map((project) => (
            <div key={project.id} className="group">
              <div className={`relative w-full aspect-video rounded-xl overflow-hidden mb-6 ${project.color || 'bg-white/5'}`}>
                <div className="absolute inset-4 overflow-hidden rounded shadow-md group-hover:scale-105 transition-transform duration-500">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <h3 className="text-2xl font-medium mb-3">{project.title}</h3>
              <p className="text-white/70 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map(tech => (
                  <span key={tech} className="text-xs font-medium uppercase text-white/50 border border-white/10 px-2 py-1 rounded">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-20">
          <h2 className="font-serif text-4xl mb-12">Minor Projects & Experiments</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {otherProjects.map((project, i) => (
              <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-xl hover:border-white/30 transition-colors">
                <h4 className="font-medium mb-2">{project.title}</h4>
                <p className="text-sm text-white/70 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs text-white/50">
                  {project.technologies.map(tech => <span key={tech}>{tech}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
