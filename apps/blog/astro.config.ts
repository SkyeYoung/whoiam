import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { siteConfig } from './src/configs/site';

import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import unpluginInfo from 'unplugin-info/astro';
import unpluginIcons from 'unplugin-icons/vite';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';
import pagefind from 'astro-pagefind';
import tsconfigPaths from 'vite-tsconfig-paths';
import { rehypePlugins, remarkPlugins, shikiConfig } from './src/configs/md';
import path from 'path';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: siteConfig.site,

  markdown: {
    remarkPlugins,
    rehypePlugins,
    syntaxHighlight: {
      type: 'shiki',
      excludeLangs: ['mermaid', 'math'],
    },
    shikiConfig,
  },

  integrations: [
    react(),
    sitemap(),
    mdx({
      optimize: true,
    }),
    unpluginInfo(),
    pagefind(),
  ],

  experimental: {
    responsiveImages: true,
    contentIntellisense: true,
  },

  vite: {
    define: {
      __PROJECT__: {
        root: path.resolve(import.meta.dirname, '../..'),
        dir: import.meta.dirname,
      },
    },
    plugins: [
      tailwindcss(),
      unpluginIcons({
        compiler: 'jsx',
        jsx: 'react',
        autoInstall: true,
        customCollections: {
          my: FileSystemIconLoader('./src/assets/icons', (svg) =>
            svg.replace(/^<svg /, '<svg fill="currentColor" ')
          ),
        },
      }),
      tsconfigPaths(),
    ] as any[],
  },

  output: 'static',
  adapter: vercel({
    imageService: true,
  }),
});
