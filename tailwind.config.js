/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",
],
daisyui: {
  themes: [
    {
    mytheme: {
    'transparent': 'transparent',
    'white': '#ffffff',
    'green': '#599c5f',
    'light-green': '#accdaf',
    'primary': '#05042f',
    'secondary': '#323153',
    'orange': '#fc8366',
    'light-orange': '#fff3f0',
    
      },
    },
  ],
},
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}

