/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#252A34",
        darker: "#424852",
        white: "#EAEAEA",
        pink: "#FF2E63",
        primary: "#08D9D6",
      },
    },
  },
  plugins: [],
};
