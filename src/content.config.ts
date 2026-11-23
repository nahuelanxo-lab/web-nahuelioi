import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Una ficha por proyecto: src/content/proyectos/año_cliente_proyecto.md
const proyectos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/proyectos' }),
  schema: z.object({
    titulo: z.string(),
    cliente: z.string(),
    productora: z.string().optional(),   // productora o agencia
    rol: z.array(z.string()),            // p. ej. ["Dirección de fotografía", "Cámara"]
    año: z.number(),
    categoria: z.enum(['empresa', 'videoclip', 'evento', 'publicidad', 'documental', 'fotografia']),
    video: z.string().optional(),        // id o URL del vídeo (Bunny/Vimeo, por decidir)
    poster: z.string().optional(),       // ruta a la imagen de portada
    destacado: z.boolean().default(false),
  }),
});

export const collections = { proyectos };
