/**
 * Content types for news, events, achievements, gallery, about.
 * Used by build-time loaders only. Flat models; SK/EN as separate files.
 */

export interface News {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  body: string;
  date: string;
  image?: string;
  pinned?: boolean;
}

export interface Event {
  id: string;
  slug: string;
  title: string;
  date: string;
  time?: string;
  location?: string;
  description?: string;
  link?: string;
  type?: string;
}

export interface Achievement {
  id: string;
  title: string;
  year: number;
  award: string;
  category?: string;
  description?: string;
  image?: string;
  order?: number;
}

export interface GalleryImage {
  src: string;
  caption?: string;
  order?: number;
}

export interface GalleryAlbum {
  id: string;
  slug: string;
  title: string;
  date?: string;
  year?: number;
  coverImage?: string;
  order?: number;
  images?: GalleryImage[];
}

export interface AboutSection {
  history?: string;
  mission?: string;
  team?: Array<{ name: string; role?: string }>;
}

export type { News as NewsItem, Event as EventItem };
