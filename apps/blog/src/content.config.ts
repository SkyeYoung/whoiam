import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';
import path from 'path';

export const blogSchema = z.object({
  title: z.string(),
  slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/),
  description: z.string(),
  tags: z.array(z.string()).default([]),
  categories: z.array(z.string()).default([]),
  cover: z.string().url().optional(),
  created_at: z.date(),
  updated_at: z.date(),
  draft: z.boolean().default(false),
});

export type BlogSchema = z.infer<typeof blogSchema>;

const blog = defineCollection({
  loader: glob({
    pattern: ['**/*.md', '**/*.mdx'],
    base: path.resolve(process.cwd(), '../../content/blog'),
  }),
  schema: blogSchema,
});

export const collections = {
  blog,
};
