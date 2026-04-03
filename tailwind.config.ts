import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: 'var(--sds-color-background-brand-default)',
        'on-brand': 'var(--sds-color-text-brand-on-brand)',
        'text-primary': 'var(--sds-color-text-default-default)',
        'text-secondary': 'var(--sds-color-text-default-secondary)',
        'border-default': 'var(--sds-color-border-default-default)',
        'border-brand': 'var(--sds-color-border-brand-default)',
        surface: 'var(--sds-color-background-default-default)',
      },
      borderRadius: {
        sm: 'var(--sds-size-radius-100)',
        md: 'var(--sds-size-radius-200)',
        lg: 'var(--sds-size-radius-400)',
        full: 'var(--sds-size-radius-full)',
      },
      spacing: {
        'space-1': 'var(--sds-size-space-100)',
        'space-2': 'var(--sds-size-space-200)',
        'space-3': 'var(--sds-size-space-300)',
        'space-4': 'var(--sds-size-space-400)',
        'space-6': 'var(--sds-size-space-600)',
        'space-8': 'var(--sds-size-space-800)',
        'space-12': 'var(--sds-size-space-1200)',
      },
      fontSize: {
        'title-hero': ['var(--sds-typography-title-hero-size)', { lineHeight: '1.2', fontWeight: '700', letterSpacing: '-0.03em' }],
        'title-page': ['var(--sds-typography-title-page-size-base)', { lineHeight: '1.2', fontWeight: '700', letterSpacing: '-0.02em' }],
        heading: ['var(--sds-typography-heading-size-base)', { lineHeight: '1.2', fontWeight: '600', letterSpacing: '-0.02em' }],
        subheading: ['var(--sds-typography-subheading-size-medium)', { lineHeight: '1.2' }],
        body: ['var(--sds-typography-body-size-medium)', { lineHeight: '1.4' }],
        'body-sm': ['var(--sds-typography-body-size-small)', { lineHeight: '1.4' }],
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 4px var(--sds-color-black-200), 0 1px 4px var(--sds-color-black-100)',
      },
    },
  },
  plugins: [],
}

export default config
