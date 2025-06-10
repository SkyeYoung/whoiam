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
import createSymlink from './vite-plugin-create-symlink';

const curDir = import.meta.dirname;

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

  image: {
    experimentalLayout: 'full-width',
  },

  experimental: {
    responsiveImages: true,
    contentIntellisense: true,
  },

  vite: {
    build: {
      minify: false,
      sourcemap: true,
    },
    define: {
      __PROJECT__: {
        dir: curDir,
        root: path.resolve(curDir, '../..'),
        content: path.resolve(curDir, '../../content'),
      },
    },
    plugins: [
      createSymlink({
        links: [
          {
            source: path.resolve(curDir, '../../content'),
            target: path.resolve(curDir, './src/content'),
          },
        ],
      }),
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
    ],
  },

  output: 'static',
});
