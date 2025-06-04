import { file, glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';
import path from 'path';
import { parse } from 'yaml';

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

const contentDir = path.resolve(process.cwd(), '../../content');

const blog = defineCollection({
  loader: glob({
    pattern: ['**/*.md', '**/*.mdx'],
    base: path.join(contentDir, 'blog'),
  }),
  schema: blogSchema,
});

export const friends = defineCollection({
  loader: file(path.join(contentDir, 'friends/links.yaml'), {
    parser: (text) => {
      const data = parse(text) as { img: string }[];
      return data.map((item) => ({
        ...item,
        img: path.join(contentDir, 'friends/assets', item.img),
      }));
    },
  }),
  schema: ({ image }) =>
    z.object({
      id: z.string(),
      url: z.string().url(),
      img: image(),
      desc: z.string().optional(),
    }),
});

export const collections = {
  blog,
  friends,
};
