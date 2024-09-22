export type Blog = {
  id: number;
  title: string;
  name: string;
  desc: string;
  jobTitle: string;
  content: string;
  image: string;
  slug: string;
  is_published: number;
  is_featured: number;
  created_at: Date;
  updated_at: Date;
  category: string;
  readTime: string;
};