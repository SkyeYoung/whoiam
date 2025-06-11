import { defineConfig, transformerVariantGroup, transformerDirectives } from 'unocss';
import presetWind from '@unocss/preset-wind4';
import { presetTypography } from '@unocss/preset-typography';
import { presetIcons } from '@unocss/preset-icons';
import { presetAnimations } from 'unocss-preset-animations';

export default defineConfig({
  content: {
    filesystem: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}']
  },
  presets: [
    presetWind({
      dark: 'class',
    }),
    presetTypography({
      cssExtend: {
        ':where(.prose)': {
          '--un-prose-body': 'var(--un-prose-zinc-700)',
          '--un-prose-headings': 'var(--un-prose-zinc-900)',
          '--un-prose-lead': 'var(--un-prose-zinc-600)',
          '--un-prose-links': 'var(--un-prose-zinc-900)',
          '--un-prose-bold': 'var(--un-prose-zinc-900)',
          '--un-prose-counters': 'var(--un-prose-zinc-500)',
          '--un-prose-bullets': 'var(--un-prose-zinc-300)',
          '--un-prose-hr': 'var(--un-prose-zinc-200)',
          '--un-prose-quotes': 'var(--un-prose-zinc-900)',
          '--un-prose-quote-borders': 'var(--un-prose-zinc-200)',
          '--un-prose-captions': 'var(--un-prose-zinc-500)',
          '--un-prose-code': 'var(--un-prose-zinc-900)',
          '--un-prose-pre-code': 'var(--un-prose-zinc-200)',
          '--un-prose-pre-bg': 'var(--un-prose-zinc-800)',
          '--un-prose-th-borders': 'var(--un-prose-zinc-300)',
          '--un-prose-td-borders': 'var(--un-prose-zinc-200)',
        },
        ':where(.prose-invert)': {
          '--un-prose-body': 'var(--un-prose-zinc-300)',
          '--un-prose-headings': 'var(--un-prose-white)',
          '--un-prose-lead': 'var(--un-prose-zinc-400)',
          '--un-prose-links': 'var(--un-prose-white)',
          '--un-prose-bold': 'var(--un-prose-white)',
          '--un-prose-counters': 'var(--un-prose-zinc-400)',
          '--un-prose-bullets': 'var(--un-prose-zinc-600)',
          '--un-prose-hr': 'var(--un-prose-zinc-700)',
          '--un-prose-quotes': 'var(--un-prose-zinc-100)',
          '--un-prose-quote-borders': 'var(--un-prose-zinc-700)',
          '--un-prose-captions': 'var(--un-prose-zinc-400)',
          '--un-prose-code': 'var(--un-prose-white)',
          '--un-prose-pre-code': 'var(--un-prose-zinc-300)',
          '--un-prose-pre-bg': 'rgb(0 0 0 / 50%)',
          '--un-prose-th-borders': 'var(--un-prose-zinc-600)',
          '--un-prose-td-borders': 'var(--un-prose-zinc-700)',
        },
      },
    }),
    presetAnimations(),
    presetIcons({
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
  ],
  transformers: [
    transformerDirectives({
      applyVariable: ['--at-apply', '--uno-apply', '--uno'],
    }),
    transformerVariantGroup(),
  ],
  shortcuts: {
    'a-normal': 'text-zinc-800 dark:text-zinc-200 border-b border-zinc-800/25 dark:border-zinc-200/25 border-dashed hover:text-violet-800/80 dark:hover:text-violet-400/80 hover:border-violet-800/50 dark:hover:border-violet-400/50 transition-colors no-underline',
  },
  theme: {
    extend: {
      animation: {
        'fade-in-up': 'fadeInUp 0.3s ease-out',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      lineClamp: {
        2: '2',
        3: '3',
      },
    },
  },
  rules: [
    // Custom rules for UnoCSS to match Tailwind behavior
    ['min-w-3xl', { 'min-width': '48rem' }],
    ['min-w-xl', { 'min-width': '36rem' }],
    ['animate-fill-mode-forwards', { 'animation-fill-mode': 'forwards' }],
    [/^animate-duration-(\d+)$/, ([, d]) => ({ 'animation-duration': `${d}ms` })],
  ],
});