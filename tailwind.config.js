/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'custom-light':'#e8918857',
        'custom-gray':'#ced4da40',
        'primary-color':'#E89188',
        'primary-gray':'#6B6868',
        'sidebar':'#e891881a',
        'list-text': '#4B4B4B',
        'return-bg':'#6B6868',
        'border-light':'#e891882e',
      },
      screens: {      
        'xs':'600px',
      },
      borderRadius: {
       'normal':'3px',
      },
      fontSize: {        
        '28':'28px',
      },
      boxShadow: {
        small: '0 5px 10px rgba(0, 0, 0, 0.12)',
        medium: '0 8px 30px rgba(0, 0, 0, 0.12)',
        normal:'0 0 15px rgba(0, 0, 0, 0.12)',
        header:'0px 7px 15px -10px #e5e7eb',
      },
      spacing: {
        '70': '70px',
        '80':'80px',
      },
      width: {        
        '47':'47%',
        '48':'48%',   
        '80': '80%',
        '20': '20%', 
        '350':'350px',    
      },
      letterSpacing: {
        '1': '1px',
        '2': '2px',
        '3': '3px',
        '4': '4px',
        tighter: '-.04em',
        '24':'24px'
      },      
      lineHeight: {
        tight: 1.2,
        normal:'28px',
        weight:'75px',
        smaller:'60px'
      },
      borderRadius:{
        '4xl':'50px'
      },
    },
  },
  plugins: [],
}
