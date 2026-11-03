/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        page: '#FFFFFF',
        surface: '#F5F7FA',
        'surface-2': '#EDF1F5',
        elevated: '#FFFFFF',
        text: '#111827',
        'text-muted': '#6B7280',
        'text-soft': '#6B7280',
        border: '#E5E7EB',
        accent: '#146C82',
        'accent-dark': '#0F5063',
        'accent-soft': '#DCECEF',
        navy: '#0B1F3A',
        'navy-hover': '#16304F',
        'navy-strong': '#0B1F3A',
        'base-light': '#F5F7FA',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '1200px',
      },
      boxShadow: {
        sm: '0 1px 4px rgba(11,31,58,0.08)',
        md: '0 4px 16px rgba(11,31,58,0.12)',
        card: '0 8px 24px rgba(11,31,58,0.08)',
      },
      borderRadius: {
        card: '8px',
        btn: '6px',
      },
    },
  },
  plugins: [],
};
