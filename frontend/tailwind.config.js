/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1d1d1f',
          dark: '#000000',
          light: '#424245',
        },
        secondary: {
          DEFAULT: '#FF6B00',
          dark: '#E05F00',
          light: '#FF8533',
        },
        dark: {
          DEFAULT: '#1A1A1A',
          light: '#333333',
          lighter: '#4D4D4D',
        },
        light: {
          DEFAULT: '#F5F5F5',
          dark: '#E6E6E6',
          darker: '#D9D9D9',
        },
        accent: '#06c',
        blue: {
          DEFAULT: '#0056B3',
          dark: '#004494',
          light: '#0071E6',
        },
        lightgray: '#d3d3d5',
        divider: '#e5e5e5',
        button: '#acb2b4',
        darkbutton: '#333336',
        lightbg: '#f5f5f7',
        efeff2: '#efeff2',
        d7d7da: '#d7d7da',
      },
      fontFamily: {
        sans: ['Noto Sans SC', 'sans-serif'],
      },
      height: {
        '1080': '1080px',
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
        '128': '32rem',
        '88': '88px',
        '120': '120px',
        '150': '150px',
        '273': '273px',
        '390': '390px',
        '405': '405px',
        '455': '455px',
        '460': '460px',
        '500': '500px',
        '660': '660px',
        '740': '740px',
        '816': '816px',
        '1080': '1080px',
        '1250': '1250px',
        '1260': '1260px',
        '1680': '1680px',
        '1920': '1920px',
      },
      borderRadius: {
        '28': '28px',
      },
      fontSize: {
        '56': '56px',
        '64': '64px',
        '80': '80px',
        '120': '120px',
      },
      letterSpacing: {
        '25': '0.025em',
        '50': '0.05em',
        '100': '0.1em',
        '120': '0.12em',
      },
      backgroundImage: {
        'gradient-smart': 'linear-gradient(41deg, #bb64ff, #f28, #ff8b00 28%, #f2416b, #e750de 60%, #0096ff, #bb64ff)',
        'gradient-text': 'linear-gradient(97deg, #0096FF, #BB64FF 42%, #F2416B 74%, #EB7500)',
      },
      boxShadow: {
        'inner-gradient': 'inset 0 0 10px rgba(0, 0, 0, 0.1)',
      },
      zIndex: {
        '-10': '-10',
        '60': '60',
        '100': '100',
        '200': '200',
      },
      animation: {
        'fadeIn': 'fadeIn 0.3s ease-in-out',
        'fadeOut': 'fadeOut 0.3s ease-in-out',
        'scaleIn': 'scaleIn 0.3s ease-in-out',
        'slideInLeft': 'slideInLeft 0.3s ease-in-out',
        'slideInRight': 'slideInRight 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}; 