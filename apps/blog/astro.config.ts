import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { siteConfig } from './src/configs/site';

import tailwindcss from '@tailwindcss/vite';
import mdx, { type MdxOptions } from '@astrojs/mdx';
import unpluginInfo from 'unplugin-info/astro';
import unpluginIcons from 'unplugin-icons/vite';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGemoji from 'remark-gemoji';
import { remarkAlert } from 'remark-github-blockquote-alert';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';
import pagefind from 'astro-pagefind';
import type { AstroUserConfig } from 'astro';

const mdOpts = {
  remarkPlugins: [remarkGemoji, remarkAlert],
  rehypePlugins: [
    rehypeSlug,
    [
      rehypeAutolinkHeadings,
      {
        behavior: 'append',
      },
    ],
  ],
};

// https://astro.build/config
export default defineConfig({
  site: siteConfig.site,
  markdown: { ...(mdOpts as AstroUserConfig['markdown']) },
  integrations: [
    react(),
    sitemap(),
    mdx(mdOpts as unknown as MdxOptions),
    unpluginInfo(),
    pagefind(),
  ],
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  experimental: {
    clientPrerender: true,
  },
  vite: {
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
    ] as any[],
  },
});
