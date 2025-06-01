import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { siteConfig } from './src/configs/site';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: siteConfig.site,
  title: siteConfig.title,
  description: siteConfig.description,
  integrations: [react(), sitemap()],

  vite: {
    plugins: [tailwindcss()],
  },
});
