import z from 'zod/v4';
import { loadConfig } from '../utils/config';
import path from 'path';

const schema = z.object({
  site: z.string(),
});

export const siteConfig = await loadConfig({
  name: 'blog',
  configPath: path.resolve(process.cwd(), '../../blog.config.yaml'),
  schema,
});
