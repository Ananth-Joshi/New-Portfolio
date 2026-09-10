import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import ProjectsSection from '@/components/ProjectsSection';
import ExperienceSection from '@/components/ExperienceSection';
import SkillsSection from '@/components/SkillsSection';
import CertificationsSection from '@/components/CertificationsSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import { createClient } from '@/lib/supabase/server';

// Import fallback data
import { featuredProjects, otherProjects } from '@/data/projects';
import { experiences } from '@/data/experience';
import { skills } from '@/data/skills';
import { certifications } from '@/data/certifications';

export default async function Home() {
  let hero, settings, projects, experience, technologies, certificates, about;

  const isSupabaseConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  try {
    if (!isSupabaseConfigured) {
      throw new Error("Missing config");
    }

    const supabase = await createClient();
    
    // Fetch all data
    const [heroRes, settingsRes, projectsRes, expRes, techRes, certRes, aboutRes] = await Promise.all([
      supabase.from('hero').select('*').eq('id', 1).single(),
      supabase.from('site_settings').select('*').eq('id', 1).single(),
      supabase.from('projects').select('*').eq('show_on_home', true).order('display_order', { ascending: true }),
      supabase.from('experience').select('*').eq('show_on_home', true).order('display_order', { ascending: true }),
      supabase.from('technologies').select('*').eq('show_on_home', true).order('category', { ascending: true }).order('display_order', { ascending: true }),
      supabase.from('certificates').select('*').eq('show_on_home', true).order('display_order', { ascending: true }),
      supabase.from('about').select('*').eq('id', 1).single()
    ]);

    hero = heroRes.data;
    settings = settingsRes.data;
    
    projects = projectsRes.data?.slice(0, settings?.home_projects_count || 3) || [];
    experience = expRes.data?.slice(0, settings?.home_experience_count || 2) || [];
    technologies = techRes.data?.slice(0, settings?.home_technologies_count || 8) || [];
    certificates = certRes.data?.slice(0, settings?.home_certificates_count || 4) || [];
    
    about = aboutRes.data;

  } catch (e) {
    // If Supabase is not configured or fails, use the static data as a graceful fallback
    hero = undefined; // Hero component has fallback defaults
    about = undefined; // About component has fallback defaults
    
    // Map static projects
    projects = [
      ...featuredProjects.map((p, i) => ({
        id: p.id,
        title: p.title,
        description: p.description,
        image_url: p.image,
        technologies: p.technologies,
        demo_url: p.link,
        featured: true,
        show_on_home: true,
        display_order: i
      })),
      ...otherProjects.map((p, i) => ({
        id: `other-${i}`,
        title: p.title,
        description: p.description,
        technologies: p.technologies,
        featured: false,
        show_on_home: true,
        display_order: i + 10
      }))
    ].slice(0, 4);

    // Map static experience
    experience = experiences.map((exp, i) => ({
      id: i,
      company: exp.company,
      role: exp.role,
      start_date: exp.year.split(' — ')[0],
      end_date: exp.year.split(' — ')[1],
      description: exp.description,
      show_on_home: true,
      display_order: i
    }));

    // Map static skills (technologies)
    technologies = [];
    let orderCounter = 0;
    Object.entries(skills).forEach(([category, catSkills]) => {
      catSkills.forEach(skill => {
        technologies.push({
          id: orderCounter,
          name: skill.name,
          category: category,
          icon_name: 'Code', // fallback icon
          show_on_home: true,
          display_order: orderCounter++
        });
      });
    });

    // Map static certificates
    certificates = certifications.map((cert, i) => ({
      id: cert.id,
      name: cert.name,
      organization: cert.organization,
      date: cert.date,
      image_url: cert.image,
      show_on_home: true,
      display_order: i
    })).slice(0, 3);
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Hero data={hero} />
        <ProjectsSection projects={projects} />
        <ExperienceSection experiences={experience} />
        <SkillsSection technologies={technologies} />
        <CertificationsSection certificates={certificates} />
        <AboutSection data={about} />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
