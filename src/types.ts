export interface Project {
  id: string;
  title: string;
  client: string;
  category: 'Branding' | 'Packaging' | 'Digital' | '3D & Motion' | 'Editorial' | 'Campaign' | 'Art Direction' | 'Product Design' | 'Fashion';
  year: string;
  image: string;
  website?: string;
  video?: string;
  duration?: string;
  tag?: string;
  aspectRatio?: string;
  accentColor: string;
  badge?: string;
  shortDesc: string;
  fullDesc: string;
  challenge: string;
  solution: string;
  deliverables: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  palette: {
    name: string;
    hex: string;
  }[];
  gallery: {
    url: string;
    caption: string;
  }[];
}

export interface ApproachStep {
  number: string;
  title: string;
  timeline: string;
  subtitle: string;
  description: string;
  keyActivities: string[];
  deliverables: string[];
}

export interface JournalArticle {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string[];
  tags: string[];
}

export interface CreatorMember {
  name: string;
  role: string;
  location: string;
  specialty: string;
  avatar: string;
}
