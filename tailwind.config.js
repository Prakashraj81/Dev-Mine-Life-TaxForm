/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'custom-light-1':'#e8918830',
        'custom-light':'#e8918857',
        'custom-gray':'#ced4da40',
        'light-gray':'#dee2e6',
        'primary-color':'#E89188',
        'primary-gray':'#6B6868',
        'sidebar':'#e891881a',
        'list-text': '#4B4B4B',
        'return-bg':'#6B6868',
        'border-light':'#e891882e',
        'border': '#cecece',
        'input-color':'#cccccc96',
      },
      padding: {
        '5px': '5px !important',
        '7px': '7px !important',
        '10px': '10px !important',
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
        '1':'1%',
        '2':'2%',
        '3':'3%',
        '4':'4%',
        '5':'5%',
        '20':'20%',
        '25':'25%',
        '30':'30%',
        '32':'32%',
        '33':'3%3',
        '35':'35%',
        '37':'37%',  
        '40':'40%',     
        '47':'47%',
        '48':'48%',   
        '50':'50%',
        '55':'55%',
        '60':'60%',
        '65':'65%',
        '70': '70%',
        '80': '80%',
        '85': '85%',
        '90': '90%',
        '20': '20%', 
        '350':'350px',    
      },
      fontSize: {
        '10':'10px',
        '12':'12px',
        '14':'14px',
        '16':'16px',
        '18':'18px',
        '20':'20px',
        '22':'22px',
        '24':'24px',
        '26':'26px',
        '28':'28px',
        '30':'30px',
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
