import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        'bounce-in': 'bounce-in 0.6s ease-out',
        'wiggle': 'wiggle 0.8s ease-in-out',
        'sparkle': 'sparkle 1s ease-in-out infinite',
        'pop-in': 'pop-in 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'float': 'float 3s ease-in-out infinite',
        'shake': 'shake 0.5s',
        'glow': 'glow 2s ease-in-out infinite',
        'celebrate': 'celebrate 0.6s ease-in-out',
        'rainbow': 'rainbow 3s linear infinite',
      },
      keyframes: {
        'bounce-in': {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        'wiggle': {
          '0%, 7%': { transform: 'rotateZ(0)' },
          '15%': { transform: 'rotateZ(-15deg)' },
          '20%': { transform: 'rotateZ(10deg)' },
          '25%': { transform: 'rotateZ(-10deg)' },
          '30%': { transform: 'rotateZ(6deg)' },
          '35%': { transform: 'rotateZ(-4deg)' },
          '40%, 100%': { transform: 'rotateZ(0)' }
        },
        'sparkle': {
          '0%, 100%': { opacity: '0', transform: 'scale(0)' },
          '50%': { opacity: '1', transform: 'scale(1)' }
        },
        'pop-in': {
          '0%': { transform: 'scale(0) rotate(-360deg)', opacity: '0' },
          '80%': { transform: 'scale(1.1) rotate(-10deg)', opacity: '1' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        'shake': {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-2px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(2px)' }
        },
        'glow': {
          '0%, 100%': { boxShadow: '0 0 5px rgba(34, 197, 94, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(34, 197, 94, 0.8), 0 0 30px rgba(34, 197, 94, 0.4)' }
        },
        'celebrate': {
          '0%': { transform: 'scale(1)' },
          '25%': { transform: 'scale(1.1) rotate(5deg)' },
          '50%': { transform: 'scale(1.2) rotate(-5deg)' },
          '75%': { transform: 'scale(1.1) rotate(3deg)' },
          '100%': { transform: 'scale(1) rotate(0deg)' }
        },
        'rainbow': {
          '0%': { filter: 'hue-rotate(0deg)' },
          '100%': { filter: 'hue-rotate(360deg)' }
        }
      }
    },
  },
  plugins: [],
} satisfies Config;