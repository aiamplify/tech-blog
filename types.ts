export interface Article {
  id: string;
  title: string;
  category: string;
  date: string;
  imageUrl: string;
  excerpt: string;
  content?: string; // Full content for detail view
  slug?: string;
  metaDescription?: string;
  keywords?: string[];
  status?: 'draft' | 'published';
  scheduledDate?: string;
}

export interface NavLink {
  label: string;
  href: string;
}
