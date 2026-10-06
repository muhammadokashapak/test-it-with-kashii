import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#090d16',
        surface: '#111827',
        surfaceCard: '#1a2236',
        borderMuted: '#243049',
        brandPrimary: '#6366f1',
        brandSecondary: '#a855f7',
        brandAccent: '#06b6d4',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'radial-gradient(ellipse at 50% -20%, rgba(99, 102, 241, 0.25), transparent 70%)',
      },
    },
  },
  plugins: [],
};

export default config;
