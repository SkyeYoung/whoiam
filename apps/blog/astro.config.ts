import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { siteConfig } from './src/configs/site';

import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import unpluginInfo from 'unplugin-info/astro';
import unpluginIcons from 'unplugin-icons/vite';

// https://astro.build/config
export default defineConfig({
  site: siteConfig.site,
  integrations: [react(), sitemap(), mdx(), unpluginInfo()],

  vite: {
    plugins: [
      tailwindcss(),
      unpluginIcons({
        autoInstall: true,
        compiler: 'jsx',
        jsx: 'react',
      }),
    ] as any[],
  },
});
