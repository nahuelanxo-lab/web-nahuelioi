import { getCollection, type CollectionEntry } from 'astro:content';

export type Proyecto = CollectionEntry<'proyectos'>;

/** Subcategorías de vídeo, en el orden en que se muestran */
export const VIDEO = {
  publicidad: 'Comercial',
  videoclip: 'Videoclips',
  evento: 'Eventos',
} as const;
export type CatVideo = keyof typeof VIDEO;

export async function publicados(): Promise<Proyecto[]> {
  return (await getCollection('proyectos', (p) => p.data.publicado))
    .sort((a, b) => a.data.orden - b.data.orden);
}
export const esFoto = (p: Proyecto) => p.data.categoria === 'fotografia';
export const videos = async () => (await publicados()).filter((p) => !esFoto(p));
export const fotos = async () => (await publicados()).filter(esFoto);

export const url = (p: Proyecto) => `/${esFoto(p) ? 'fotografia' : 'video'}/${p.id}/`;
export const etiqueta = (p: Proyecto) => (esFoto(p) ? 'Fotografía' : VIDEO[p.data.categoria as CatVideo]);

export function embedUrl(p: Proyecto): string | undefined {
  const v = p.data.video;
  if (!v) return;
  if (v.plataforma === 'youtube') return `https://www.youtube-nocookie.com/embed/${v.id}?rel=0&modestbranding=1&autoplay=1`;
  if (v.plataforma === 'vimeo') return `https://player.vimeo.com/video/${v.id}?dnt=1&title=0&byline=0&portrait=0&autoplay=1`;
  return `https://iframe.mediadelivery.net/embed/${v.id}?autoplay=true`;
}
