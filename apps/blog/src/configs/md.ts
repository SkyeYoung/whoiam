import type { RehypePlugins, RemarkPlugins, ShikiConfig } from 'astro';
import remarkBreaks from 'remark-breaks';
import remarkGemoji from 'remark-gemoji';
import remarkAlert from 'remark-github-blockquote-alert';
import remarkDirective from 'remark-directive';
import remarkDirectiveRehype from 'remark-directive-rehype';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeInferReadingTimeMeta from 'rehype-infer-reading-time-meta';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import { transformerTwoslash } from '@shikijs/twoslash';
import { rehypeMermaid } from '../utils/rehype-mermaid';

export const remarkPlugins = [
  remarkBreaks,
  remarkGemoji,
  remarkAlert,
  remarkDirective,
  remarkDirectiveRehype as any,
  remarkMath,
] satisfies RemarkPlugins;

export const rehypePlugins = [
  rehypeSlug,
  [
    rehypeAutolinkHeadings,
    {
      behavior: 'append',
    },
  ],
  rehypeKatex,
  rehypeInferReadingTimeMeta,
  rehypeMermaid,
] satisfies RehypePlugins;

export const shikiConfig = {
  themes: {
    light: 'github-light',
    dark: 'github-dark',
  },
  transformers: [
    transformerTwoslash({
      explicitTrigger: true,
    }),
  ],
} satisfies ShikiConfig;
