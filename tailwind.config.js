/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'media0': '0px',
      'media600': '600px',
      'media900': '900px',
      'media1200': '1200px',
    },
    colors: {
      "white": '#fff',
      "primary-color": "var(--primary-color)",
      "secondary-color": "var(--secondary-color)",
    },
  },
  plugins: [],
};
