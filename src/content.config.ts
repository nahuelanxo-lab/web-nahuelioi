import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Una ficha por proyecto: src/content/proyectos/año_cliente_proyecto.md ("sf" = sin fecha)
const proyectos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/proyectos' }),
  schema: z.object({
    titulo: z.string(),
    cliente: z.string(),                 // marca, artista o institución
    productora: z.string().optional(),   // productora o agencia
    rol: z.array(z.string()).default([]),// p. ej. ["Dirección de fotografía", "Cámara"]
    año: z.number().optional(),
    categoria: z.enum(['publicidad', 'videoclip', 'evento', 'fotografia']),
    video: z.object({
      plataforma: z.enum(['youtube', 'vimeo', 'bunny']),
      id: z.string(),
    }).optional(),
    poster: z.string().optional(),       // imagen de portada (URL o ruta en /public)
    preview: z.string().optional(),      // clip corto en bucle para el hover (mp4)
    galeria: z.array(z.string()).optional(),
    camara: z.string().optional(),       // cámara / ópticas
    creditos: z.string().optional(),
    orden: z.number().default(999),
    destacado: z.boolean().default(false),
    publicado: z.boolean().default(true),
    pendiente: z.string().optional(),    // nota interna: no se muestra en la web
    origen: z.string().optional(),       // URL en la web antigua
  }),
});

export const collections = { proyectos };
