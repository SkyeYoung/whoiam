import {
  defineConfig,
  presetUno,
  presetAttributify,
  presetIcons,
  presetTypography,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      collections: {
        'material-symbols': () => import('@iconify-json/material-symbols/icons.json').then(i => i.default),
        'material-symbols-light': () => import('@iconify-json/material-symbols-light/icons.json').then(i => i.default),
        'ri': () => import('@iconify-json/ri/icons.json').then(i => i.default),
      },
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    presetTypography(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  shortcuts: [
    // Custom shortcuts to match existing Tailwind classes
    ['a-normal', 'text-zinc-800 border-b border-zinc-800/25 border-dashed hover:text-violet-800/80 hover:border-violet-800/50 transition-colors no-underline'],
  ],
  theme: {
    colors: {
      // Custom color definitions if needed
    },
    animation: {
      // Add custom animations if needed
      'bounce': 'bounce 1s infinite',
      'spin': 'spin 1s linear infinite',
      'ping': 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
      'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    },
  },
  content: {
    pipeline: {
      include: [
        // Include all relevant file types
        /\.(vue|svelte|tsx?|jsx?|astro)($|\?)/,
        'src/**/*.{js,ts,jsx,tsx,astro,vue,svelte}',
        'content/**/*.{md,mdx}',
      ],
    },
  },
})