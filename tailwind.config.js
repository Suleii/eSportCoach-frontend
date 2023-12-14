/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",
],
daisyui: {
  themes: [
    {
      'mytheme': {
        'primary': '#05042f', //PRIMARY BLUE
        // 'primary-focus': '#767680', 
        // 'primary-content': '#C0C0CB', 
        'secondary': '#599c5f', // PRIMARY GREEN
        'secondary-focus': '#accdaf', // LIGHT GREEN
        'secondary-content': '#EEF5EF', //LIGHT GREEN 2
        'accent': '#fc8366', // ORANGE
        'accent-focus': '#fff3f0', // DONT USE
        'accent-content': '#ffffff', // WHITE
        'neutral': '#C0C0CB',// SECONDARY BLUE 2
        'neutral-focus': '#2a2e37',
        'neutral-content': '#ffffff',
        'base-100': '#323153', //SECONDARY BLUE
        'base-200': '#212144', // SECONDARY BLUE 2
        'base-300': '#FFF3F0', //LIGHT ORANGE
        'base-content': '#1f2937',
        'info': '#accdaf', // LIGHT GREEN
        'success': '#599c5f', //GREEN
        'warning': '#ff9900',
        'error': '#ff5724',
      },

    },
  ],
},
  theme: {
    extend: {
      backgroundImage: {
        'bck-img': "url('../public/Bgrd.png')",
      }
    },
  },
  plugins: [require("daisyui")],
}

