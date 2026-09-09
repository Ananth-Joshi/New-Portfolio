import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import ProjectsSection from '@/components/ProjectsSection';
import ExperienceSection from '@/components/ExperienceSection';
import SkillsSection from '@/components/SkillsSection';
import CertificationsSection from '@/components/CertificationsSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Hero />
        <ProjectsSection />
        <ExperienceSection />
        <SkillsSection />
        <CertificationsSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
