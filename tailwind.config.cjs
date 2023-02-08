/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  important: true,
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  corePlugins: {
    preflight: false,
  },  
};
