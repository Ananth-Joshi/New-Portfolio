-- Run this SQL in your Supabase SQL Editor to set up the portfolio database

-- Site Settings
CREATE TABLE public.site_settings (
  id INT PRIMARY KEY DEFAULT 1,
  home_projects_count INT DEFAULT 3,
  home_experience_count INT DEFAULT 2,
  home_technologies_count INT DEFAULT 8,
  home_certificates_count INT DEFAULT 4
);

-- Hero
CREATE TABLE public.hero (
  id INT PRIMARY KEY DEFAULT 1,
  name TEXT,
  role TEXT,
  description TEXT,
  image_url TEXT,
  resume_url TEXT
);

-- Projects
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  technologies TEXT[] DEFAULT '{}',
  github_url TEXT,
  demo_url TEXT,
  featured BOOLEAN DEFAULT false,
  show_on_home BOOLEAN DEFAULT true,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Experience
CREATE TABLE public.experience (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company TEXT NOT NULL,
  company_logo TEXT,
  role TEXT,
  start_date TEXT,
  end_date TEXT,
  description TEXT,
  show_on_home BOOLEAN DEFAULT true,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Technologies
CREATE TABLE public.technologies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT,
  icon_name TEXT,
  show_on_home BOOLEAN DEFAULT true,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Certificates
CREATE TABLE public.certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  organization TEXT,
  date TEXT,
  image_url TEXT,
  certificate_url TEXT,
  show_on_home BOOLEAN DEFAULT true,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- About
CREATE TABLE public.about (
  id INT PRIMARY KEY DEFAULT 1,
  heading TEXT,
  text TEXT
);

-- Storage bucket for images
INSERT INTO storage.buckets (id, name, public) VALUES ('portfolio-images', 'portfolio-images', true) ON CONFLICT DO NOTHING;

-- Enable RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hero ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.technologies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.about ENABLE ROW LEVEL SECURITY;

-- Policies (Public read)
CREATE POLICY "Allow public read-only access" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Allow public read-only access" ON public.hero FOR SELECT USING (true);
CREATE POLICY "Allow public read-only access" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Allow public read-only access" ON public.experience FOR SELECT USING (true);
CREATE POLICY "Allow public read-only access" ON public.technologies FOR SELECT USING (true);
CREATE POLICY "Allow public read-only access" ON public.certificates FOR SELECT USING (true);
CREATE POLICY "Allow public read-only access" ON public.about FOR SELECT USING (true);

-- Admin policies (Authenticated users)
CREATE POLICY "Allow authenticated admin to manage" ON public.site_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated admin to manage" ON public.hero FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated admin to manage" ON public.projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated admin to manage" ON public.experience FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated admin to manage" ON public.technologies FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated admin to manage" ON public.certificates FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated admin to manage" ON public.about FOR ALL USING (auth.role() = 'authenticated');

-- Storage Policies
CREATE POLICY "Public images" ON storage.objects FOR SELECT USING (bucket_id = 'portfolio-images');
CREATE POLICY "Admin upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'portfolio-images' AND auth.role() = 'authenticated');
CREATE POLICY "Admin update" ON storage.objects FOR UPDATE USING (bucket_id = 'portfolio-images' AND auth.role() = 'authenticated');
CREATE POLICY "Admin delete" ON storage.objects FOR DELETE USING (bucket_id = 'portfolio-images' AND auth.role() = 'authenticated');

-- Insert default rows for singleton tables
INSERT INTO public.site_settings (id) VALUES (1) ON CONFLICT DO NOTHING;
INSERT INTO public.hero (id, name, role, description) VALUES (1, 'Alex', 'Software Engineer', 'I build robust software systems with a focus on clean architecture, beautiful interfaces, and calm user experiences.') ON CONFLICT DO NOTHING;
INSERT INTO public.about (id, heading, text) VALUES (1, 'About Me', 'I am a software engineer with a passion for building robust, scalable applications. I have experience across the stack, but my true love is crafting clean, performant backend systems and architectural patterns.') ON CONFLICT DO NOTHING;
