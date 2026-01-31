/** @type {import('tailwindcss').Config} */
module.exports = {
  // Update the content array to point to the 'app' directory
  content: [
    "./app/**/*.{js,jsx,ts,tsx}", 
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Branding
        primary: {
          DEFAULT: '#3b82f6', // The main "MCloud Blue"
          dark: '#1d4ed8',
          light: '#eff6ff',
        },
        secondary: '#0f172a', // Slate-900 for buttons/text
        accent: '#8b5cf6',    // A purple accent if needed
        
        // Backgrounds
        surface: '#ffffff',
        background: '#f8fafc',
        
        // Neutral Grays
        muted: '#64748b',
        border: '#e2e8f0',
      },
      borderRadius: {
        'xl-card': '24px', // Custom radius for consistent branding
      }
    },
  },
  plugins: [],
}