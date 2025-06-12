import z from 'zod/v4';
import { loadConfig } from '../utils/config';
import path from 'path';

const schema = z.object({
  site: z.string(),
  title: z.string(),
  description: z.string().default(''),
  author: z.string().default(''),
  defaultImage: z.string().optional(),
  socialMedia: z
    .object({
      github: z.string().optional(),
    })
    .optional(),
  keywords: z.array(z.string()).optional(),
});

export const siteConfig = await loadConfig({
  name: 'blog',
  configPath: path.resolve(process.cwd(), '../../blog.config.yaml'),
  schema,
});
