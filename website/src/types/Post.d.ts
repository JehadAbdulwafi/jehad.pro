export type Post = {
  id: number;
  title: string;
  name: string;
  desc: string;
  jobTitle: string;
  content: string;
  image: string;
  slug: string;
  is_published: boolean;
  is_featured: boolean;
  created_at: Date;
  updated_at: string;
  category: string;
  readTime: string;
};