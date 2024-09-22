export type Project = {
  id: number;
  title: string;
  desc: string;
  slug: string;
  image: string;
  project_url?: string;
  code_url?: string;
  technologies: string;
  project_name: string;
  short_desc: string;
  project_icon?: string;
  content: string;
  is_published: number;
  is_featured: number;
  created_at: Date;
  updated_at: Date;
};