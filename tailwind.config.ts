import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        mono:    ['Share Tech Mono', 'monospace'],
        body:    ['Inter', 'sans-serif'],
      },
      colors: {
        red:     { DEFAULT:'#C0142A', bright:'#ff1a35' },
        surface: { DEFAULT:'#0d0d12', 2:'#13131a' },
      },
    },
  },
  plugins: [],
}
export default config
