import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { siteConfig } from './src/configs/site';

import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import unpluginInfo from 'unplugin-info/astro';

// https://astro.build/config
export default defineConfig({
  site: siteConfig.site,
  integrations: [react(), sitemap(), mdx(), unpluginInfo()],

  vite: {
    plugins: [tailwindcss()] as any[],
  },
});
