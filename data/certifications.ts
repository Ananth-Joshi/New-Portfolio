export interface Certification {
  id: string;
  name: string;
  organization: string;
  date: string;
  image: string;
}

export const certifications: Certification[] = [
  {
    id: "cert-1",
    name: "AWS Certified Solutions Architect",
    organization: "Amazon Web Services",
    date: "Oct 2023",
    image: "https://picsum.photos/seed/cert1/800/600",
  },
  {
    id: "cert-2",
    name: "Professional Cloud Developer",
    organization: "Google Cloud",
    date: "Mar 2023",
    image: "https://picsum.photos/seed/cert2/800/600",
  },
  {
    id: "cert-3",
    name: "Frontend Developer Certificate",
    organization: "Meta",
    date: "Aug 2022",
    image: "https://picsum.photos/seed/cert3/600/800",
  },
  {
    id: "cert-4",
    name: "CKAD: Kubernetes Application Developer",
    organization: "Linux Foundation",
    date: "Jan 2022",
    image: "https://picsum.photos/seed/cert4/800/1000",
  }
];
