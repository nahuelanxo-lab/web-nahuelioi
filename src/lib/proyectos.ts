import { getCollection, type CollectionEntry } from 'astro:content';

export type Proyecto = CollectionEntry<'proyectos'>;

export const CATEGORIAS = {
  publicidad: 'Publicidad',
  videoclip: 'Videoclips',
  evento: 'Directo y eventos',
  fotografia: 'Fotografía',
} as const;

export async function publicados(): Promise<Proyecto[]> {
  return (await getCollection('proyectos', (p) => p.data.publicado))
    .sort((a, b) => a.data.orden - b.data.orden);
}

export function poster(p: Proyecto): string | undefined {
  return p.data.poster;
}

export function embedUrl(p: Proyecto): string | undefined {
  const v = p.data.video;
  if (!v) return;
  if (v.plataforma === 'youtube') return `https://www.youtube-nocookie.com/embed/${v.id}?rel=0&modestbranding=1`;
  if (v.plataforma === 'vimeo') return `https://player.vimeo.com/video/${v.id}?dnt=1&title=0&byline=0&portrait=0`;
  return `https://iframe.mediadelivery.net/embed/${v.id}?autoplay=false`;
}
