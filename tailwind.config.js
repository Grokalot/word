/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brutalist theme colors
        'terminal-bg': '#0d0d0d',
        'terminal-surface': '#000000',
        'terminal-text': '#f0f0f0',
        'terminal-text-muted': '#666666',
        'terminal-text-inverted': '#000000',
        'terminal-primary': '#f0f0f0',
        'terminal-secondary': '#333333',
        'terminal-border': '#f0f0f0',
        'terminal-border-muted': '#333333',
        'terminal-accent': '#f0f0f0',
        'terminal-error': '#ff0000',
        'terminal-warning': '#ffff00',
        'terminal-success': '#00ff00',
      },
      fontFamily: {
        'mono': ['Anonymous Pro', 'JetBrains Mono', 'Courier New', 'monospace'],
        'mono-bold': ['Anonymous Pro-Bold', 'JetBrains Mono-Bold', 'Courier New', 'monospace'],
        'mono-black': ['Anonymous Pro-Black', 'JetBrains Mono-Black', 'Courier New', 'monospace'],
      },
      fontSize: {
        'xs': '10px',
        'sm': '11px',
        'md': '12px',
        'lg': '14px',
        'xl': '16px',
        'xxl': '18px',
        'xxxl': '24px',
        'xxxxl': '32px',
        'xxxxxl': '48px',
        'xxxxxxl': '72px',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        'xxl': '48px',
        'xxxl': '60px',
        'xxxxl': '80px',
      },
      borderWidth: {
        'thin': '1px',
        'normal': '2px',
        'thick': '4px',
      },
      letterSpacing: {
        'tight': '1px',
        'normal': '2px',
        'wide': '3px',
        'extra-wide': '8px',
      },
    },
  },
  plugins: [],
};

