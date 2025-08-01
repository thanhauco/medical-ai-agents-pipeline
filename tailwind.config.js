/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        agent: {
          parser: "#60A5FA",
          privacy: "#FBBF24",
          prep: "#4ADE80",
          rag: "#F472B6",
          prediction: "#FB923C",
          explainability: "#C084FC",
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
