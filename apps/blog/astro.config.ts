// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { siteConfig } from './src/configs/site';

// https://astro.build/config
export default defineConfig({
  site: siteConfig.site,
  integrations: [react(), sitemap()],
});
