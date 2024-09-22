export type Project = {
  id: string;
  slug: string;
  title: string;
  date: string;
  featured_media: {
    source_url: string;
  },
  categories:
  {
    count: number;
    id: string;
    name: string;
    slug: string;
  }[],

  companies:
  {
    text: string;
    sourceImage: string;
  }[],

  site: {
    link: string;
    name: string;
  },
  excerpt: string;
  technologies: string[];
  content: string;
}