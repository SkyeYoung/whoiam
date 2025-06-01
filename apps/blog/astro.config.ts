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
import type { AstroUserConfig } from 'astro';

const mdOpts = {
  remarkPlugins: [remarkGemoji, remarkAlert],
  rehypePlugins: [
    rehypeSlug,
    [
      rehypeAutolinkHeadings,
      {
        behavior: 'prepend',
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
        autoInstall: true,
        compiler: 'jsx',
        jsx: 'react',
      }),
    ] as any[],
  },
});
