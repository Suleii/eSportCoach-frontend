/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",
],
daisyui: {
  themes: [
    {
      'mytheme': {
        'primary': '#05042f',
        'primary-focus': '#4506cb',
        'primary-content': '#ffffff',
        'secondary': '#323153',
        'secondary-focus': '#bd0091',
        'secondary-content': '#ffffff',
        'accent': '#C0C0CB',
        'accent-focus': '#2aa79b',
        'accent-content': '#ffffff',
        'neutral': '#3d4451',
        'neutral-focus': '#2a2e37',
        'neutral-content': '#ffffff',
        'base-100': '#ffffff',
        'base-200': '#f9fafb',
        'base-300': '#d1d5db',
        'base-content': '#1f2937',
        'info': '#2094f3',
        'success': '#009485',
        'warning': '#ff9900',
        'error': '#ff5724',
      },


    // mytheme: {




    // 'transparent': 'transparent',
    // 'white': '#ffffff',
    // 'green': '#599c5f',
    // 'light-green': '#accdaf',
    // 'primary': '#05042f',
    // 'secondary': '#323153',
    // 'orange': '#fc8366',
    // 'light-orange': '#fff3f0',
    
    //   },
    },
  ],
},
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}

